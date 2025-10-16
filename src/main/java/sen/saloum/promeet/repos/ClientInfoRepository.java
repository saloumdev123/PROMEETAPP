package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.ClientInfo;

@Repository
public interface ClientInfoRepository extends JpaRepository<ClientInfo, Long> {

    // 🔍 Exemple de méthodes personnalisées si besoin
    ClientInfo findByCompany(String company);
    ClientInfo findByEmail(String email);
}
