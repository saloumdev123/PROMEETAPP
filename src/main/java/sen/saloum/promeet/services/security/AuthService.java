package sen.saloum.promeet.services.security;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sen.saloum.promeet.config.JwtUtil;
import sen.saloum.promeet.models.Utilisateur;
import sen.saloum.promeet.models.security.AuthResponse;
import sen.saloum.promeet.models.security.PasswordResetToken;
import sen.saloum.promeet.models.security.RefreshToken;
import sen.saloum.promeet.repos.PasswordResetTokenRepository;
import sen.saloum.promeet.repos.RefreshTokenRepository;
import sen.saloum.promeet.repos.UtilisateurRepository;

import java.time.Duration;
import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
public class AuthService {
    private final UtilisateurRepository utilisateurRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    public AuthService(UtilisateurRepository utilisateurRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       PasswordResetTokenRepository passwordResetTokenRepository,
                       JwtUtil jwtUtil,
                       PasswordEncoder passwordEncoder,
                       JavaMailSender mailSender) {
        this.utilisateurRepository = utilisateurRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    // ========================
    // 🔑 LOGIN / REFRESH EXISTANT
    // ========================
    public AuthResponse login(String email, String password) {
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail(), user.getRole());
        RefreshToken refreshToken = createRefreshToken(user);

        return new AuthResponse(accessToken, refreshToken.getToken());
    }

    private RefreshToken createRefreshToken(Utilisateur utilisateur) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUtilisateur(utilisateur);
        refreshToken.setExpiryDate(Instant.now().plusMillis(jwtUtil.getRefreshTokenExpirationMs()));
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }

    public AuthResponse refreshToken(String refreshTokenStr) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(refreshTokenStr)
                .orElseThrow(() -> new RuntimeException("Refresh token invalide"));

        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new RuntimeException("Refresh token expiré, veuillez vous reconnecter");
        }

        Utilisateur utilisateur = refreshToken.getUtilisateur();
        String accessToken = jwtUtil.generateAccessToken(utilisateur.getEmail(), utilisateur.getRole());

        return new AuthResponse(accessToken, refreshTokenStr);
    }

    public void logout(String refreshTokenStr) {
        refreshTokenRepository.findByToken(refreshTokenStr)
                .ifPresent(refreshTokenRepository::delete);
    }

    // ========================
    // 🔹 NOUVELLES MÉTHODES RESET PASSWORD
    // ========================

    public void forgotPassword(String email) {
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        String token = UUID.randomUUID().toString();

        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setUtilisateur(user);
        resetToken.setToken(token);
        resetToken.setExpiryDate(Instant.now().plus(Duration.ofHours(1))); // expire après 1h
        passwordResetTokenRepository.save(resetToken);

        // 🔹 Générer le lien pour frontend Angular
        String resetLink = "http://144.91.88.1:4300/reset-password?token=" + token;

        // 🔹 Envoyer l’email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Réinitialisation de mot de passe");
        message.setText("Cliquez ici pour réinitialiser votre mot de passe : " + resetLink);

        mailSender.send(message);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token invalide"));

        if (resetToken.getExpiryDate().isBefore(Instant.now())) {
            throw new RuntimeException("Token expiré");
        }

        Utilisateur user = resetToken.getUtilisateur();
        user.setPassword(passwordEncoder.encode(newPassword));
        utilisateurRepository.save(user);

        // Nettoyer après usage
        passwordResetTokenRepository.delete(resetToken);
    }
}
