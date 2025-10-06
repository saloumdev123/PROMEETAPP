package sen.saloum.promeet.config;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.enums.TypePartenaire;
import sen.saloum.promeet.exception.InvalidTokenException;
import sen.saloum.promeet.exception.UserNotFoundException;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.models.security.AuthResponse;
import sen.saloum.promeet.models.security.ForgotPasswordRequest;
import sen.saloum.promeet.repos.UtilisateurRepository;
import sen.saloum.promeet.services.security.AuthService;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@Tag(name = "Auth", description = "Endpoints pour l'authentification")
public class AuthController {
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;
    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthService authService, UtilisateurRepository utilisateurRepository, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.utilisateurRepository = utilisateurRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Operation(summary = "Login utilisateur")
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Créer un nouvel utilisateur")
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        log.info("👉 Données reçues: {}", request);

        // ✅ Validation basique
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email obligatoire"));
        }
        if (request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Mot de passe obligatoire"));
        }
        if (request.getRole() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Rôle obligatoire"));
        }

        // ✅ Vérifier unicité de l'email
        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email déjà utilisé"));
        }

        if (request.getRole() == Role.PARTENAIRE) {
            if (request.getTypePartenaire() == TypePartenaire.ENTREPRISE
                    || request.getTypePartenaire() == TypePartenaire.PROFESSIONNEL) {
                if (request.getNumeroIdentification() == null || request.getNumeroIdentification().isBlank()
                        || request.getTypeIdentification() == null) {
                    return ResponseEntity.badRequest().body(Map.of(
                            "message", "Le NINEA/SIREN et le type d'identification sont obligatoires pour "
                                    + request.getTypePartenaire()
                    ));
                }
            } else {
                // Artisan, Magasin → pas besoin
                request.setNumeroIdentification(null);
                request.setTypeIdentification(null);
            }
        } else {
            // Candidat, Admin, Particulier
            request.setNumeroIdentification(null);
            request.setTypeIdentification(null);
            request.setTypePartenaire(null);
        }


        // ✅ Création de l'utilisateur
        Utilisateur user = new Utilisateur();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // hash du mot de passe
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setTelephone(request.getTelephone());
        user.setAdresse(request.getAdresse());
        user.setMetier(request.getMetier());
        user.setRole(request.getRole()); // garanti non null après validation
        user.setTypePartenaire(request.getTypePartenaire());
        user.setNumeroIdentification(request.getNumeroIdentification());
        user.setTypeIdentification(request.getTypeIdentification());

        utilisateurRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "✅ Utilisateur créé avec succès",
                "userId", user.getId(),
                "email", user.getEmail(),
                "role", user.getRole(),
                "typePartenaire", user.getTypePartenaire()
        ));
    }


    @Operation(summary = "Rafraîchir le token")
    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody TokenRefreshRequest request) {
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Mot de passe oublié")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody TokenRefreshRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Réinitialiser le mot de passe")
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        log.info("Forgot password requested for email: {}", request.getEmail());
        try {
            authService.forgotPassword(request.getEmail());
            log.info("Password reset link successfully sent to {}", request.getEmail());
            return ResponseEntity.ok("Reset link sent to your email.");
        } catch (UserNotFoundException e) {
            log.error("User not found with email: {}", request.getEmail());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            log.error("Unexpected error in forgot password for {}: {}", request.getEmail(), e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            authService.resetPassword(request.get("token"), request.get("newPassword"));
            return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès."));
        } catch (InvalidTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Token invalide ou expiré."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Erreur serveur."));
        }
    }


    @GetMapping("/profile")
    public ResponseEntity<UtilisateurDTO> getProfile(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String email = authentication.getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(user.getId());
        dto.setNom(user.getNom());
        dto.setPrenom(user.getPrenom());
        dto.setEmail(user.getEmail());
        dto.setTelephone(user.getTelephone());
        dto.setRole(user.getRole());dto.setMetier(user.getMetier());
        dto.setAdresse(user.getAdresse());
        return ResponseEntity.ok(dto);
    }


    @PutMapping("/profile")
    public ResponseEntity<UtilisateurDTO> updateProfile(
            Authentication authentication,
            @RequestBody UtilisateurDTO dto
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String email = authentication.getName();
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
        user.setNom(dto.getNom());
        user.setPrenom(dto.getPrenom());
        user.setTelephone(dto.getTelephone());
        user.setMetier(dto.getMetier());
        user.setAdresse(dto.getAdresse());

        utilisateurRepository.save(user);
        UtilisateurDTO updated = new UtilisateurDTO();
        updated.setId(user.getId());
        updated.setNom(user.getNom());
        updated.setPrenom(user.getPrenom());
        updated.setEmail(user.getEmail());
        updated.setTelephone(user.getTelephone());
        updated.setRole(user.getRole());
        updated.setMetier(user.getMetier());
        updated.setAdresse(user.getAdresse());
        return ResponseEntity.ok(updated);
    }

}


