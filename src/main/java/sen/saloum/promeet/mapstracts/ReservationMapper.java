package sen.saloum.promeet.mapstracts;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sen.saloum.promeet.dto.ReservationDTO;
import sen.saloum.promeet.models.Reservation;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    @Mapping(source = "client.id", target = "clientId")
    @Mapping(source = "offre.id", target = "offreId")
    @Mapping(source = "client.email", target = "email")
    @Mapping(source = "offre.titre", target = "offreTitre")
    ReservationDTO toDTO(Reservation reservation);

    @Mapping(source = "clientId", target = "client.id")
    @Mapping(source = "offreId", target = "offre.id")
    Reservation toEntity(ReservationDTO reservationDTO);

    List<ReservationDTO> toDTOList(List<Reservation> reservations);
}
