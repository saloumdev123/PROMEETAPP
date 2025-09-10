package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.CommandeProduitDto;
import sen.saloum.promeet.enums.StatutCommande;
import sen.saloum.promeet.services.CommandeProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/commandes-produit")
public class CommandeProduitController {

    private final CommandeProduitService commandeProduitService;

    public CommandeProduitController(CommandeProduitService commandeProduitService) {
        this.commandeProduitService = commandeProduitService;
    }

    // 🔹 Créer une commande produit
    @PostMapping
    public ResponseEntity<CommandeProduitDto> createCommande(@RequestBody CommandeProduitDto dto) {
        return ResponseEntity.ok(commandeProduitService.createCommande(dto));
    }

    // 🔹 Récupérer une commande par ID
    @GetMapping("/{id}")
    public ResponseEntity<CommandeProduitDto> getCommandeById(@PathVariable Long id) {
        return ResponseEntity.ok(commandeProduitService.getCommandeById(id));
    }

    // 🔹 Récupérer toutes les commandes
    @GetMapping
    public ResponseEntity<List<CommandeProduitDto>> getAllCommandes() {
        return ResponseEntity.ok(commandeProduitService.getAllCommandes());
    }

    // 🔹 Récupérer les commandes par client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<CommandeProduitDto>> getCommandesByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(commandeProduitService.getCommandesByClientId(clientId));
    }

    // 🔹 Récupérer les commandes par produit
    @GetMapping("/produit/{produitId}")
    public ResponseEntity<List<CommandeProduitDto>> getCommandesByProduit(@PathVariable Long produitId) {
        return ResponseEntity.ok(commandeProduitService.getCommandesByProduitId(produitId));
    }

    // 🔹 Mettre à jour le statut d’une commande
    @PatchMapping("/{id}/statut")
    public ResponseEntity<CommandeProduitDto> updateStatut(@PathVariable Long id, @RequestParam StatutCommande statut) {
        return ResponseEntity.ok(commandeProduitService.updateStatut(id, statut));
    }

    // 🔹 Supprimer une commande
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandeProduitService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }
}
