package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.PaiementDTO;

import java.util.List;
import java.util.Map;

public interface PaiementService {
    PaiementDTO createPaiement(PaiementDTO paiementDto);
    List<PaiementDTO> getPaiementsByReservation(Long reservationId);
    void mettreAJourStatut(String transactionId, String statut);
    PaiementDTO createPaiementAvecPayDunya(String email, String description, double montant,
                                           Long reservationId, Map<String, String> paydunyaResponse);
}
