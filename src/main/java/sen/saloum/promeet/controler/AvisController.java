package sen.saloum.promeet.controler;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.AvisDTO;
import sen.saloum.promeet.services.AvisService;
import sen.saloum.promeet.services.Impl.AvisServiceImpl;
import sen.saloum.promeet.utils.ApiResponseStatus;

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
        List<AvisDTO> avis = avisService.getAllAvis();
        if (avis.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(avis);
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<AvisDTO> getAvisById(@PathVariable Long id) {
        AvisDTO avis = avisService.getAvisById(id);
        if (avis == null) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(avis);
    }

    // POST create
    @PostMapping
    public ResponseEntity<AvisDTO> createAvis(@RequestBody AvisDTO avisDTO) {
        AvisDTO created = avisService.createAvis(avisDTO);
        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
    }

    // PUT update
    @PutMapping("/{id}")
    public ResponseEntity<AvisDTO> updateAvis(@PathVariable Long id, @RequestBody AvisDTO avisDTO) {
        AvisDTO updated = avisService.updateAvis(id, avisDTO);
        if (updated == null) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvis(@PathVariable Long id) {
        try {
            avisService.deleteAvis(id);
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
    }

    // GET by offre
    @GetMapping("/offre/{offreId}")
    public ResponseEntity<List<AvisDTO>> getAvisByOffre(@PathVariable Long offreId) {
        List<AvisDTO> avis = avisService.getAvisByOffre(offreId);
        if (avis.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(avis);
    }
}
