package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.FournitureDTO;
import sen.saloum.promeet.services.Impl.FournitureService;

import java.util.List;

@RestController
@RequestMapping("/api/fournitures")
public class FournitureController {

    private final FournitureService fournitureService;

    public FournitureController(FournitureService fournitureService) {
        this.fournitureService = fournitureService;
    }

    /** 🔹 Créer une fourniture */
    @PostMapping
    public ResponseEntity<FournitureDTO> create(@RequestBody FournitureDTO dto) {
        return ResponseEntity.ok(fournitureService.create(dto));
    }

    /** 🔹 Récupérer toutes les fournitures */
    @GetMapping
    public ResponseEntity<List<FournitureDTO>> getAll() {
        return ResponseEntity.ok(fournitureService.getAll());
    }

    /** 🔹 Récupérer une fourniture par ID */
    @GetMapping("/{id}")
    public ResponseEntity<FournitureDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(fournitureService.getById(id));
    }

    /** 🔹 Modifier une fourniture */
    @PutMapping("/{id}")
    public ResponseEntity<FournitureDTO> update(@PathVariable Long id, @RequestBody FournitureDTO dto) {
        return ResponseEntity.ok(fournitureService.update(id, dto));
    }

    /** 🔹 Supprimer une fourniture */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fournitureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
