package sen.saloum.promeet.mapstracts;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.DevisDTO;
import sen.saloum.promeet.models.Devis;

@Mapper(componentModel = "spring")
public interface DevisMapper {

    @Mapping(target = "entreprise", source = "entreprise")
    @Mapping(target = "items", source = "items")
    DevisDTO toDto(Devis entity);

    @Mapping(target = "entreprise", source = "entreprise")
    @Mapping(target = "items", source = "items")
    Devis toEntity(DevisDTO dto);
}
