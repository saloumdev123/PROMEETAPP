package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.enums.TypeIdentification;
import sen.saloum.promeet.enums.TypePartenaire;

import java.util.List;

@Entity
@Table(name = "utilisateurs")
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone;
    private String metier;
    private String adresse;
    private String numeroIdentification;

    @Enumerated(EnumType.STRING)
    private Role role;
    @Enumerated(EnumType.STRING)
    private TypeIdentification typeIdentification;
    @OneToMany(mappedBy = "client")
    private List<CommandeProduit> commandesProduit;

    @OneToMany(mappedBy = "artisan")
    private List<CommandePrestation> commandesPrestation;

    @OneToMany(mappedBy = "utilisateur")
    private List<Avis> avis;
    @Enumerated(EnumType.STRING)
    private TypePartenaire typePartenaire;


    public TypePartenaire getTypePartenaire() {
        return typePartenaire;
    }

    public void setTypePartenaire(TypePartenaire typePartenaire) {
        this.typePartenaire = typePartenaire;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getMetier() {
        return metier;
    }

    public void setMetier(String metier) {
        this.metier = metier;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumeroIdentification() {
        return numeroIdentification;
    }

    public void setNumeroIdentification(String numeroIdentification) {
        this.numeroIdentification = numeroIdentification;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public TypeIdentification getTypeIdentification() {
        return typeIdentification;
    }

    public void setTypeIdentification(TypeIdentification typeIdentification) {
        this.typeIdentification = typeIdentification;
    }

    public List<CommandeProduit> getCommandesProduit() {
        return commandesProduit;
    }

    public void setCommandesProduit(List<CommandeProduit> commandesProduit) {
        this.commandesProduit = commandesProduit;
    }

    public List<CommandePrestation> getCommandesPrestation() {
        return commandesPrestation;
    }

    public void setCommandesPrestation(List<CommandePrestation> commandesPrestation) {
        this.commandesPrestation = commandesPrestation;
    }

    public List<Avis> getAvis() {
        return avis;
    }

    public void setAvis(List<Avis> avis) {
        this.avis = avis;
    }

}
