package sen.saloum.promeet.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DevisItemDto {
    private String designation;
    private String unite;
    private BigDecimal prixUnitaireHt;
    private BigDecimal quantite;
    private BigDecimal montantHt;
    private String tempsTravail;

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

    public BigDecimal getPrixUnitaireHt() {
        return prixUnitaireHt;
    }

    public void setPrixUnitaireHt(BigDecimal prixUnitaireHt) {
        this.prixUnitaireHt = prixUnitaireHt;
    }

    public BigDecimal getQuantite() {
        return quantite;
    }

    public void setQuantite(BigDecimal quantite) {
        this.quantite = quantite;
    }

    public BigDecimal getMontantHt() {
        return montantHt;
    }

    public void setMontantHt(BigDecimal montantHt) {
        this.montantHt = montantHt;
    }

    public String getTempsTravail() {
        return tempsTravail;
    }

    public void setTempsTravail(String tempsTravail) {
        this.tempsTravail = tempsTravail;
    }
}
