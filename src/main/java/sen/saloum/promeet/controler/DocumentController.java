package sen.saloum.promeet.controler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.DocumentDTO;
import sen.saloum.promeet.services.Impl.DocumentService;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // Ajouter un document
    @PostMapping
    public DocumentDTO addDocument(@RequestBody DocumentDTO dto) {
        return documentService.addDocument(dto);
    }

    // Récupérer documents d’un candidat
    @GetMapping("/candidat/{candidatId}")
    public Page<DocumentDTO> getDocumentsByCandidat(@PathVariable Long candidatId, Pageable pageable) {
        return documentService.getDocumentsByCandidat(candidatId, pageable);
    }

    // Rechercher documents par nom
    @GetMapping("/search")
    public Page<DocumentDTO> searchDocuments(@RequestParam String keyword, Pageable pageable) {
        return documentService.searchDocuments(keyword, pageable);
    }

    // Supprimer un document
    @DeleteMapping("/{id}")
    public void deleteDocument(@PathVariable Long id) {
        documentService.deleteDocument(id);
    }
}
