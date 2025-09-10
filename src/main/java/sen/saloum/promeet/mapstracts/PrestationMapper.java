package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.PrestationDto;
import sen.saloum.promeet.models.Prestation;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PrestationMapper {

    @Mapping(source = "artisan.id", target = "artisanId")
    @Mapping(source = "categorie.id", target = "categorieId")
    PrestationDto toDto(Prestation prestation);

    @Mapping(source = "artisanId", target = "artisan.id")
    @Mapping(source = "categorieId", target = "categorie.id")
    Prestation toEntity(PrestationDto dto);

    List<PrestationDto> toDtoList(List<Prestation> prestations);
}
