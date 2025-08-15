package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.enums.StatutPaiement;
import sen.saloum.promeet.models.Paiement;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {

    Optional<Paiement> findByReferenceTransaction(String referenceTransaction);

    List<Paiement> findByStatut(StatutPaiement statut);

    List<Paiement> findByReservationId(Long reservationId);
}
