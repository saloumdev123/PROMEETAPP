package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.CommandePrestationDto;
import sen.saloum.promeet.enums.StatutCommande;
import sen.saloum.promeet.mapstracts.CommandePrestationMapper;
import sen.saloum.promeet.models.CommandePrestation;
import sen.saloum.promeet.models.Prestation;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.CommandePrestationRepository;
import sen.saloum.promeet.repos.PrestationRepository;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.CommandePrestationService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommandePrestationServiceImpl implements CommandePrestationService {

    private final CommandePrestationRepository commandePrestationRepository;
    private final PrestationRepository prestationRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final CommandePrestationMapper mapper;

    public CommandePrestationServiceImpl(CommandePrestationRepository commandePrestationRepository, PrestationRepository prestationRepository, UtilisateurRepository utilisateurRepository, CommandePrestationMapper mapper) {
        this.commandePrestationRepository = commandePrestationRepository;
        this.prestationRepository = prestationRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.mapper = mapper;
    }

    @Override
    public CommandePrestationDto createCommande(CommandePrestationDto dto) {
        CommandePrestation commande = mapper.toEntity(dto);

        if (dto.getPrestationId() != null) {
            Prestation prestation = prestationRepository.findById(dto.getPrestationId())
                    .orElseThrow(() -> new RuntimeException("Prestation introuvable"));
            commande.setPrestation(prestation);
        }

        if (dto.getClientId() != null) {
            Utilisateur client = utilisateurRepository.findById(dto.getClientId())
                    .orElseThrow(() -> new RuntimeException("Client introuvable"));
            commande.setClient(client);
        }

        return mapper.toDto(commandePrestationRepository.save(commande));
    }

    @Override
    public CommandePrestationDto getCommandeById(Long id) {
        CommandePrestation commande = commandePrestationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        return mapper.toDto(commande);
    }

    @Override
    public List<CommandePrestationDto> getAllCommandes() {
        return commandePrestationRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommandePrestationDto> getCommandesByClientId(Long clientId) {
        return commandePrestationRepository.findByClientId(clientId).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommandePrestationDto> getCommandesByArtisanId(Long artisanId) {
        return commandePrestationRepository.findByArtisanId(artisanId).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommandePrestationDto updateStatut(Long id, StatutCommande statut) {
        CommandePrestation commande = commandePrestationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        commande.setStatut(statut);
        return mapper.toDto(commandePrestationRepository.save(commande));
    }


    @Override
    public void deleteCommande(Long id) {
        commandePrestationRepository.deleteById(id);
    }
}
