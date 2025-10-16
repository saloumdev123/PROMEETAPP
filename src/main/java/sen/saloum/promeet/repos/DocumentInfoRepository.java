package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.DocumentInfo;

@Repository
public interface DocumentInfoRepository extends JpaRepository<DocumentInfo, Long> {
}
