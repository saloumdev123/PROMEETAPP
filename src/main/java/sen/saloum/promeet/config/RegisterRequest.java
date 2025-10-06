package sen.saloum.promeet.config;

import sen.saloum.promeet.enums.Role;
import sen.saloum.promeet.enums.TypeIdentification;
import sen.saloum.promeet.enums.TypePartenaire;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisterRequest {
    private String email;
    private String password;
    private String nom;
    private String prenom;
    private String telephone;
    private String metier;
    private String adresse;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private TypeIdentification typeIdentification;
    private Role role;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String numeroIdentification;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private TypePartenaire typePartenaire;


    public TypePartenaire getTypePartenaire() {
        return typePartenaire;
    }

    public void setTypePartenaire(TypePartenaire typePartenaire) {
        this.typePartenaire = typePartenaire;
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

    public TypeIdentification getTypeIdentification() {
        return typeIdentification;
    }

    public void setTypeIdentification(TypeIdentification typeIdentification) {
        this.typeIdentification = typeIdentification;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getNumeroIdentification() {
        return numeroIdentification;
    }

    public void setNumeroIdentification(String numeroIdentification) {
        this.numeroIdentification = numeroIdentification;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
                "email='" + email + '\'' +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", role=" + role +
                ", typePartenaire=" + typePartenaire +
                ", typeIdentification=" + typeIdentification +
                '}';
    }

}
