package sen.saloum.promeet.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.enums.StatutPaiement;
import sen.saloum.promeet.mapstracts.PaiementMapper;
import sen.saloum.promeet.models.Paiement;
import sen.saloum.promeet.repos.PaiementRepository;
import sen.saloum.promeet.services.PaiementService;
import sen.saloum.promeet.services.peyment.AfribapayPaymentService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public  class PaiementServiceImpl implements PaiementService {
    private final PaiementRepository paiementRepository;
    private final PaiementMapper paiementMapper;
    private final AfribapayPaymentService afribapayPaymentService;

    public PaiementServiceImpl(PaiementRepository paiementRepository, PaiementMapper paiementMapper,
                               AfribapayPaymentService afribapayPaymentService) {
        this.paiementRepository = paiementRepository;
        this.paiementMapper = paiementMapper;
        this.afribapayPaymentService = afribapayPaymentService;
    }

    @Override
    public PaiementDTO createPaiement(PaiementDTO paiementDto) {
        paiementDto.setStatut("EN_ATTENTE");
        paiementDto.setReferenceTransaction(UUID.randomUUID().toString());

        Paiement paiement = paiementRepository.save(paiementMapper.toEntity(paiementDto));

        Map<String, Object> paymentData = afribapayPaymentService.initierPaiement(
                paiementDto.getModePaiement(),
                paiementDto.getTelephone(),
                paiementDto.getMontant(),
                paiementDto.getDevise(),
                paiement.getReferenceTransaction()
        );

        if (paymentData.containsKey("provider_link")) {
            paiementDto.setLienPaiement((String) paymentData.get("provider_link")); // pour Wave
        }

        PaiementDTO result = paiementMapper.toDTO(paiement);
        result.setLienPaiement(paiementDto.getLienPaiement());
        return result;
    }

    @Override
    public List<PaiementDTO> getPaiementsByReservation(Long reservationId) {
        return List.of();
    }

    @Override
    public void mettreAJourStatut(String transactionId, String statut) {
        Paiement paiement = paiementRepository.findByReferenceTransaction(transactionId)
                .orElseThrow(() -> new EntityNotFoundException("Paiement introuvable"));

        try {
            paiement.setStatut(StatutPaiement.valueOf(statut.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Statut de paiement invalide : " + statut);
        }

        paiementRepository.save(paiement);
    }

}
