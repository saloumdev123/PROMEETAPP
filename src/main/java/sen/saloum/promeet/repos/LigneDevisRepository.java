package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.LigneDevis;

import java.util.List;

@Repository
public interface LigneDevisRepository extends JpaRepository<LigneDevis, Long> {

    // 🔹 Récupérer les lignes d’un devis spécifique
    List<LigneDevis> findByDevisId(Long devisId);

    // 🔹 Rechercher par libellé partiel
    List<LigneDevis> findByLibelleContainingIgnoreCase(String libelle);
}
