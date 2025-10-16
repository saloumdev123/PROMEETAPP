package sen.saloum.promeet.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class DevisItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String designation;
    private String unite;
    private BigDecimal prixUnitaireHt;
    private BigDecimal quantite;
    private BigDecimal montantHt;
    private String tempsTravail;

    @ManyToOne
    @JoinColumn(name = "devis_id")
    private Devis devis;


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

    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }
}
