package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.FactureDto;
import sen.saloum.promeet.enums.StatutPaiement;
import sen.saloum.promeet.services.FactureService;

import java.util.List;

@RestController
@RequestMapping("/api/factures")
public class FactureController {

    private final FactureService factureService;

    public FactureController(FactureService factureService) {
        this.factureService = factureService;
    }

    // 🔹 Créer une facture
    @PostMapping
    public ResponseEntity<FactureDto> createFacture(@RequestBody FactureDto factureDto) {
        return ResponseEntity.ok(factureService.createFacture(factureDto));
    }

    // 🔹 Récupérer une facture par ID
    @GetMapping("/{id}")
    public ResponseEntity<FactureDto> getFactureById(@PathVariable Long id) {
        return ResponseEntity.ok(factureService.getFactureById(id));
    }

    // 🔹 Récupérer toutes les factures
    @GetMapping
    public ResponseEntity<List<FactureDto>> getAllFactures() {
        return ResponseEntity.ok(factureService.getAllFactures());
    }

    // 🔹 Récupérer factures par commande produit
    @GetMapping("/commande-produit/{commandeProduitId}")
    public ResponseEntity<List<FactureDto>> getFacturesByCommandeProduit(@PathVariable Long commandeProduitId) {
        return ResponseEntity.ok(factureService.getFacturesByCommandeProduitId(commandeProduitId));
    }

    // 🔹 Récupérer factures par commande prestation
    @GetMapping("/commande-prestation/{commandePrestationId}")
    public ResponseEntity<List<FactureDto>> getFacturesByCommandePrestation(@PathVariable Long commandePrestationId) {
        return ResponseEntity.ok(factureService.getFacturesByCommandePrestationId(commandePrestationId));
    }

    // 🔹 Mettre à jour le statut de paiement
    @PatchMapping("/{id}/statut")
    public ResponseEntity<FactureDto> updateStatutPaiement(@PathVariable Long id, @RequestParam StatutPaiement statut) {
        return ResponseEntity.ok(factureService.updateStatutPaiement(id, statut));
    }

    // 🔹 Supprimer une facture
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
        return ResponseEntity.noContent().build();
    }
}
