package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.CommandeProduitDto;
import sen.saloum.promeet.enums.StatutCommande;

import java.util.List;

public interface CommandeProduitService {

    CommandeProduitDto createCommande(CommandeProduitDto dto);

    CommandeProduitDto getCommandeById(Long id);

    List<CommandeProduitDto> getAllCommandes();

    List<CommandeProduitDto> getCommandesByClientId(Long clientId);

    List<CommandeProduitDto> getCommandesByProduitId(Long produitId);

    CommandeProduitDto updateStatut(Long id, StatutCommande statut);

    void deleteCommande(Long id);
}
