package sen.saloum.promeet.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Avis;

import java.util.List;

@Repository
public interface AvisRepository extends JpaRepository<Avis, Long> {

    List<Avis> findByOffreId(Long offreId);

    List<Avis> findByUtilisateurId(Long utilisateurId);

    @Query("SELECT AVG(a.note) FROM Avis a WHERE a.offre.id = :offreId")
    Double getMoyenneNotesByOffre(Long offreId);
}
