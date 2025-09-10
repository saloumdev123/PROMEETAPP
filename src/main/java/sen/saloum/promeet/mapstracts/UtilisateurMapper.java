package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.models.Utilisateur;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {


    @Mapping(target = "role", expression = "java(mapRole(dto.getRole()))")
    @Mapping(target = "motDePasse", source = "dto.motDePasse")
    Utilisateur toEntity(UtilisateurDTO dto);

    @Mapping(target = "role", expression = "java(utilisateur.getRole().name())")
    UtilisateurDTO toDTO(Utilisateur utilisateur);

    List<UtilisateurDTO> toDTOList(List<Utilisateur> utilisateurs);

    default Role mapRole(String role) {
        if (role == null || role.isEmpty()) return Role.PARTICULIER;
        switch (role) {
            case "0": return Role.PARTICULIER;
            case "1": return Role.ADMIN;
            case "2": return Role.PROFESSIONNEL;
            default: return Role.PARTICULIER;
        }
    }

    default Utilisateur fromId(Long id) {
        if (id == null) {
            return null;
        }
        Utilisateur u = new Utilisateur();
        u.setId(id);
        return u;
    }

}
