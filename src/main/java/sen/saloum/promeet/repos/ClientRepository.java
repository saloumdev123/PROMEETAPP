package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import sen.saloum.promeet.models.Client;

public interface ClientRepository extends JpaRepository<Client, Long> { }
