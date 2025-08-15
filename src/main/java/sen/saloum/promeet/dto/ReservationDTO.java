package sen.saloum.promeet.dto;

import lombok.Data;
import sen.saloum.promeet.enums.StatutReservation;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
public class ReservationDTO {
    private Long id;
    private LocalDate dateReservation;
    private LocalDate  dateService;
    private String email;
    private Long clientId;
    private StatutReservation statut;
    private String motDePasse;
    private Long offreId;
    private String offreTitre;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public LocalDate  getDateReservation() {
        return dateReservation;
    }

    public void setDateReservation(LocalDate  dateReservation) {
        this.dateReservation = dateReservation;
    }

    public LocalDate  getDateService() {
        return dateService;
    }

    public void setDateService(LocalDate  dateService) {
        this.dateService = dateService;
    }

    public StatutReservation getStatut() {
        return statut;
    }

    public void setStatut(StatutReservation statut) {
        this.statut = statut;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getOffreId() {
        return offreId;
    }

    public void setOffreId(Long offreId) {
        this.offreId = offreId;
    }

    public String getOffreTitre() {
        return offreTitre;
    }

    public void setOffreTitre(String offreTitre) {
        this.offreTitre = offreTitre;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
