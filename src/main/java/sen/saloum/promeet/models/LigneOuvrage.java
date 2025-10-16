package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lignes_ouvrages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LigneOuvrage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "temps_mo")
    private String tempsMO;

    @Column(columnDefinition = "TEXT")
    private String designation;

    @Column(length = 10)
    private String unite;

    @Column(name = "prix_unitaire_ht")
    private Double prixUnitaireHT;

    @Column
    private Integer quantite;

    @Column(name = "montant_total_ht")
    private Double montantTotalHT;

    @Column(name = "tps_total")
    private String tpsTotal;

    // 🔗 Relation avec Devis (si chaque ligne appartient à un devis)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devis_id")
    private Devis devis;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTempsMO() {
        return tempsMO;
    }

    public void setTempsMO(String tempsMO) {
        this.tempsMO = tempsMO;
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

    public Double getPrixUnitaireHT() {
        return prixUnitaireHT;
    }

    public void setPrixUnitaireHT(Double prixUnitaireHT) {
        this.prixUnitaireHT = prixUnitaireHT;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Double getMontantTotalHT() {
        return montantTotalHT;
    }

    public void setMontantTotalHT(Double montantTotalHT) {
        this.montantTotalHT = montantTotalHT;
    }

    public String getTpsTotal() {
        return tpsTotal;
    }

    public void setTpsTotal(String tpsTotal) {
        this.tpsTotal = tpsTotal;
    }

    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }
}
