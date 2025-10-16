package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Devis;

import java.util.List;
import java.util.Optional;

@Repository
public interface DevisRepository extends JpaRepository<Devis, Long> {

    // 🔹 Rechercher un devis par numéro
    Optional<Devis> findByNumero(String numero);

    // 🔹 Rechercher tous les devis d’un client donné
    List<Devis> findByClientNameContainingIgnoreCase(String clientName);

    // 🔹 Rechercher par responsable entreprise (utile pour SEN FIBEM)
    List<Devis> findByEntreprise_Dirigeant(String dirigeant);


    // 🔹 Rechercher les devis d’une entreprise
    List<Devis> findByEntreprise_Nom(String entrepriseNom);

    // 🔹 Supprimer tous les devis liés à une entreprise
    void deleteByEntreprise_Id(Long entrepriseId);
}
