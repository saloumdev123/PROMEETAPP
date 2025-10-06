package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.TypeFourniture;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fourniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String designation;     // Ex: "Escabeau", "Colle carrelage (environ 1m²)"
    private String unite;            // Ex: "Ens", "Pièce", "Kg"
    private Double quantite;         // quantité fournie
    private Double prixUnitaire;     // Prix unitaire HT si applicable
    private Double montantTotal;     // Montant total HT si applicable

    @Enumerated(EnumType.STRING)
    private TypeFourniture type;     // 🔹 POSEUR ou CLIENT

    @ManyToOne(fetch = FetchType.LAZY)
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

    public Devis getDevis() {
        return devis;
    }

    public void setDevis(Devis devis) {
        this.devis = devis;
    }
}
