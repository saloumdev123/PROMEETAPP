package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.AvisDTO;
import sen.saloum.promeet.services.AvisService;
import sen.saloum.promeet.services.Impl.AvisServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
public class AvisController {

    private final AvisServiceImpl avisService;

    public AvisController(AvisServiceImpl avisService) {
        this.avisService = avisService;
    }

    @GetMapping
    public ResponseEntity<List<AvisDTO>> getAllAvis() {
        return ResponseEntity.ok(avisService.getAllAvis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvisDTO> getAvisById(@PathVariable Long id) {
        AvisDTO avis = avisService.getAvisById(id);
        return ResponseEntity.ok(avis);
    }

    @PostMapping
    public ResponseEntity<AvisDTO> createAvis(@RequestBody AvisDTO avisDTO) {
        AvisDTO created = avisService.createAvis(avisDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AvisDTO> updateAvis(@PathVariable Long id, @RequestBody AvisDTO avisDTO) {
        AvisDTO updated = avisService.updateAvis(id, avisDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvis(@PathVariable Long id) {
        avisService.deleteAvis(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/offre/{offreId}")
    public ResponseEntity<List<AvisDTO>> getAvisByOffre(@PathVariable Long offreId) {
        List<AvisDTO> avis = avisService.getAvisByOffre(offreId);
        return ResponseEntity.ok(avis);
    }
}
