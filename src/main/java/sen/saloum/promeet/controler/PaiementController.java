//package sen.saloum.promeet.controler;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import sen.saloum.promeet.dto.PaiementDTO;
//import sen.saloum.promeet.exception.EntityNotFoundCustomException;
//import sen.saloum.promeet.utils.ApiResponseStatus;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/paiements")
//public class PaiementController {
//
//
//
//    @PostMapping
//    public ResponseEntity<PaiementDTO> createPaiement(@RequestBody PaiementDTO paiementDTO) {
//        PaiementDTO created = paiementService.createPaiement(paiementDTO);
//        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
//    }
//
//    @PostMapping("/callback")
//    public ResponseEntity<String> paiementCallback(@RequestBody Map<String, Object> payload) {
//        String refTransaction = (String) payload.get("ref_command");
//        String statut = (String) payload.get("status");
//
//        paiementService.mettreAJourStatut(refTransaction, statut);
//        return ResponseEntity.status(ApiResponseStatus.OK).body("Notification reçue");
//    }
//
//    @GetMapping("/reservation/{reservationId}")
//    public ResponseEntity<List<PaiementDTO>> getPaiementsByReservation(@PathVariable Long reservationId) {
//        List<PaiementDTO> paiements = paiementService.getPaiementsByReservation(reservationId);
//        if (paiements.isEmpty()) {
//            throw new EntityNotFoundCustomException("Paiements pour la réservation", reservationId);
//        }
//        return ResponseEntity.status(ApiResponseStatus.OK).body(paiements);
//    }
//}
