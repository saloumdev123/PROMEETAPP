package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.models.Paiement;
import java.util.List;

@Mapper(componentModel = "spring")
public interface PaiementMapper {

    @Mapping(source = "facture.id", target = "factureId")
    PaiementDTO toDto(Paiement paiement);

    @Mapping(source = "factureId", target = "facture.id")
    Paiement toEntity(PaiementDTO dto);

    List<PaiementDTO> toDtoList(List<Paiement> paiements);
}
