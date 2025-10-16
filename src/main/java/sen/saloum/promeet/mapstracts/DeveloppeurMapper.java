package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.DeveloppeurDTO;
import sen.saloum.promeet.models.Developpeur;

@Mapper(componentModel = "spring")
public interface DeveloppeurMapper {

    Developpeur toEntity(DeveloppeurDTO dto);
    DeveloppeurDTO toDto(Developpeur entity);
}
