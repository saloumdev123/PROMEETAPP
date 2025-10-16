package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Developpeur;

import java.util.List;

@Repository
public interface DeveloppeurRepository extends JpaRepository<Developpeur, Long> {
    // 🔹 Recherche par nom (contient, insensible à la casse)
    @Query("SELECT d FROM Developpeur d WHERE LOWER(d.nom) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Developpeur> searchByName(@Param("keyword") String keyword);

    // 🔹 Recherche par spécialité
    List<Developpeur> findBySpecialiteIgnoreCase(String specialite);

    // 🔹 Recherche par niveau
    List<Developpeur> findByNiveauIgnoreCase(String niveau);

    // 🔹 Recherche des développeurs actifs
    List<Developpeur> findByActifTrue();

    // 🔹 Recherche globale (nom, email, spécialité, niveau)
    @Query("""
        SELECT d FROM Developpeur d
        WHERE LOWER(d.nom) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(d.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(d.specialite) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(d.niveau) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Developpeur> searchGlobal(@Param("keyword") String keyword);
}
