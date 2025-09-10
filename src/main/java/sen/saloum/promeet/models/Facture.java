package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.StatutPaiement;

@Entity
@Table(name = "factures")
@NoArgsConstructor
@AllArgsConstructor
public class Facture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double montantTotal;
    private Double commissionPlateforme; // calcul 1-3% pour particuliers, 3-15% pour pros
    private Double remiseProfessionnelle; // négociée avec le magasin 1-20%

    @OneToOne
    @JoinColumn(name = "commande_produit_id")
    private CommandeProduit commandeProduit;

    @OneToOne
    @JoinColumn(name = "commande_prestation_id")
    private CommandePrestation commandePrestation;

    @Enumerated(EnumType.STRING)
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

    public CommandeProduit getCommandeProduit() {
        return commandeProduit;
    }

    public void setCommandeProduit(CommandeProduit commandeProduit) {
        this.commandeProduit = commandeProduit;
    }

    public CommandePrestation getCommandePrestation() {
        return commandePrestation;
    }

    public void setCommandePrestation(CommandePrestation commandePrestation) {
        this.commandePrestation = commandePrestation;
    }

    public StatutPaiement getStatutPaiement() {
        return statutPaiement;
    }

    public void setStatutPaiement(StatutPaiement statutPaiement) {
        this.statutPaiement = statutPaiement;
    }
}
