package sen.saloum.promeet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.TypeFourniture;

@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FournitureDTO {
    private Long id;
    private String designation;
    private String unite;
    private Double quantite;
    private Double prixUnitaire;
    private Double montantTotal;
    private TypeFourniture type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getUnite() {
        return unite;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    public Double getQuantite() {
        return quantite;
    }

    public void setQuantite(Double quantite) {
        this.quantite = quantite;
    }

    public Double getPrixUnitaire() {
        return prixUnitaire;
    }

    public void setPrixUnitaire(Double prixUnitaire) {
        this.prixUnitaire = prixUnitaire;
    }

    public Double getMontantTotal() {
        return montantTotal;
    }

    public void setMontantTotal(Double montantTotal) {
        this.montantTotal = montantTotal;
    }

    public TypeFourniture getType() {
        return type;
    }

    public void setType(TypeFourniture type) {
        this.type = type;
    }
}
