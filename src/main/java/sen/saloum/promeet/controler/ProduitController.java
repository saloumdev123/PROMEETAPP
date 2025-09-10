package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.ProduitDto;
import sen.saloum.promeet.services.ProduitService;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
public class ProduitController {

    private final ProduitService produitService;

    public ProduitController(ProduitService produitService) {
        this.produitService = produitService;
    }

    // ✅ Créer un produit
    @PostMapping
    public ResponseEntity<ProduitDto> createProduit(@RequestBody ProduitDto dto) {
        return ResponseEntity.ok(produitService.createProduit(dto));
    }

    // ✅ Récupérer un produit par ID
    @GetMapping("/{id}")
    public ResponseEntity<ProduitDto> getProduitById(@PathVariable Long id) {
        return ResponseEntity.ok(produitService.getProduitById(id));
    }
    @GetMapping
    public ResponseEntity<Page<ProduitDto>> getAllProduits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) { // 6 produits par page
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(produitService.getAllProduits(pageable));
    }

    @GetMapping("/categorie/{categorieId}")
    public ResponseEntity<Page<ProduitDto>> getProduitsByCategorie(
            @PathVariable Long categorieId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(produitService.getProduitsByCategorie(categorieId, pageable));
    }

    // ✅ Mettre à jour un produit
    @PutMapping("/{id}")
    public ResponseEntity<ProduitDto> updateProduit(@PathVariable Long id, @RequestBody ProduitDto dto) {
        return ResponseEntity.ok(produitService.updateProduit(id, dto));
    }

    // ✅ Supprimer un produit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        return ResponseEntity.noContent().build();
    }
    // Produits par magasin (avec pagination)
    @GetMapping("/magasin/{magasinId}/page")
    public ResponseEntity<Page<ProduitDto>> getProduitsByMagasinPaged(
            @PathVariable Long magasinId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(produitService.getProduitsByMagasin(magasinId, pageable));
    }

    // Produits par magasin + catégorie
    @GetMapping("/magasin/{magasinId}/categorie/{categorieId}")
    public ResponseEntity<List<ProduitDto>> getProduitsByMagasinAndCategorie(
            @PathVariable Long magasinId,
            @PathVariable Long categorieId) {
        return ResponseEntity.ok(produitService.getProduitsByMagasinAndCategorie(magasinId, categorieId));
    }

}
