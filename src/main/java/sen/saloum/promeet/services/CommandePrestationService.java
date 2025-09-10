package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.CommandePrestationDto;
import sen.saloum.promeet.enums.StatutCommande;

import java.util.List;

public interface CommandePrestationService {

    CommandePrestationDto createCommande(CommandePrestationDto dto);

    CommandePrestationDto getCommandeById(Long id);

    List<CommandePrestationDto> getAllCommandes();

    List<CommandePrestationDto> getCommandesByClientId(Long clientId);

    List<CommandePrestationDto> getCommandesByArtisanId(Long artisanId);

    CommandePrestationDto updateStatut(Long id, StatutCommande statut);

    void deleteCommande(Long id);
}
