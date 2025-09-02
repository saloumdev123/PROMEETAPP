package sen.saloum.promeet.controler;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sen.saloum.promeet.dto.PaiementDTO;
import sen.saloum.promeet.exception.EntityNotFoundCustomException;
import sen.saloum.promeet.services.PaiementService;
import sen.saloum.promeet.services.peyment.PayDunyaService;
import sen.saloum.promeet.utils.ApiResponseStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/paiements")
public class PaiementController {

    private final PaiementService paiementService;
    private final PayDunyaService payDunyaService;

    public PaiementController(PaiementService paiementService, PayDunyaService payDunyaService) {
        this.paiementService = paiementService;
        this.payDunyaService = payDunyaService;
    }

    @PostMapping
    public ResponseEntity<PaiementDTO> createPaiement(@RequestBody PaiementDTO paiementDTO) {
        PaiementDTO created = paiementService.createPaiement(paiementDTO);
        return ResponseEntity.status(ApiResponseStatus.CREATED).body(created);
    }


    @GetMapping("/reservation/{reservationId}")
    public ResponseEntity<List<PaiementDTO>> getPaiementsByReservation(@PathVariable Long reservationId) {
        List<PaiementDTO> paiements = paiementService.getPaiementsByReservation(reservationId);
        if (paiements.isEmpty()) {
            throw new EntityNotFoundCustomException("Paiements pour la réservation", reservationId);
        }
        return ResponseEntity.status(ApiResponseStatus.OK).body(paiements);
    }
    @PostMapping("/initier")
    public ResponseEntity<?> initierPaiement(
            @RequestParam String email,
            @RequestParam String description,
            @RequestParam double montant,
            @RequestParam Long reservationId) {

        try {
            // Initier le paiement chez PayDunya
            Map<String, String> response = payDunyaService.initierPaiement(email, description, montant);

            // Créer l'enregistrement du paiement avec lien vers la réservation
            PaiementDTO paiementDTO = paiementService.createPaiementAvecPayDunya(
                    email, description, montant, reservationId, response
            );

            Map<String, String> result = new HashMap<>();
            result.put("lienPaiement", paiementDTO.getLienPaiement());
            result.put("referenceTransaction", paiementDTO.getReferenceTransaction());
            return ResponseEntity.ok(result);

        } catch (EntityNotFoundException e) {
            // Réservation non trouvée
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            // Toute autre erreur (PayDunya, etc.)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/callback")
    public ResponseEntity<Map<String, String>> paiementCallback(
            @RequestBody Map<String, Object> payload,
            @RequestHeader("PAYDUNYA-SIGNATURE") String signature) {

        Map<String, String> response = new HashMap<>();

        // Vérifier la signature
        if (!payDunyaService.verifierSignature(payload, signature)) {
            response.put("error", "Signature invalide");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }

        String refTransaction = (String) payload.get("ref_command");
        String statut = (String) payload.get("status");

        try {
            paiementService.mettreAJourStatut(refTransaction, statut);
            response.put("message", "Statut du paiement mis à jour avec succès");
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (IllegalArgumentException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("error", "Erreur inattendue : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
