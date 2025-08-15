package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.AvisDTO;
import sen.saloum.promeet.models.Avis;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AvisMapper {

    @Mapping(source = "utilisateur.id", target = "utilisateurId")
    @Mapping(source = "utilisateur.nom", target = "utilisateurNom")
    @Mapping(source = "utilisateur.prenom", target = "utilisateurPrenom")
    @Mapping(source = "offre.id", target = "offreId")
    @Mapping(source = "offre.titre", target = "offreTitre")
    AvisDTO toDTO(Avis avis);

    @Mapping(source = "utilisateurId", target = "utilisateur.id")
    @Mapping(source = "offreId", target = "offre.id")
    Avis toEntity(AvisDTO avisDTO);

    List<AvisDTO> toDTOList(List<Avis> avisList);
}
