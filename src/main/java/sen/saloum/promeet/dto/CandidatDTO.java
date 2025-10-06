package sen.saloum.promeet.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;
import java.util.List;

public class CandidatDTO {
    private Long id;
    private String prenom;
    @NotBlank
    private String nom;
    @Email
    private String email;
    private String telephone;
    private String adresse;
    private LocalDate dateNaissance;
    private String metier;

    private List<DocumentDTO> documents;
    private List<String> photos;

    private MacrosDTO macros;

    private String emailCompte;
    private List<String> reseauxSociaux;

    private AbonnementDTO abonnement;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
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

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getMetier() {
        return metier;
    }

    public void setMetier(String metier) {
        this.metier = metier;
    }

    public List<DocumentDTO> getDocuments() {
        return documents;
    }

    public void setDocuments(List<DocumentDTO> documents) {
        this.documents = documents;
    }

    public List<String> getPhotos() {
        return photos;
    }

    public void setPhotos(List<String> photos) {
        this.photos = photos;
    }

    public MacrosDTO getMacros() {
        return macros;
    }

    public void setMacros(MacrosDTO macros) {
        this.macros = macros;
    }

    public String getEmailCompte() {
        return emailCompte;
    }

    public void setEmailCompte(String emailCompte) {
        this.emailCompte = emailCompte;
    }

    public List<String> getReseauxSociaux() {
        return reseauxSociaux;
    }

    public void setReseauxSociaux(List<String> reseauxSociaux) {
        this.reseauxSociaux = reseauxSociaux;
    }

    public AbonnementDTO getAbonnement() {
        return abonnement;
    }

    public void setAbonnement(AbonnementDTO abonnement) {
        this.abonnement = abonnement;
    }
}
