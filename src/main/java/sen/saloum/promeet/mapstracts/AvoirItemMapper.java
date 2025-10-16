package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.AvoirItemDto;
import sen.saloum.promeet.models.AvoirItem;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AvoirItemMapper {

    AvoirItemDto toDto(AvoirItem entity);

    AvoirItem toEntity(AvoirItemDto dto);

    List<AvoirItemDto> toDtoList(List<AvoirItem> entities);

    List<AvoirItem> toEntityList(List<AvoirItemDto> dtos);
}
