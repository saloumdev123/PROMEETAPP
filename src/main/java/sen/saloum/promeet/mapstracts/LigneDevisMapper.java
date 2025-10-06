package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.LigneDevisDTO;
import sen.saloum.promeet.models.LigneDevis;

@Mapper(componentModel = "spring")
public interface LigneDevisMapper {

    LigneDevisDTO toDto(LigneDevis entity);

    LigneDevis toEntity(LigneDevisDTO dto);
}
