package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.CompanyInfoDto;
import sen.saloum.promeet.models.CompanyInfo;

@Mapper(componentModel = "spring")
public interface CompanyInfoMapper {

    CompanyInfoMapper INSTANCE = Mappers.getMapper(CompanyInfoMapper.class);

    // === Entity -> DTO ===
    CompanyInfoDto toDto(CompanyInfo entity);

    // === DTO -> Entity ===
    CompanyInfo toEntity(CompanyInfoDto dto);

    // === Update d’une entité existante depuis un DTO ===
    void updateEntityFromDto(CompanyInfoDto dto, @MappingTarget CompanyInfo entity);
}
