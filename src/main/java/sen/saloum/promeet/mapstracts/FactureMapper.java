package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.FactureDto;
import sen.saloum.promeet.models.Facture;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FactureMapper {

    @Mapping(source = "commandeProduit.id", target = "commandeProduitId")
    @Mapping(source = "commandePrestation.id", target = "commandePrestationId")
    FactureDto toDto(Facture facture);

    @Mapping(source = "commandeProduitId", target = "commandeProduit.id")
    @Mapping(source = "commandePrestationId", target = "commandePrestation.id")
    Facture toEntity(FactureDto dto);

    List<FactureDto> toDtoList(List<Facture> factures);
}
