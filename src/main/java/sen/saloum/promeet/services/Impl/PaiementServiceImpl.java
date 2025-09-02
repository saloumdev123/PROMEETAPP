package sen.saloum.promeet.services.Impl;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.enums.StatutPaiement;
import sen.saloum.promeet.mapstracts.PaiementMapper;
import sen.saloum.promeet.models.Paiement;
import sen.saloum.promeet.models.Reservation;
import sen.saloum.promeet.repos.PaiementRepository;
import sen.saloum.promeet.repos.ReservationRepository;
import sen.saloum.promeet.services.PaiementService;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public  class PaiementServiceImpl implements PaiementService {
    private final PaiementRepository paiementRepository;
    private final PaiementMapper paiementMapper;
    private  final ReservationRepository reservationRepository;

    public PaiementServiceImpl(PaiementRepository paiementRepository, PaiementMapper paiementMapper, ReservationRepository reservationRepository) {
        this.paiementRepository = paiementRepository;
        this.paiementMapper = paiementMapper;
        this.reservationRepository = reservationRepository;
    }

    @Override
    public PaiementDTO createPaiement(PaiementDTO paiementDTO) {
        Paiement paiement = paiementMapper.toEntity(paiementDTO);

        paiement.setModePaiement("PAYDUNYA");
        paiement.setDatePaiement(OffsetDateTime.now());
        paiement.setStatut(StatutPaiement.EN_ATTENTE);
        paiement.setTelephone(paiementDTO.getTelephone());
        paiement.setLienPaiement(paiementDTO.getLienPaiement());
        paiement.setReferenceTransaction(paiementDTO.getReferenceTransaction());
        paiement.setDevise(paiementDTO.getDevise());
        Paiement saved = paiementRepository.save(paiement);
        return paiementMapper.toDTO(saved);
    }

    @Override
    public PaiementDTO createPaiementAvecPayDunya(String email, String description, double montant,
                                                  Long reservationId, Map<String, String> paydunyaResponse) {
        Paiement paiement = new Paiement();
        paiement.setMontant(montant);
        paiement.setModePaiement("PAYDUNYA");
        paiement.setStatut(StatutPaiement.EN_ATTENTE);
        paiement.setLienPaiement(paydunyaResponse.get("lienPaiement"));
        paiement.setReferenceTransaction(paydunyaResponse.get("referenceTransaction"));
        paiement.setDatePaiement(OffsetDateTime.now());

        // Liaison avec la réservation
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new EntityNotFoundException("Reservation introuvable avec id : " + reservationId));
        paiement.setReservation(reservation);

        Paiement saved = paiementRepository.save(paiement);
        return paiementMapper.toDTO(saved);
    }

    @Override
    public List<PaiementDTO> getPaiementsByReservation(Long reservationId) {
        List<Paiement> paiements = paiementRepository.findByReservationId(reservationId);
        return paiementMapper.toDTOList(paiements);
    }
    @Override
    public void mettreAJourStatut(String referenceTransaction, String statut) {
        Paiement paiement = paiementRepository.findByReferenceTransaction(referenceTransaction)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Aucun paiement trouvé pour la référence : " + referenceTransaction
                ));

        try {
            StatutPaiement nouveauStatut = StatutPaiement.valueOf(statut.toUpperCase());
            paiement.setStatut(nouveauStatut);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                    "Statut de paiement invalide : " + statut + ". Statuts valides : " +
                            Arrays.toString(StatutPaiement.values())
            );
        }

        paiementRepository.save(paiement);
    }

}
