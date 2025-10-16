package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.CommandePrestationDto;
import sen.saloum.promeet.models.CommandePrestation;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommandePrestationMapper {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "prestation.id", target = "prestationId")
//    @Mapping(source = "facture.id", target = "factureId")
    CommandePrestationDto toDto(CommandePrestation commandePrestation);

    @Mapping(source = "clientId", target = "client.id")
    @Mapping(source = "prestationId", target = "prestation.id")
//    @Mapping(source = "factureId", target = "facture.id")
    CommandePrestation toEntity(CommandePrestationDto dto);

    List<CommandePrestationDto> toDtoList(List<CommandePrestation> commandes);
}
