package sen.saloum.promeet.services.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.dto.CommandeProduitDto;
import sen.saloum.promeet.enums.StatutCommande;
import sen.saloum.promeet.mapstracts.CommandeProduitMapper;
import sen.saloum.promeet.models.CommandeProduit;
import sen.saloum.promeet.models.Produit;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.CommandeProduitRepository;
import sen.saloum.promeet.repos.ProduitRepository;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.CommandeProduitService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommandeProduitServiceImpl implements CommandeProduitService {

    private final CommandeProduitRepository commandeProduitRepository;
    private final ProduitRepository produitRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final CommandeProduitMapper mapper;

    public CommandeProduitServiceImpl(CommandeProduitRepository commandeProduitRepository, ProduitRepository produitRepository, UtilisateurRepository utilisateurRepository, CommandeProduitMapper mapper) {
        this.commandeProduitRepository = commandeProduitRepository;
        this.produitRepository = produitRepository;
        this.utilisateurRepository = utilisateurRepository;
        this.mapper = mapper;
    }

    @Override
    public CommandeProduitDto createCommande(CommandeProduitDto dto) {
        CommandeProduit commande = mapper.toEntity(dto);

        if (dto.getProduitId() != null) {
            Produit produit = produitRepository.findById(dto.getProduitId())
                    .orElseThrow(() -> new RuntimeException("Produit introuvable"));
            commande.setProduit(produit);
        }

        if (dto.getClientId() != null) {
            Utilisateur client = utilisateurRepository.findById(dto.getClientId())
                    .orElseThrow(() -> new RuntimeException("Client introuvable"));
            commande.setClient(client);
        }

        return mapper.toDto(commandeProduitRepository.save(commande));
    }

    @Override
    public CommandeProduitDto getCommandeById(Long id) {
        CommandeProduit commande = commandeProduitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        return mapper.toDto(commande);
    }

    @Override
    public List<CommandeProduitDto> getAllCommandes() {
        return commandeProduitRepository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommandeProduitDto> getCommandesByClientId(Long clientId) {
        return commandeProduitRepository.findByClientId(clientId).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommandeProduitDto> getCommandesByProduitId(Long produitId) {
        return commandeProduitRepository.findByProduitId(produitId).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommandeProduitDto updateStatut(Long id, StatutCommande statut) {
        CommandeProduit commande = commandeProduitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande introuvable"));
        commande.setStatut(statut);
        return mapper.toDto(commandeProduitRepository.save(commande));
    }


    @Override
    public void deleteCommande(Long id) {
        commandeProduitRepository.deleteById(id);
    }
}
