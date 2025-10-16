package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DocumentInfoDTO;
import sen.saloum.promeet.services.Impl.DocumentInfoService;

import java.util.List;

@RestController
@RequestMapping("/api/documents-info")
public class DocumentInfoController {

    private final DocumentInfoService documentInfoService;

    public DocumentInfoController(DocumentInfoService documentInfoService) {
        this.documentInfoService = documentInfoService;
    }

    @PostMapping
    public ResponseEntity<DocumentInfoDTO> create(@RequestBody DocumentInfoDTO dto) {
        DocumentInfoDTO created = documentInfoService.save(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<DocumentInfoDTO>> getAll() {
        return ResponseEntity.ok(documentInfoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentInfoDTO> getById(@PathVariable Long id) {
        return documentInfoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentInfoDTO> update(@PathVariable Long id, @RequestBody DocumentInfoDTO dto) {
        return ResponseEntity.ok(documentInfoService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        documentInfoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
