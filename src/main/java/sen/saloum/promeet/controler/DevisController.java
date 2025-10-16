package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DevisDTO;
import sen.saloum.promeet.services.Impl.DevisService;

import java.util.List;

@RestController
@RequestMapping("/api/devis")
public class DevisController {
    private final DevisService devisService;

    public DevisController(DevisService devisService) {
        this.devisService = devisService;
    }

    @GetMapping
    public ResponseEntity<List<DevisDTO>> getAll() {
        return ResponseEntity.ok(devisService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DevisDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(devisService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DevisDTO> create(@RequestBody DevisDTO dto) {
        return ResponseEntity.ok(devisService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DevisDTO> update(@PathVariable Long id, @RequestBody DevisDTO dto) {
        return ResponseEntity.ok(devisService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        devisService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
