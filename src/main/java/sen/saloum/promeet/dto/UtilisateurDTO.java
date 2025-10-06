package sen.saloum.promeet.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.enums.TypeIdentification;
import sen.saloum.promeet.enums.TypePartenaire;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UtilisateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private Role role;
    private String metier;
    private String adresse;
    @JsonIgnore
    private String password;
    private String numeroIdentification;
    private TypeIdentification typeIdentification;
    private TypePartenaire typePartenaire;

    public TypePartenaire getTypePartenaire() {
        return typePartenaire;
    }

    public void setTypePartenaire(TypePartenaire typePartenaire) {
        this.typePartenaire = typePartenaire;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }


    public String getMetier() {
        return metier;
    }

    public void setMetier(String metier) {
        this.metier = metier;
    }

    public TypeIdentification getTypeIdentification() {
        return typeIdentification;
    }

    public void setTypeIdentification(TypeIdentification typeIdentification) {
        this.typeIdentification = typeIdentification;
    }

    public String getNumeroIdentification() {
        return numeroIdentification;
    }

    public void setNumeroIdentification(String numeroIdentification) {
        this.numeroIdentification = numeroIdentification;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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


}
