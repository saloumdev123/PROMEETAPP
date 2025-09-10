package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.FactureDto;
import sen.saloum.promeet.enums.StatutPaiement;
import java.util.List;

public interface FactureService {

    FactureDto createFacture(FactureDto factureDto);

    FactureDto getFactureById(Long id);

    List<FactureDto> getAllFactures();

    List<FactureDto> getFacturesByCommandeProduitId(Long commandeProduitId);

    List<FactureDto> getFacturesByCommandePrestationId(Long commandePrestationId);

    FactureDto updateStatutPaiement(Long id, StatutPaiement statut);

    void deleteFacture(Long id);
}
