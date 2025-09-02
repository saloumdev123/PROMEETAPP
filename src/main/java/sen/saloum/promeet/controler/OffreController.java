package sen.saloum.promeet.controler;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sen.saloum.promeet.dto.OffreDTO;
import sen.saloum.promeet.models.Offre;
import sen.saloum.promeet.services.Impl.OffreServiceImpl;
import sen.saloum.promeet.services.OffreService;
import sen.saloum.promeet.utils.ApiResponseStatus;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offres")
public class OffreController {

    private final OffreServiceImpl offreService;

    public OffreController(OffreServiceImpl offreService) {
        this.offreService = offreService;
    }

    @GetMapping
    public ResponseEntity<List<OffreDTO>> getAllOffres() {
        List<OffreDTO> offres = offreService.getAllOffres();
        if (offres.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(offres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreDTO> getOffreById(@PathVariable Long id) {
        OffreDTO offre = offreService.getOffreById(id);
        if (offre == null) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(offre);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            Path path = Paths.get(uploadDir + file.getOriginalFilename());
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return ResponseEntity.ok("/" + path.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur upload image");
        }
    }
    @PostMapping
    public ResponseEntity<OffreDTO> createOffre(@RequestBody OffreDTO offreDTO) {
        OffreDTO created = offreService.createOffre(offreDTO);
        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OffreDTO> updateOffre(@PathVariable Long id, @RequestBody OffreDTO offreDTO) {
        OffreDTO updated = offreService.updateOffre(id, offreDTO);
        if (updated == null) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long id) {
        try {
            offreService.deleteOffre(id);
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(ApiResponseStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<OffreDTO>> searchOffres(@RequestParam(required = false) String keyword) {
        List<OffreDTO> offres = offreService.searchOffres(keyword);
        if (offres.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(offres);
    }

    @GetMapping("/search/advanced")
    public ResponseEntity<List<OffreDTO>> searchOffresAvancee(
            @RequestParam(required = false) String categorie,
            @RequestParam(required = false) Double minPrix,
            @RequestParam(required = false) Double maxPrix,
            @RequestParam(required = false) String localisation) {

        List<OffreDTO> offres = offreService.searchOffresAvancee(categorie, minPrix, maxPrix, localisation);
        if (offres.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(offres);
    }

    @GetMapping("/prestataire/{prestataireId}")
    public ResponseEntity<List<OffreDTO>> getOffresByPrestataire(@PathVariable Long prestataireId) {
        List<OffreDTO> offres = offreService.getOffresByPrestataire(prestataireId);
        if (offres.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(offres);
    }
}
