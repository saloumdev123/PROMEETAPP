package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import sen.saloum.promeet.models.security.RefreshToken;
import sen.saloum.promeet.models.Utilisateur;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByUtilisateur(Utilisateur utilisateur);
}
