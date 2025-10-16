package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import sen.saloum.promeet.models.Entreprise;

import java.util.Optional;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
    // 🔹 Recherche par nom d’entreprise
    Optional<Entreprise> findByNom(String nom);

    // 🔹 Recherche par SIRET
    Optional<Entreprise> findBySiret(String siret);

    // 🔹 Vérifie l’existence d’une entreprise par email
    boolean existsByEmail(String email);
}
