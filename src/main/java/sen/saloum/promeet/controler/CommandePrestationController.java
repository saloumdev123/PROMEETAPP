package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.CommandePrestationDto;
import sen.saloum.promeet.enums.StatutCommande;
import sen.saloum.promeet.services.CommandePrestationService;

import java.util.List;

@RestController
@RequestMapping("/api/commandes-prestation")
public class CommandePrestationController {

    private final CommandePrestationService commandePrestationService;

    public CommandePrestationController(CommandePrestationService commandePrestationService) {
        this.commandePrestationService = commandePrestationService;
    }

    // 🔹 Créer une commande prestation
    @PostMapping
    public ResponseEntity<CommandePrestationDto> createCommande(@RequestBody CommandePrestationDto dto) {
        return ResponseEntity.ok(commandePrestationService.createCommande(dto));
    }

    // 🔹 Récupérer une commande par ID
    @GetMapping("/{id}")
    public ResponseEntity<CommandePrestationDto> getCommandeById(@PathVariable Long id) {
        return ResponseEntity.ok(commandePrestationService.getCommandeById(id));
    }

    // 🔹 Récupérer toutes les commandes
    @GetMapping
    public ResponseEntity<List<CommandePrestationDto>> getAllCommandes() {
        return ResponseEntity.ok(commandePrestationService.getAllCommandes());
    }

    // 🔹 Récupérer les commandes par client
    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<CommandePrestationDto>> getCommandesByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(commandePrestationService.getCommandesByClientId(clientId));
    }

    // 🔹 Récupérer les commandes par artisan
    @GetMapping("/artisan/{artisanId}")
    public ResponseEntity<List<CommandePrestationDto>> getCommandesByArtisan(@PathVariable Long artisanId) {
        return ResponseEntity.ok(commandePrestationService.getCommandesByArtisanId(artisanId));
    }

    // 🔹 Mettre à jour le statut d’une commande
    @PatchMapping("/{id}/statut")
    public ResponseEntity<CommandePrestationDto> updateStatut(@PathVariable Long id, @RequestParam StatutCommande statut) {
        return ResponseEntity.ok(commandePrestationService.updateStatut(id, statut));
    }

    // 🔹 Supprimer une commande
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        commandePrestationService.deleteCommande(id);
        return ResponseEntity.noContent().build();
    }
}
