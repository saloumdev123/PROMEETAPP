package sen.saloum.promeet.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.DevisItem;

import java.util.List;

@Repository
public interface DevisItemRepository extends JpaRepository<DevisItem, Long> {

    // 🔹 Récupérer les items d’un devis spécifique
    List<DevisItem> findByDevis_Id(Long devisId);

    // 🔹 Supprimer toutes les lignes liées à un devis
    void deleteByDevis_Id(Long devisId);
}
