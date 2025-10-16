package sen.saloum.promeet.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.AvoirItem;

@Repository
public interface AvoirItemRepository extends JpaRepository<AvoirItem, Long> {
}
