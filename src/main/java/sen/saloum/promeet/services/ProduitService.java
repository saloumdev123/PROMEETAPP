package sen.saloum.promeet.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sen.saloum.promeet.dto.ProduitDto;
import java.util.List;

public interface ProduitService {

    ProduitDto createProduit(ProduitDto dto);

    ProduitDto getProduitById(Long id);

    List<ProduitDto> getAllProduits();

    List<ProduitDto> getProduitsByCategorie(Long categorieId);

    ProduitDto updateProduit(Long id, ProduitDto dto);

    void deleteProduit(Long id);
    Page<ProduitDto> getProduitsByCategorie(Long categorieId, Pageable pageable);
    Page<ProduitDto> getAllProduits(Pageable pageable);
    Page<ProduitDto> getProduitsByMagasin(Long magasinId, Pageable pageable);
    List<ProduitDto> getProduitsByMagasinAndCategorie(Long magasinId, Long categorieId);
}
