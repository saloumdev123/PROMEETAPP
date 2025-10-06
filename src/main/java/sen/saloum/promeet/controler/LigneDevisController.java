package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.LigneDevisDTO;
import sen.saloum.promeet.services.Impl.LigneDevisService;

import java.util.List;

@RestController
@RequestMapping("/api/lignes-devis")
public class LigneDevisController {

    private final LigneDevisService ligneDevisService;

    public LigneDevisController(LigneDevisService ligneDevisService) {
        this.ligneDevisService = ligneDevisService;
    }

    /** 🔹 Créer une ligne de devis */
    @PostMapping
    public ResponseEntity<LigneDevisDTO> create(@RequestBody LigneDevisDTO dto) {
        return ResponseEntity.ok(ligneDevisService.create(dto));
    }

    /** 🔹 Récupérer toutes les lignes */
    @GetMapping
    public ResponseEntity<List<LigneDevisDTO>> getAll() {
        return ResponseEntity.ok(ligneDevisService.getAll());
    }

    /** 🔹 Récupérer une ligne par ID */
    @GetMapping("/{id}")
    public ResponseEntity<LigneDevisDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ligneDevisService.getById(id));
    }

    /** 🔹 Modifier une ligne */
    @PutMapping("/{id}")
    public ResponseEntity<LigneDevisDTO> update(@PathVariable Long id, @RequestBody LigneDevisDTO dto) {
        return ResponseEntity.ok(ligneDevisService.update(id, dto));
    }

    /** 🔹 Supprimer une ligne */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ligneDevisService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
