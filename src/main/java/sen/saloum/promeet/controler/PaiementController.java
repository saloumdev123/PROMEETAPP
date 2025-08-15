package sen.saloum.promeet.controler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.services.Impl.PaiementServiceImpl;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {

    private final PaiementServiceImpl paiementService;

    public PaiementController(PaiementServiceImpl paiementService) {
        this.paiementService = paiementService;
    }


    @PostMapping
    public ResponseEntity<PaiementDTO> createPaiement(@RequestBody PaiementDTO paiementDTO) {
        PaiementDTO created = paiementService.createPaiement(paiementDTO);
        return ResponseEntity.ok(created);
    }

    @PostMapping("/callback")
    public ResponseEntity<String> paiementCallback(@RequestBody Map<String, Object> payload) {
        String refTransaction = (String) payload.get("ref_command");
        String statut = (String) payload.get("status");

        paiementService.mettreAJourStatut(refTransaction, statut);

        return ResponseEntity.ok("Notification reçue");
    }

    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<PaiementDTO>> getPaiementsByReservation(@PathVariable Long reservationId) {
        List<PaiementDTO> paiements = paiementService.getPaiementsByReservation(reservationId);
        return ResponseEntity.ok(paiements);
    }
}
