package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.MacrosDTO;
import sen.saloum.promeet.models.Macros;

@Mapper(componentModel = "spring")
public interface MacrosMapper {
    MacrosDTO toDTO(Macros macros);
    Macros toEntity(MacrosDTO dto);
}
