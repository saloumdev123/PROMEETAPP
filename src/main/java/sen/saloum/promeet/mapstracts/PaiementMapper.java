package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.models.Paiement;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PaiementMapper {


    PaiementDTO toDto(Paiement paiement);


    Paiement toEntity(PaiementDTO dto);

    List<PaiementDTO> toDtoList(List<Paiement> paiements);
}
