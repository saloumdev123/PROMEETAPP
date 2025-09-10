package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.MagasinDTO;
import sen.saloum.promeet.models.Magasin;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MagasinMapper {

    MagasinMapper INSTANCE = Mappers.getMapper(MagasinMapper.class);

    // Mapping Entité -> DTO
    MagasinDTO toDTO(Magasin magasin);

    // Mapping DTO -> Entité
    Magasin toEntity(MagasinDTO magasinDTO);

    // Mapping List<Entité> -> List<DTO>
    List<MagasinDTO> toDTOList(List<Magasin> magasins);

    // Mapping List<DTO> -> List<Entité>
    List<Magasin> toEntityList(List<MagasinDTO> magasinDTOs);
}
