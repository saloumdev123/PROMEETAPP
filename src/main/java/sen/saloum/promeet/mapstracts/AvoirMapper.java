package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.AvoirDto;
import sen.saloum.promeet.models.Avoir;

import java.util.List;

@Mapper(componentModel = "spring", uses = { AvoirItemMapper.class })
public interface AvoirMapper {

    AvoirDto toDto(Avoir entity);

    Avoir toEntity(AvoirDto dto);

    List<AvoirDto> toDtoList(List<Avoir> entities);

    List<Avoir> toEntityList(List<AvoirDto> dtos);
}
