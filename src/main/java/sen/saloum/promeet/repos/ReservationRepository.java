package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.enums.StatutReservation;
import sen.saloum.promeet.models.Reservation;


import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByClientId(Long clientId);

    List<Reservation> findByOffreId(Long offreId);

    List<Reservation> findByStatut(StatutReservation statut);

    @Query("SELECT r FROM Reservation r WHERE r.client.id = :clientId AND r.statut = :statut")
    List<Reservation> findByClientAndStatut(Long clientId, StatutReservation statut);

    @Query("SELECT r FROM Reservation r WHERE r.dateService BETWEEN :startDate AND :endDate")
    List<Reservation> findByDateServiceRange(OffsetDateTime startDate, OffsetDateTime endDate);
    @Query("SELECT r FROM Reservation r JOIN FETCH r.offre WHERE r.id = :id")
    Optional<Reservation> findByIdWithOffre(@Param("id") Long id);

}
