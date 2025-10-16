package sen.saloum.promeet.models;

import jakarta.persistence.Embeddable;

@Embeddable
public class TravauxItem {
    private String description;
    private Double montant;

    public TravauxItem() {}

    public TravauxItem(String description, Double montant) {
        this.description = description;
        this.montant = montant;
    }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Double getMontant() { return montant; }
    public void setMontant(Double montant) { this.montant = montant; }
}
