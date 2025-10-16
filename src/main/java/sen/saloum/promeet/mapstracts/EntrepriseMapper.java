package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.EntrepriseDto;
import sen.saloum.promeet.models.Entreprise;

@Mapper(componentModel = "spring")
public interface EntrepriseMapper {
    EntrepriseMapper INSTANCE = Mappers.getMapper(EntrepriseMapper.class);

    EntrepriseDto toDto(Entreprise entreprise);
    Entreprise toEntity(EntrepriseDto entrepriseDto);
}
