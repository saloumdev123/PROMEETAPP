package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.ProjetDTO;
import sen.saloum.promeet.models.Projet;

@Mapper(componentModel = "spring")
public interface ProjetMapper {

    @Mapping(target = "developpeurNom", source = "developpeurNom")
    Projet toEntity(ProjetDTO dto);

    ProjetDTO toDto(Projet entity);
}
