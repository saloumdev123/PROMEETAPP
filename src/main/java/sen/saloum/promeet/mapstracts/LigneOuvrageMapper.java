package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.LigneOuvrageDto;
import sen.saloum.promeet.models.LigneOuvrage;

@Mapper(componentModel = "spring")
public interface LigneOuvrageMapper {
    LigneOuvrageMapper INSTANCE = Mappers.getMapper(LigneOuvrageMapper.class);

    LigneOuvrageDto toDto(LigneOuvrage entity);
    LigneOuvrage toEntity(LigneOuvrageDto dto);
}
