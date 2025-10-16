package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.CommandeProduitDto;
import sen.saloum.promeet.models.CommandeProduit;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommandeProduitMapper {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "produit.id", target = "produitId")
//    @Mapping(source = "facture.id", target = "factureId")
    CommandeProduitDto toDto(CommandeProduit commandeProduit);

    @Mapping(source = "clientId", target = "client.id")
    @Mapping(source = "produitId", target = "produit.id")
//    @Mapping(source = "factureId", target = "facture.id")
    CommandeProduit toEntity(CommandeProduitDto dto);

    List<CommandeProduitDto> toDtoList(List<CommandeProduit> commandes);
}
