package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Offre;

import java.util.List;

@Repository
public interface OffreRepository extends JpaRepository<Offre, Long> {

    @Query("""
    SELECT o FROM Offre o 
    WHERE (:categorie IS NULL OR LOWER(o.categorie) = LOWER(:categorie))
    AND (:minPrix IS NULL OR o.prix >= :minPrix)
    AND (:maxPrix IS NULL OR o.prix <= :maxPrix)
    AND (:localisation IS NULL OR LOWER(o.prestataire.localisation) LIKE LOWER(CONCAT('%', :localisation, '%')))
          """)
    List<Offre> searchOffres(String categorie, Double minPrix, Double maxPrix, String localisation);


    @Query("SELECT o FROM Offre o WHERE o.prestataire.id = :prestataireId")
    List<Offre> findByPrestataire(Long prestataireId);

    @Query("SELECT o FROM Offre o WHERE o.prestataire.localisation LIKE %:localisation%")
    List<Offre> findByLocalisationPrestataire(String localisation);
}
