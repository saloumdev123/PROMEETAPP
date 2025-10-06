package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.enums.TypeFourniture;
import sen.saloum.promeet.models.Fourniture;

import java.util.List;

@Repository
public interface FournitureRepository extends JpaRepository<Fourniture, Long> {

    // 🔹 Récupérer toutes les fournitures d’un devis
    List<Fourniture> findByDevisId(Long devisId);

    // 🔹 Récupérer les fournitures selon le type (POSEUR ou CLIENT)
    List<Fourniture> findByType(TypeFourniture type);

    // 🔹 Récupérer les fournitures d’un devis selon le type
    List<Fourniture> findByDevisIdAndType(Long devisId, TypeFourniture type);
}
