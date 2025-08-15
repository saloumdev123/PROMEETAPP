package sen.saloum.promeet.controler;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.services.Impl.UtilisateurServiceImpl;
import sen.saloum.promeet.services.UtilisateurService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {

    private final UtilisateurServiceImpl utilisateurService;

    public UtilisateurController(UtilisateurServiceImpl utilisateurService) {
        this.utilisateurService = utilisateurService;
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        return ResponseEntity.ok(utilisateurService.getAllUtilisateurs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable Long id) {
        Optional<UtilisateurDTO> utilisateurOpt = utilisateurService.getUtilisateurById(id);
        return utilisateurOpt.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@RequestBody UtilisateurDTO utilisateurDTO) {
        UtilisateurDTO created = utilisateurService.createUtilisateur(utilisateurDTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Long id, @RequestBody UtilisateurDTO utilisateurDTO) {
        UtilisateurDTO updated = utilisateurService.updateUtilisateur(id, utilisateurDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        utilisateurService.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/search")
    public ResponseEntity<List<UtilisateurDTO>> searchUtilisateurs(@RequestParam(required = false) String keyword) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.searchUtilisateurs(keyword);
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByRole(@PathVariable String role) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getUtilisateursByRole(Role.valueOf(role.toUpperCase()));
        return ResponseEntity.ok(utilisateurs);
    }

    @GetMapping("/localisation")
    public ResponseEntity<List<UtilisateurDTO>> getUtilisateursByLocalisation(@RequestParam String localisation) {
        List<UtilisateurDTO> utilisateurs = utilisateurService.getUtilisateursByLocalisation(localisation);
        return ResponseEntity.ok(utilisateurs);
    }
}
