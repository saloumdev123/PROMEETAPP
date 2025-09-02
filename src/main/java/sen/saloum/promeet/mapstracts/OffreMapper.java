package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.OffreDTO;
import sen.saloum.promeet.models.Offre;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface OffreMapper {

    @Mapping(source = "prestataire.id", target = "prestataireId")
    @Mapping(target = "reservationsId", expression = "java(offre.getReservations() != null && !offre.getReservations().isEmpty() ? offre.getReservations().get(0).getId() : null)")
    OffreDTO toDTO(Offre offre);

    List<OffreDTO> toDTOList(List<Offre> offres);

    @Mapping(source = "prestataireId", target = "prestataire.id")
    Offre toEntity(OffreDTO dto);
}
