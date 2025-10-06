package sen.saloum.promeet.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Abonnement;

import java.time.LocalDate;

@Repository
public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {

    // Récupérer les abonnements actifs (paginés)
    @Query("SELECT a FROM Abonnement a WHERE a.actif = true")
    Page<Abonnement> findActiveAbonnements(Pageable pageable);

    // Filtrer par type (paginé)
    @Query("SELECT a FROM Abonnement a WHERE a.type = :type")
    Page<Abonnement> findByType(@Param("type") String type, Pageable pageable);

    // Filtrer par période de validité (paginé)
    @Query("SELECT a FROM Abonnement a WHERE a.dateDebut <= :date AND a.dateFin >= :date")
    Page<Abonnement> findAbonnementsValidOnDate(@Param("date") LocalDate date, Pageable pageable);

    // Lister les abonnements expirés (paginés)
    @Query("SELECT a FROM Abonnement a WHERE a.dateFin < CURRENT_DATE")
    Page<Abonnement> findExpiredAbonnements(Pageable pageable);


}
