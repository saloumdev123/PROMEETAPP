package sen.saloum.promeet.repos;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sen.saloum.promeet.models.Document;

import java.util.List;


@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    @Query("SELECT d FROM Document d WHERE d.candidat.id = :candidatId")
    Page<Document> findByCandidatId(@Param("candidatId") Long candidatId, Pageable pageable);

    @Query("SELECT d FROM Document d WHERE LOWER(d.nomFichier) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Document> searchByNomFichier(@Param("keyword") String keyword, Pageable pageable);

    // Documents par type (CV, LM, Diplôme, etc.)
    @Query("SELECT d FROM Document d WHERE d.candidat.id = :candidatId AND d.type = :type")
    List<Document> findByCandidatIdAndType(@Param("candidatId") Long candidatId, @Param("type") String type);


}
