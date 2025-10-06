package sen.saloum.promeet.repos;

import jakarta.persistence.OneToMany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.*;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidatRepository extends JpaRepository<Candidat, Long> {

    // Recherche par email
    @Query("SELECT c FROM Candidat c WHERE c.email = :email")
    Optional<Candidat> findByEmail(@Param("email") String email);

    // Recherche par nom ou prénom (partiel)
    @Query("SELECT c FROM Candidat c WHERE LOWER(c.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.prenom) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Candidat> searchByNomOrPrenom(@Param("keyword") String keyword, Pageable pageable);

    // Filtrer par type d’abonnement
    @Query("SELECT c FROM Candidat c WHERE c.abonnement.type = :type")
    List<Candidat> findByAbonnementType(@Param("type") String type);

    // Filtrer les candidats avec un abonnement actif
    @Query("SELECT c FROM Candidat c WHERE c.abonnement.actif = true")
    List<Candidat> findCandidatsWithActiveAbonnement();


}
