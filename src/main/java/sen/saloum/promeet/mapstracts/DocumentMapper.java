package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.DocumentDTO;
import sen.saloum.promeet.models.Document;

@Mapper(componentModel = "spring")
public interface DocumentMapper {
    DocumentMapper INSTANCE = Mappers.getMapper(DocumentMapper.class);

    DocumentDTO toDTO(Document document);
    Document toEntity(DocumentDTO dto);
}
