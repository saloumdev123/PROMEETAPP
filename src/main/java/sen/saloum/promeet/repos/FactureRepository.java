package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Facture;
import java.util.List;

@Repository
public interface FactureRepository extends JpaRepository<Facture, Long> {

    @Query("SELECT f FROM Facture f WHERE f.commandeProduit.id = :commandeProduitId")
    List<Facture> findByCommandeProduitId(Long commandeProduitId);

    @Query("SELECT f FROM Facture f WHERE f.commandePrestation.id = :commandePrestationId")
    List<Facture> findByCommandePrestationId(Long commandePrestationId);
}
