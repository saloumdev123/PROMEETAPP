package sen.saloum.promeet.controler;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.exception.EntityNotFoundCustomException;
import sen.saloum.promeet.services.Impl.UtilisateurServiceImpl;
import sen.saloum.promeet.services.UtilisateurService;
import sen.saloum.promeet.utils.ApiResponseStatus;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
public class UtilisateurController {

    private final UtilisateurServiceImpl utilisateurService;

    public UtilisateurController(UtilisateurServiceImpl utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getAllUtilisateurs();
        if (utilisateurs.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(utilisateurs);
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable Long id) {
        UtilisateurDTO utilisateur = utilisateurService.getUtilisateurById(id)
                .orElseThrow(() -> new EntityNotFoundCustomException("Utilisateur", id));
        return ResponseEntity.status(ApiResponseStatus.OK).body(utilisateur);
    }

    // POST create
    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        UtilisateurDTO created = utilisateurService.createUtilisateur(utilisateurDTO);
        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
    }

    // PUT update
    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Long id, @RequestBody UtilisateurDTO utilisateurDTO) {
        UtilisateurDTO updated = utilisateurService.updateUtilisateur(id, utilisateurDTO);
        if (updated == null) {
            throw new EntityNotFoundCustomException("Utilisateur", id);
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        boolean deleted = utilisateurService.deleteUtilisateur(id);
        if (!deleted) {
            throw new EntityNotFoundCustomException("Utilisateur", id);
        }
        return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<UtilisateurDTO>> searchUtilisateurs(@RequestParam(required = false) String keyword) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.searchUtilisateurs(keyword);
        if (utilisateurs.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(utilisateurs);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByRole(@PathVariable String role) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getUtilisateursByRole(Role.valueOf(role.toUpperCase()));
        if (utilisateurs.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(utilisateurs);
    }

    @GetMapping("/localisation")
    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByLocalisation(@RequestParam String localisation) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getUtilisateursByLocalisation(localisation);
        if (utilisateurs.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(utilisateurs);
    }
}
