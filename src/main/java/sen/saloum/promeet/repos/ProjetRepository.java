package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Projet;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    // 🔹 Rechercher par nom (insensible à la casse)
    @Query("SELECT p FROM Projet p WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :nom, '%'))")
    List<Projet> searchByNom(@Param("nom") String nom);

    // 🔹 Rechercher par statut (EN_COURS, TERMINE, EN_ATTENTE)
    List<Projet> findByStatutIgnoreCase(String statut);

    // 🔹 Rechercher par client
    @Query("SELECT p FROM Projet p WHERE p.client.id = :clientId")
    List<Projet> findByClientId(@Param("clientId") Long clientId);

    // 🔹 Rechercher les projets entre deux dates
    @Query("SELECT p FROM Projet p WHERE p.dateDebut BETWEEN :start AND :end")
    List<Projet> findByDateDebutBetween(@Param("start") LocalDate start, @Param("end") LocalDate end);

    // 🔹 Rechercher par mot-clé global (nom, description, statut)
    @Query("""
        SELECT p FROM Projet p
        WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(p.statut) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Projet> searchGlobal(@Param("keyword") String keyword);
}
