package sen.saloum.promeet.services;

import sen.saloum.promeet.dto.PaiementDTO;

import java.util.List;

public interface PaiementService {
    PaiementDTO createPaiement(PaiementDTO paiementDto);
    List<PaiementDTO> getPaiementsByReservation(Long reservationId);
    void mettreAJourStatut(String transactionId, String statut);
}
