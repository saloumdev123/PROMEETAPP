package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.AbonnementDTO;
import sen.saloum.promeet.models.Abonnement;

@Mapper(componentModel = "spring")
public interface AbonnementMapper {
    AbonnementMapper INSTANCE = Mappers.getMapper(AbonnementMapper.class);

    AbonnementDTO toDTO(Abonnement abonnement);
    Abonnement toEntity(AbonnementDTO dto);
}
