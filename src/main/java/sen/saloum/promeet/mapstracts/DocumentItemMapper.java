package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.DocumentItemDTO;
import sen.saloum.promeet.models.DocumentItem;

@Mapper(componentModel = "spring")
public interface DocumentItemMapper {
    DocumentItemMapper INSTANCE = Mappers.getMapper(DocumentItemMapper.class);

    @Mapping(target = "documentinfo", ignore = true)
    DocumentItem toEntity(DocumentItemDTO dto);

    DocumentItemDTO toDTO(DocumentItem entity);
}
