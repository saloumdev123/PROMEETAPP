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
        AND (:adresse IS NULL OR LOWER(o.prestataire.adresse) LIKE LOWER(CONCAT('%', :adresse, '%')))
    """)
    List<Offre> searchOffres(String categorie, Double minPrix, Double maxPrix, String adresse);

    @Query("SELECT o FROM Offre o WHERE o.prestataire.id = :prestataireId")
    List<Offre> findByPrestataire(Long prestataireId);

    @Query("SELECT o FROM Offre o WHERE o.prestataire.adresse LIKE %:adresse%")
    List<Offre> findByadressePrestataire(String adresse);

    @Query("""
        SELECT o FROM Offre o
        WHERE LOWER(o.titre) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(o.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
           OR LOWER(o.categorie) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """)
    List<Offre> searchByKeyword(String keyword);
}
