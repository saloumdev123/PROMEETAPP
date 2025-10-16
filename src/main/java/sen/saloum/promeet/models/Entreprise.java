package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "entreprises")
@NoArgsConstructor @AllArgsConstructor @Builder
public class Entreprise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String adresse;
    private String telephone;
    private String portable;
    private String email;
    private String siret;
    private String codeApe;
    private String numeroTva;
    private String indice;       // Ex: "Particulier"
    private String numeroLot;    // Ex: "TRAVAUX Projet MACONNERIE"
    private String lieu;         // Ex: "Espagne"
    private String departement;  // Ex: "10"
    private String reference;    // Ex: "TRAVAUX MACONNERIE"
    private String affaire;      // Ex: "AFF-630"
    private String dirigeant;

    public String getDirigeant() {
        return dirigeant;
    }

    public void setDirigeant(String dirigeant) {
        this.dirigeant = dirigeant;
    }
    public String getIndice() {
        return indice;
    }

    public void setIndice(String indice) {
        this.indice = indice;
    }

    public String getNumeroLot() {
        return numeroLot;
    }

    public void setNumeroLot(String numeroLot) {
        this.numeroLot = numeroLot;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getDepartement() {
        return departement;
    }

    public void setDepartement(String departement) {
        this.departement = departement;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getAffaire() {
        return affaire;
    }

    public void setAffaire(String affaire) {
        this.affaire = affaire;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getPortable() {
        return portable;
    }

    public void setPortable(String portable) {
        this.portable = portable;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSiret() {
        return siret;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

    public String getCodeApe() {
        return codeApe;
    }

    public void setCodeApe(String codeApe) {
        this.codeApe = codeApe;
    }

    public String getNumeroTva() {
        return numeroTva;
    }

    public void setNumeroTva(String numeroTva) {
        this.numeroTva = numeroTva;
    }
}
