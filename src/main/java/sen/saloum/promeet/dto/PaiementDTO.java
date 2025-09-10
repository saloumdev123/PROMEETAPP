package sen.saloum.promeet.dto;

import lombok.Data;
import sen.saloum.promeet.enums.StatutPaiement;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;


public class PaiementDTO {
    private Long id;
    private Double montant;
    private OffsetDateTime datePaiement;
    private String modePaiement;
    private String referenceTransaction;
    private String devise;
    private String telephone;
    private StatutPaiement statut;
    private Long factureId;
    private String lienPaiement;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public OffsetDateTime getDatePaiement() {
        return datePaiement;
    }

    public void setDatePaiement(OffsetDateTime datePaiement) {
        this.datePaiement = datePaiement;
    }

    public String getModePaiement() {
        return modePaiement;
    }

    public void setModePaiement(String modePaiement) {
        this.modePaiement = modePaiement;
    }

    public String getReferenceTransaction() {
        return referenceTransaction;
    }

    public void setReferenceTransaction(String referenceTransaction) {
        this.referenceTransaction = referenceTransaction;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public StatutPaiement getStatut() {
        return statut;
    }

    public void setStatut(StatutPaiement statut) {
        this.statut = statut;
    }

    public Long getFactureId() {
        return factureId;
    }

    public void setFactureId(Long factureId) {
        this.factureId = factureId;
    }

    public String getLienPaiement() {
        return lienPaiement;
    }

    public void setLienPaiement(String lienPaiement) {
        this.lienPaiement = lienPaiement;
    }
}
