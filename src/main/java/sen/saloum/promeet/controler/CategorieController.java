package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.CategorieDto;
import sen.saloum.promeet.services.CategorieService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategorieController {

    private final CategorieService categorieService;

    public CategorieController(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    // 🔹 Créer une nouvelle catégorie
    @PostMapping
    public ResponseEntity<CategorieDto> createCategorie(@RequestBody CategorieDto dto) {
        return ResponseEntity.ok(categorieService.createCategorie(dto));
    }

    // 🔹 Récupérer une catégorie par ID
    @GetMapping("/{id}")
    public ResponseEntity<CategorieDto> getCategorieById(@PathVariable Long id) {
        return ResponseEntity.ok(categorieService.getCategorieById(id));
    }

    // 🔹 Récupérer toutes les catégories
    @GetMapping
    public ResponseEntity<List<CategorieDto>> getAllCategories() {
        return ResponseEntity.ok(categorieService.getAllCategories());
    }

    // 🔹 Mettre à jour une catégorie
    @PutMapping("/{id}")
    public ResponseEntity<CategorieDto> updateCategorie(@PathVariable Long id, @RequestBody CategorieDto dto) {
        return ResponseEntity.ok(categorieService.updateCategorie(id, dto));
    }

    // 🔹 Supprimer une catégorie
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategorie(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
        return ResponseEntity.noContent().build();
    }
}
