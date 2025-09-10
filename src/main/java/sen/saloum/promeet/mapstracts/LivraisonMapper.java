package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.LivraisonDto;
import sen.saloum.promeet.models.Livraison;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LivraisonMapper {

    @Mapping(source = "magasin.id", target = "magasinId")
    LivraisonDto toDto(Livraison livraison);

    @Mapping(source = "magasinId", target = "magasin.id")
    Livraison toEntity(LivraisonDto dto);

    List<LivraisonDto> toDtoList(List<Livraison> livraisons);
}
