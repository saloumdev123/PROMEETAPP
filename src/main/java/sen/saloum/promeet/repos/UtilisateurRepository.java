package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.enums.TypeIdentification;
import sen.saloum.promeet.models.Utilisateur;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);

    List<Utilisateur> findByRole(Role role);

    List<Utilisateur> findByadresseContainingIgnoreCase(String adresse);

    @Query("SELECT u FROM Utilisateur u WHERE LOWER(u.nom) LIKE LOWER(CONCAT('%', :nom, '%')) OR LOWER(u.prenom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Utilisateur> searchByNomOrPrenom(String nom);

    boolean existsByEmail(String email);
    // 🔹 Filtrer les artisans par catégorie de prestation
    @Query("SELECT DISTINCT u FROM Utilisateur u " +
            "JOIN u.commandesPrestation cp " +
            "JOIN cp.prestation p " +
            "JOIN p.categorie c " +
            "WHERE u.role = 'ARTISAN' AND c.id = :categorieId")
    List<Utilisateur> findArtisansByCategorie(@Param("categorieId") Long categorieId);

    // Variante : filtrer par nom de catégorie
    @Query("SELECT DISTINCT u FROM Utilisateur u " +
            "JOIN u.commandesPrestation cp " +
            "JOIN cp.prestation p " +
            "JOIN p.categorie c " +
            "WHERE u.role = 'ARTISAN' AND LOWER(c.nom) LIKE LOWER(CONCAT('%', :categorieNom, '%'))")
    List<Utilisateur> findArtisansByCategorieNom(@Param("categorieNom") String categorieNom);

    // ✅ Trouver un utilisateur par son numéro d’identification
    Optional<Utilisateur> findByNumeroIdentification(String numeroIdentification);

    // ✅ Vérifier l’unicité du numéro
    boolean existsByNumeroIdentification(String numeroIdentification);

    // ✅ Lister uniquement les professionnels avec NINEA ou SIREN
    List<Utilisateur> findByTypeIdentification(TypeIdentification typeIdentification);

    // ✅ Filtrer par rôle et numéro
    Optional<Utilisateur> findByRoleAndNumeroIdentification(Role role, String numeroIdentification);



}
