package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DeveloppeurDTO;
import sen.saloum.promeet.services.Impl.DeveloppeurService;

import java.util.List;

@RestController
@RequestMapping("/api/developpeurs")
public class DeveloppeurController {

    private final DeveloppeurService developpeurService;

    public DeveloppeurController(DeveloppeurService developpeurService) {
        this.developpeurService = developpeurService;
    }

    // ✅ Créer un développeur
    @PostMapping
    public ResponseEntity<DeveloppeurDTO> create(@RequestBody DeveloppeurDTO dto) {
        return ResponseEntity.ok(developpeurService.create(dto));
    }

    // ✅ Modifier un développeur
    @PutMapping("/{id}")
    public ResponseEntity<DeveloppeurDTO> update(@PathVariable Long id, @RequestBody DeveloppeurDTO dto) {
        return ResponseEntity.ok(developpeurService.update(id, dto));
    }

    // ✅ Supprimer un développeur
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        developpeurService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ✅ Récupérer tous les développeurs
    @GetMapping
    public ResponseEntity<List<DeveloppeurDTO>> getAll() {
        return ResponseEntity.ok(developpeurService.getAll());
    }

    // ✅ Récupérer un développeur par ID
    @GetMapping("/{id}")
    public ResponseEntity<DeveloppeurDTO> getById(@PathVariable Long id) {
        return developpeurService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 🔍 Rechercher par nom ou prénom
    @GetMapping("/search")
    public ResponseEntity<List<DeveloppeurDTO>> searchByName(@RequestParam String keyword) {
        return ResponseEntity.ok(developpeurService.searchByName(keyword));
    }

    // 🔍 Recherche globale
    @GetMapping("/filter")
    public ResponseEntity<List<DeveloppeurDTO>> searchGlobal(@RequestParam String keyword) {
        return ResponseEntity.ok(developpeurService.searchGlobal(keyword));
    }

    // 🔍 Filtrer par spécialité
    @GetMapping("/specialite/{specialite}")
    public ResponseEntity<List<DeveloppeurDTO>> findBySpecialite(@PathVariable String specialite) {
        return ResponseEntity.ok(developpeurService.findBySpecialite(specialite));
    }


}
