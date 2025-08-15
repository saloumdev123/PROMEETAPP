package sen.saloum.promeet.services;


import jakarta.mail.MessagingException;
import sen.saloum.promeet.dto.ReservationDTO;

import java.util.List;

public interface ReservationService {
    ReservationDTO createReservation(ReservationDTO reservationDto);
    ReservationDTO updateReservation(Long id, ReservationDTO reservationDto) throws MessagingException;
    ReservationDTO getReservationById(Long id);
    List<ReservationDTO> getAllReservations();
    boolean deleteReservation(Long id);
    List<ReservationDTO> getReservationsByUtilisateur(Long utilisateurId);
}
