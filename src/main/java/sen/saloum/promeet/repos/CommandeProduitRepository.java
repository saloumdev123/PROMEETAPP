package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.CommandeProduit;

import java.util.List;

@Repository
public interface CommandeProduitRepository extends JpaRepository<CommandeProduit, Long> {

    @Query("SELECT c FROM CommandeProduit c WHERE c.client.id = :clientId")
    List<CommandeProduit> findByClientId(@Param("clientId") Long clientId);

    @Query("SELECT c FROM CommandeProduit c WHERE c.produit.id = :produitId")
    List<CommandeProduit> findByProduitId(@Param("produitId") Long produitId);
}
