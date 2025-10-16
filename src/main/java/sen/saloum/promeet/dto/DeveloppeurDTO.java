package sen.saloum.promeet.dto;

import java.time.LocalDate;
import java.util.Set;

public class DeveloppeurDTO {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String specialite;
    private String niveau;
    private LocalDate dateEmbauche;
    private String description;
    private boolean actif;
    private Set<Long> projetsIds;
    private ProjetDTO projet;

    public ProjetDTO getProjet() {
        return projet;
    }

    public void setProjet(ProjetDTO projet) {
        this.projet = projet;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelephone() { return telephone; }
    public void setTelephone(String telephone) { this.telephone = telephone; }

    public String getSpecialite() { return specialite; }
    public void setSpecialite(String specialite) { this.specialite = specialite; }

    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }

    public LocalDate getDateEmbauche() { return dateEmbauche; }
    public void setDateEmbauche(LocalDate dateEmbauche) { this.dateEmbauche = dateEmbauche; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public boolean isActif() { return actif; }
    public void setActif(boolean actif) { this.actif = actif; }

    public Set<Long> getProjetsIds() { return projetsIds; }
    public void setProjetsIds(Set<Long> projetsIds) { this.projetsIds = projetsIds; }
}
