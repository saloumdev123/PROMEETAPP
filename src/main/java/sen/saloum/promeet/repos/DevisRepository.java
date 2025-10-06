package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Devis;

import java.util.List;
import java.util.Optional;

@Repository
public interface DevisRepository extends JpaRepository<Devis, Long> {

    // 🔹 Rechercher un devis par son numéro
    Optional<Devis> findByNumero(String numero);

    // 🔹 Rechercher les devis d’un client par son nom
    List<Devis> findByClientNomContainingIgnoreCase(String clientNom);

    // 🔹 Récupérer les devis triés par date décroissante
    List<Devis> findAllByOrderByDateDesc();
}
