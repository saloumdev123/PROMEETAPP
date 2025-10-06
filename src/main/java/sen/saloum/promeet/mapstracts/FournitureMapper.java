package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.FournitureDTO;
import sen.saloum.promeet.models.Fourniture;

@Mapper(componentModel = "spring")
public interface FournitureMapper {

    FournitureDTO toDto(Fourniture entity);

    Fourniture toEntity(FournitureDTO dto);
}
