package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.models.Paiement;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaiementMapper {

    @Mapping(source = "reservation.id", target = "reservationId")
    PaiementDTO toDTO(Paiement paiement);

    @Mapping(source = "reservationId", target = "reservation.id")
    Paiement toEntity(PaiementDTO paiementDTO);

    List<PaiementDTO> toDTOList(List<Paiement> paiements);
}
