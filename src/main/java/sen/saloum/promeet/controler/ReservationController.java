package sen.saloum.promeet.controler;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.ReservationDTO;
import sen.saloum.promeet.exception.EntityNotFoundCustomException;
import sen.saloum.promeet.services.Impl.ReservationServiceImpl;
import sen.saloum.promeet.services.ReservationService;
import sen.saloum.promeet.utils.ApiResponseStatus;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationServiceImpl reservationService;

    public ReservationController(ReservationServiceImpl reservationService) {
        this.reservationService = reservationService;
    }

    // GET all reservations
    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<ReservationDTO> reservations = reservationService.getAllReservations();
        if (reservations.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(reservations);
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservationById(@PathVariable Long id) {
        ReservationDTO reservation = reservationService.getReservationById(id);
        if (reservation == null) {
            throw new EntityNotFoundCustomException("Reservation", id);
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(reservation);
    }

    // POST create
    @PostMapping
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationDTO reservationDTO) {
        ReservationDTO created = reservationService.createReservation(reservationDTO);
        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
    }

    // PUT update
    @PutMapping("/{id}")
    public ResponseEntity<ReservationDTO> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO reservationDTO) throws MessagingException {
        ReservationDTO updated = reservationService.updateReservation(id, reservationDTO);
        if (updated == null) {
            throw new EntityNotFoundCustomException("Reservation", id);
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(updated);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        boolean deleted = reservationService.deleteReservation(id);
        if (!deleted) {
            throw new EntityNotFoundCustomException("Reservation", id);
        }
        return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
    }

    // GET reservations by utilisateur
    @GetMapping("/utilisateur/{utilisateurId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUtilisateur(@PathVariable Long utilisateurId) {
        List<ReservationDTO> reservations = reservationService.getReservationsByUtilisateur(utilisateurId);
        if (reservations.isEmpty()) {
            return ResponseEntity.status(ApiResponseStatus.NO_CONTENT).build();
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(reservations);
    }
}
