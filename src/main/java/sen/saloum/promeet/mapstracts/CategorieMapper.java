package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.CategorieDto;
import sen.saloum.promeet.models.Categorie;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CategorieMapper {
    CategorieDto toDto(Categorie categorie);
    Categorie toEntity(CategorieDto dto);
    List<CategorieDto> toDtoList(List<Categorie> categories);
}
