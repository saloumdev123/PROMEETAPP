package sen.saloum.promeet.repos;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Produit;

import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    // JPQL : tous les produits d'une catégorie
    @Query("SELECT p FROM Produit p WHERE p.categorie.id = :categorieId")
    List<Produit> findByCategorieId(@Param("categorieId") Long categorieId);

    // JPQL : tous les produits d'un magasin
    @Query("SELECT p FROM Produit p WHERE p.magasin.id = :magasinId")
    List<Produit> findByMagasinId(@Param("magasinId") Long magasinId);

    // JPQL : recherche par nom ou description
    @Query("SELECT p FROM Produit p WHERE LOWER(p.nom) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Produit> searchByKeyword(@Param("keyword") String keyword);

    Page<Produit> findAll(Pageable pageable);
    Page<Produit> findByCategorieId(Long categorieId, Pageable pageable);
    @Query("SELECT p FROM Produit p WHERE p.magasin.id = :magasinId AND p.categorie.id = :categorieId")
    List<Produit> findByMagasinAndCategorie(@Param("magasinId") Long magasinId, @Param("categorieId") Long categorieId);

    Page<Produit> findByMagasinId(Long magasinId, Pageable pageable);
}
