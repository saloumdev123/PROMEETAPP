package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.StatutCommande;

import java.time.LocalDate;

@Entity
@Table(name = "commande_prestation")
@NoArgsConstructor
@AllArgsConstructor
public class CommandePrestation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateCommande;
    private Double prixTotal;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Utilisateur client;
    @ManyToOne
    @JoinColumn(name = "artisan_id")
    private Utilisateur artisan;
    @ManyToOne
    @JoinColumn(name = "prestation_id")
    private Prestation prestation;
    @Enumerated(EnumType.STRING)
    private StatutCommande statut = StatutCommande.EN_ATTENTE;
//    @OneToOne(mappedBy = "commandePrestation")
//    private Facture facture;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateCommande() {
        return dateCommande;
    }

    public void setDateCommande(LocalDate dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Double getPrixTotal() {
        return prixTotal;
    }

    public void setPrixTotal(Double prixTotal) {
        this.prixTotal = prixTotal;
    }

    public Utilisateur getClient() {
        return client;
    }

    public void setClient(Utilisateur client) {
        this.client = client;
    }

    public Prestation getPrestation() {
        return prestation;
    }

    public void setPrestation(Prestation prestation) {
        this.prestation = prestation;
    }

//    public Facture getFacture() {
//        return facture;
//    }
//
//    public void setFacture(Facture facture) {
//        this.facture = facture;
//    }

    public StatutCommande getStatut() {
        return statut;
    }

    public void setStatut(StatutCommande statut) {
        this.statut = statut;
    }

    public Utilisateur getArtisan() {
        return artisan;
    }

    public void setArtisan(Utilisateur artisan) {
        this.artisan = artisan;
    }
}
