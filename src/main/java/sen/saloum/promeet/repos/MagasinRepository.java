package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Magasin;

@Repository
public interface MagasinRepository extends JpaRepository<Magasin, Long> {

    boolean existsByNom(String nom);

    Magasin findByNom(String nom);
}
