package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.CommandePrestation;
import sen.saloum.promeet.models.Utilisateur;

import java.util.List;

@Repository
public interface CommandePrestationRepository extends JpaRepository<CommandePrestation, Long> {

    // Récupérer toutes les commandes d'un client spécifique
    @Query("SELECT c FROM CommandePrestation c WHERE c.client.id = :clientId")
    List<CommandePrestation> findByClientId(Long clientId);

    // Récupérer toutes les commandes pour un artisan spécifique
    @Query("SELECT c FROM CommandePrestation c WHERE c.prestation.artisan.id = :artisanId")
    List<CommandePrestation> findByArtisanId(Long artisanId);

    // Récupérer les commandes par statut
    @Query("SELECT c FROM CommandePrestation c WHERE c.statut = :statut")
    List<CommandePrestation> findByStatut(String statut);

    // Optionnel : filtrer par date de création ou date de service
    @Query("SELECT c FROM CommandePrestation c WHERE c.dateCommande >= :startDate AND c.dateCommande <= :endDate")
    List<CommandePrestation> findByDateCommandeBetween(java.time.LocalDate startDate, java.time.LocalDate endDate);
}
