package sen.saloum.promeet.controler;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.CandidatDTO;
import sen.saloum.promeet.dto.MacrosDTO;
import sen.saloum.promeet.services.Impl.CandidatService;

@RestController
@RequestMapping("/api/candidats")
public class CandidatController {
    private final CandidatService candidatService;

    public CandidatController(CandidatService candidatService) {
        this.candidatService = candidatService;
    }
    @PatchMapping("/{id}/macros")
    public ResponseEntity<CandidatDTO> updateMacros(
            @PathVariable Long id,
            @RequestBody MacrosDTO macrosDTO) {
        return candidatService.updateMacros(id, macrosDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ➕ Créer un candidat
    @PostMapping
    public ResponseEntity<CandidatDTO> createCandidat(@Valid @RequestBody CandidatDTO dto) {
        return ResponseEntity.ok(candidatService.createCandidat(dto));
    }

    // 🔍 Récupérer par ID
    @GetMapping("/{id}")
    public ResponseEntity<CandidatDTO> getCandidatById(@PathVariable Long id) {
        return candidatService.getCandidatById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 📄 Liste paginée
    @GetMapping
    public ResponseEntity<Page<CandidatDTO>> getAllCandidats(Pageable pageable) {
        return ResponseEntity.ok(candidatService.getAllCandidats(pageable));
    }

    // 🔎 Recherche
    @GetMapping("/search")
    public ResponseEntity<Page<CandidatDTO>> searchCandidats(@RequestParam String keyword, Pageable pageable) {
        return ResponseEntity.ok(candidatService.searchCandidats(keyword, pageable));
    }

    // ✏️ Mise à jour
    @PutMapping("/{id}")
    public ResponseEntity<CandidatDTO> updateCandidat(@PathVariable Long id, @Valid @RequestBody CandidatDTO dto) {
        return candidatService.updateCandidat(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ❌ Supprimer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidat(@PathVariable Long id) {
        candidatService.deleteCandidat(id);
        return ResponseEntity.noContent().build();
    }
}
