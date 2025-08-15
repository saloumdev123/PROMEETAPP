package sen.saloum.promeet.config;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.repos.UtilisateurRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UtilisateurRepository utilisateurRepository;

    public AdminController(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @PutMapping("/utilisateurs/{id}/role")
    public ResponseEntity<?> changerRoleUtilisateur(@PathVariable Long id, @RequestBody RoleChangerRequest request) {
        Utilisateur user = utilisateurRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.setRole(request.getRole());
        utilisateurRepository.save(user);

        return ResponseEntity.ok("Rôle mis à jour avec succès");
    }
    @GetMapping("/utilisateurs")
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        List<UtilisateurDTO> utilisateurs = utilisateurRepository.findAll()
                .stream()
                .map(user -> {
                    UtilisateurDTO dto = new UtilisateurDTO();
                    dto.setId(user.getId());
                    dto.setNom(user.getNom());
                    dto.setPrenom(user.getPrenom());
                    dto.setEmail(user.getEmail());
                    dto.setTelephone(user.getTelephone());
                    dto.setRole(user.getRole().name());
                    dto.setBio(user.getBio());
                    dto.setLocalisation(user.getLocalisation());
                    return dto;
                }).toList();
        return ResponseEntity.ok(utilisateurs);
    }

}
