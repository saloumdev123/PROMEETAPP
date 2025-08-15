package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.models.Utilisateur;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    List<Utilisateur> findByRole(Role role);

    List<Utilisateur> findByLocalisationContainingIgnoreCase(String localisation);

    @Query("SELECT u FROM Utilisateur u WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :nom, '%')) OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Utilisateur> searchByNomOrPrenom(String nom);

    boolean existsByEmail(String email);
}
