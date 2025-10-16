package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.models.DocumentItem;
import sen.saloum.promeet.services.Impl.DocumentItemService;

import java.util.List;

@RestController
@RequestMapping("/api/document-items")
public class DocumentItemController {

    private final DocumentItemService service;

    public DocumentItemController(DocumentItemService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<DocumentItem> create(@RequestBody DocumentItem item) {
        return ResponseEntity.ok(service.save(item));
    }

    @GetMapping
    public ResponseEntity<List<DocumentItem>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentItem> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
