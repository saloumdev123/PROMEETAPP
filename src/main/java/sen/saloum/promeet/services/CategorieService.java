package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.CategorieDto;
import java.util.List;

public interface CategorieService {

    CategorieDto createCategorie(CategorieDto dto);

    CategorieDto getCategorieById(Long id);

    List<CategorieDto> getAllCategories();

    CategorieDto updateCategorie(Long id, CategorieDto dto);

    void deleteCategorie(Long id);
}
