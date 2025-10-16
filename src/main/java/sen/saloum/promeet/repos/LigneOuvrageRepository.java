package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.LigneOuvrage;

import java.util.List;

@Repository
public interface LigneOuvrageRepository extends JpaRepository<LigneOuvrage, Long> {
    List<LigneOuvrage> findByDevisId(Long devisId);
}
