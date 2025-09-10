package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Categorie;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    // Récupérer une catégorie par nom
    Optional<Categorie> findByNom(String nom);

    // Liste de toutes les catégories avec JPQL
    @Query("SELECT c FROM Categorie c ORDER BY c.nom ASC")
    List<Categorie> findAllCategories();
}
