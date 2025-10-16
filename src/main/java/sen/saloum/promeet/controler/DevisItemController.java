package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DevisItemDto;
import sen.saloum.promeet.services.Impl.DevisItemService;

import java.util.List;

@RestController
@RequestMapping("/api/devis-items")
public class DevisItemController {

    private final DevisItemService devisItemService;

    public DevisItemController(DevisItemService devisItemService) {
        this.devisItemService = devisItemService;
    }

    @GetMapping
    public ResponseEntity<List<DevisItemDto>> getAll() {
        return ResponseEntity.ok(devisItemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DevisItemDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(devisItemService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DevisItemDto> create(@RequestBody DevisItemDto dto) {
        return ResponseEntity.ok(devisItemService.create(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        devisItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
