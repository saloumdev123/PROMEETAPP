package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.OffreDTO;
import sen.saloum.promeet.mapstracts.UtilisateurMapper;
import sen.saloum.promeet.models.Offre;

import java.util.List;

@Mapper(componentModel = "spring", uses = UtilisateurMapper.class)
public interface OffreMapper {

    @Mapping(source = "prestataire.id", target = "prestataireId")
    OffreDTO toDTO(Offre offre);

    List<OffreDTO> toDTOList(List<Offre> offres);

    // Mapping inverse DTO -> Entity
    @Mapping(source = "prestataireId", target = "prestataire.id")
    Offre toEntity(OffreDTO dto);
}
