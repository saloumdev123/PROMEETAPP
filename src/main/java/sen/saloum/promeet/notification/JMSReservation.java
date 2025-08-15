package sen.saloum.promeet.notification;


import sen.saloum.promeet.enums.StatutReservation;

import java.time.LocalDate;


public class JMSReservation {
    private Long reservationID;
    private LocalDate dateReservation;
    private LocalDate  dateService;
    private String email;
    private Long clientId;
    private String body;
    private StatutReservation statut;
    private Long offreId;
    private String offreTitre;

    public JMSReservation() {
    }

    public JMSReservation(Long reservationID,String body,LocalDate dateReservation, LocalDate dateService, String email, Long clientId, StatutReservation statut, Long offreId, String offreTitre) {
        this.dateReservation = dateReservation;
        this.dateService = dateService;
        this.email = email;
        this.clientId = clientId;
        this.statut = statut;
        this.offreId = offreId;
        this.offreTitre = offreTitre;
        this.reservationID=reservationID;
        this.body = body;
    }

    public LocalDate getDateReservation() {
        return dateReservation;
    }

    public void setDateReservation(LocalDate dateReservation) {
        this.dateReservation = dateReservation;
    }

    public LocalDate getDateService() {
        return dateService;
    }

    public void setDateService(LocalDate dateService) {
        this.dateService = dateService;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public StatutReservation getStatut() {
        return statut;
    }

    public void setStatut(StatutReservation statut) {
        this.statut = statut;
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

    public Long getReservationID() {
        return reservationID;
    }

    public void setReservationID(Long reservationID) {
        this.reservationID = reservationID;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
