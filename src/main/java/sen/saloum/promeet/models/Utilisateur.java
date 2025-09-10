package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.Role;

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
    private String motDePasse;
    private String telephone;

    @Enumerated(EnumType.STRING)
    private Role role; // PART, ARTISAN, ADMIN

    private String bio;
    private String localisation;

    // Relations
    @OneToMany(mappedBy = "client")
    private List<CommandeProduit> commandesProduit;

    @OneToMany(mappedBy = "artisan")
    private List<CommandePrestation> commandesPrestation;

    @OneToMany(mappedBy = "utilisateur")
    private List<Avis> avis;

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

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }



    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
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
