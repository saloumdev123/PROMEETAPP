package sen.saloum.promeet.dto;

import sen.saloum.promeet.enums.StatutPaiement;

public class FactureDto {
    private Long id;
    private Double montantTotal;
    private Double commissionPlateforme;
    private Double remiseProfessionnelle;
    private Long commandeProduitId;
    private Long commandePrestationId;
    private StatutPaiement statutPaiement;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(Double montantTotal) {
        this.montantTotal = montantTotal;
    }

    public Double getCommissionPlateforme() {
        return commissionPlateforme;
    }

    public void setCommissionPlateforme(Double commissionPlateforme) {
        this.commissionPlateforme = commissionPlateforme;
    }

    public Double getRemiseProfessionnelle() {
        return remiseProfessionnelle;
    }

    public void setRemiseProfessionnelle(Double remiseProfessionnelle) {
        this.remiseProfessionnelle = remiseProfessionnelle;
    }

    public Long getCommandeProduitId() {
        return commandeProduitId;
    }

    public void setCommandeProduitId(Long commandeProduitId) {
        this.commandeProduitId = commandeProduitId;
    }

    public Long getCommandePrestationId() {
        return commandePrestationId;
    }

    public void setCommandePrestationId(Long commandePrestationId) {
        this.commandePrestationId = commandePrestationId;
    }

    public StatutPaiement getStatutPaiement() {
        return statutPaiement;
    }

    public void setStatutPaiement(StatutPaiement statutPaiement) {
        this.statutPaiement = statutPaiement;
    }
}
