package sen.saloum.promeet.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Avoir;

@Repository
public interface AvoirRepository extends JpaRepository<Avoir, Long> {
    boolean existsByNumber(String number);
}
