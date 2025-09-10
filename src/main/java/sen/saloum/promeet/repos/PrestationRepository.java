package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Prestation;

import java.util.List;

@Repository
public interface PrestationRepository extends JpaRepository<Prestation, Long> {

    // JPQL : prestations par catégorie
    @Query("SELECT pr FROM Prestation pr WHERE pr.categorie.id = :categorieId")
    List<Prestation> findByCategorieId(@Param("categorieId") Long categorieId);

    // JPQL : prestations par artisan
    @Query("SELECT pr FROM Prestation pr WHERE pr.artisan.id = :artisanId")
    List<Prestation> findByArtisanId(@Param("artisanId") Long artisanId);

    // Recherche par titre ou description
    @Query("SELECT pr FROM Prestation pr WHERE LOWER(pr.titre) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(pr.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Prestation> searchByKeyword(@Param("keyword") String keyword);
}
