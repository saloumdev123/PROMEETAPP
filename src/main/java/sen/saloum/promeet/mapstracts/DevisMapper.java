package sen.saloum.promeet.mapstracts;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.DevisDTO;
import sen.saloum.promeet.models.Devis;

@Mapper(componentModel = "spring", uses = { LigneDevisMapper.class, FournitureMapper.class })
public interface DevisMapper {

    @Mapping(target = "lignes", source = "lignes")
    @Mapping(target = "fournitures", source = "fournitures")
    DevisDTO toDto(Devis devis);

    @InheritInverseConfiguration
    Devis toEntity(DevisDTO dto);
}
