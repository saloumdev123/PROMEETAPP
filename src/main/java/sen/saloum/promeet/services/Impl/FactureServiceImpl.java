package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.FactureDto;
import sen.saloum.promeet.mapstracts.FactureMapper;
import sen.saloum.promeet.models.CommandePrestation;
import sen.saloum.promeet.models.CommandeProduit;
import sen.saloum.promeet.models.Facture;
import sen.saloum.promeet.enums.StatutPaiement;
import sen.saloum.promeet.repos.CommandePrestationRepository;
import sen.saloum.promeet.repos.CommandeProduitRepository;
import sen.saloum.promeet.repos.FactureRepository;
import sen.saloum.promeet.services.FactureService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FactureServiceImpl implements FactureService {

    private final FactureRepository factureRepository;
    private final CommandeProduitRepository commandeProduitRepository;
    private final CommandePrestationRepository commandePrestationRepository;
    private final FactureMapper factureMapper;

    public FactureServiceImpl(FactureRepository factureRepository, CommandeProduitRepository commandeProduitRepository, CommandePrestationRepository commandePrestationRepository, FactureMapper factureMapper) {
        this.factureRepository = factureRepository;
        this.commandeProduitRepository = commandeProduitRepository;
        this.commandePrestationRepository = commandePrestationRepository;
        this.factureMapper = factureMapper;
    }

    @Override
    public FactureDto createFacture(FactureDto factureDto) {
        Facture facture = factureMapper.toEntity(factureDto);

        if (factureDto.getCommandeProduitId() != null) {
            CommandeProduit cp = commandeProduitRepository.findById(factureDto.getCommandeProduitId())
                    .orElseThrow(() -> new RuntimeException("CommandeProduit introuvable"));
            facture.setCommandeProduit(cp);
        }

        if (factureDto.getCommandePrestationId() != null) {
            CommandePrestation cpresta = commandePrestationRepository.findById(factureDto.getCommandePrestationId())
                    .orElseThrow(() -> new RuntimeException("CommandePrestation introuvable"));
            facture.setCommandePrestation(cpresta);
        }

        Facture saved = factureRepository.save(facture);
        return factureMapper.toDto(saved);
    }

    @Override
    public FactureDto getFactureById(Long id) {
        Facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture introuvable"));
        return factureMapper.toDto(facture);
    }

    @Override
    public List<FactureDto> getAllFactures() {
        return factureRepository.findAll().stream()
                .map(factureMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FactureDto> getFacturesByCommandeProduitId(Long commandeProduitId) {
        return factureRepository.findByCommandeProduitId(commandeProduitId).stream()
                .map(factureMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FactureDto> getFacturesByCommandePrestationId(Long commandePrestationId) {
        return factureRepository.findByCommandePrestationId(commandePrestationId).stream()
                .map(factureMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public FactureDto updateStatutPaiement(Long id, StatutPaiement statut) {
        Facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Facture introuvable"));
        facture.setStatutPaiement(statut);
        return factureMapper.toDto(factureRepository.save(facture));
    }

    @Override
    public void deleteFacture(Long id) {
        factureRepository.deleteById(id);
    }
}
