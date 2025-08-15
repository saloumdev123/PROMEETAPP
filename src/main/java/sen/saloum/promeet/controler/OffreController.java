package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.OffreDTO;
import sen.saloum.promeet.services.Impl.OffreServiceImpl;
import sen.saloum.promeet.services.OffreService;

import java.util.List;

@RestController
@RequestMapping("/api/offres")
public class OffreController {

    private final OffreServiceImpl offreService;

    public OffreController(OffreServiceImpl offreService) {
        this.offreService = offreService;
    }

    @GetMapping
    public ResponseEntity<List<OffreDTO>> getAllOffres() {
        return ResponseEntity.ok(offreService.getAllOffres());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreDTO> getOffreById(@PathVariable Long id) {
        OffreDTO offre = offreService.getOffreById(id);
        return ResponseEntity.ok(offre);
    }

    @PostMapping
    public ResponseEntity<OffreDTO> createOffre(@RequestBody OffreDTO offreDTO) {
        OffreDTO created = offreService.createOffre(offreDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OffreDTO> updateOffre(@PathVariable Long id, @RequestBody OffreDTO offreDTO) {
        OffreDTO updated = offreService.updateOffre(id, offreDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long id) {
        offreService.deleteOffre(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<OffreDTO>> searchOffres(@RequestParam(required = false) String keyword) {
        List<OffreDTO> offres = offreService.searchOffres(keyword);
        return ResponseEntity.ok(offres);
    }

    @GetMapping("/search/advanced")
    public ResponseEntity<List<OffreDTO>> searchOffresAvancee(
            @RequestParam(required = false) String categorie,
            @RequestParam(required = false) Double minPrix,
            @RequestParam(required = false) Double maxPrix,
            @RequestParam(required = false) String localisation) {

        List<OffreDTO> offres = offreService.searchOffresAvancee(categorie, minPrix, maxPrix, localisation);
        return ResponseEntity.ok(offres);
    }

    @GetMapping("/prestataire/{prestataireId}")
    public ResponseEntity<List<OffreDTO>> getOffresByPrestataire(@PathVariable Long prestataireId) {
        List<OffreDTO> offres = offreService.getOffresByPrestataire(prestataireId);
        return ResponseEntity.ok(offres);
    }

}
