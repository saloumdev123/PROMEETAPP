package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.DocumentInfoDTO;
import sen.saloum.promeet.enums.DocumentType;
import sen.saloum.promeet.models.DocumentInfo;

import java.util.List;
@Mapper(componentModel = "spring", uses = { DocumentItemMapper.class })
public interface DocumentInfoMapper {
    DocumentInfoMapper INSTANCE = Mappers.getMapper(DocumentInfoMapper.class);

    @Mapping(target = "company.id", source = "companyInfoId")
    @Mapping(target = "client.id", source = "clientInfoId")
    @Mapping(target = "documentType", expression = "java(mapDocumentType(dto.getDocumentType()))")
    DocumentInfo toEntity(DocumentInfoDTO dto);

    @Mapping(target = "companyInfoId", source = "company.id")
    @Mapping(target = "clientInfoId", source = "client.id")
    @Mapping(target = "documentType", expression = "java(entity.getDocumentType().name())")
    DocumentInfoDTO toDTO(DocumentInfo entity);

    List<DocumentInfoDTO> toDTOList(List<DocumentInfo> entities);

    // 🔸 Conversion String → Enum
    default DocumentType mapDocumentType(String type) {
        if (type == null) return null;
        try {
            return DocumentType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}
