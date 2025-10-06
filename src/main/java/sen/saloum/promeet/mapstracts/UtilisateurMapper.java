package sen.saloum.promeet.mapstructs;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import sen.saloum.promeet.dto.UtilisateurDTO;
import sen.saloum.promeet.models.Utilisateur;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {

    UtilisateurMapper INSTANCE = Mappers.getMapper(UtilisateurMapper.class);

    // DTO -> Entity
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    @Mapping(target = "prenom", source = "prenom")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "telephone", source = "telephone")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "metier", source = "metier")
    @Mapping(target = "adresse", source = "adresse")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "numeroIdentification", source = "numeroIdentification")
    @Mapping(target = "typeIdentification", source = "typeIdentification")
    @Mapping(target = "typePartenaire", source = "typePartenaire")
    Utilisateur toEntity(UtilisateurDTO dto);

    // Entity -> DTO
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    @Mapping(target = "prenom", source = "prenom")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "telephone", source = "telephone")
    @Mapping(target = "role", source = "role")
    @Mapping(target = "metier", source = "metier")
    @Mapping(target = "adresse", source = "adresse")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "numeroIdentification", source = "numeroIdentification")
    @Mapping(target = "typeIdentification", source = "typeIdentification")
    @Mapping(target = "typePartenaire", source = "typePartenaire")
    UtilisateurDTO toDto(Utilisateur entity);
}
