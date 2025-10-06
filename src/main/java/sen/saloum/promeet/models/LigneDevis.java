package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class LigneDevis {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String code;
  private String libelle;
  private String unite;
  private Double prixUnitaire;
  private int quantite;
  private Double total;
  private String temps;
  
  @ManyToOne
  @JoinColumn(name = "devis_id")
  private Devis devis;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public String getLibelle() {
    return libelle;
  }

  public void setLibelle(String libelle) {
    this.libelle = libelle;
  }

  public String getUnite() {
    return unite;
  }

  public void setUnite(String unite) {
    this.unite = unite;
  }

  public Double getPrixUnitaire() {
    return prixUnitaire;
  }

  public void setPrixUnitaire(Double prixUnitaire) {
    this.prixUnitaire = prixUnitaire;
  }

  public int getQuantite() {
    return quantite;
  }

  public void setQuantite(int quantite) {
    this.quantite = quantite;
  }

  public Double getTotal() {
    return total;
  }

  public void setTotal(Double total) {
    this.total = total;
  }

  public String getTemps() {
    return temps;
  }

  public void setTemps(String temps) {
    this.temps = temps;
  }

  public Devis getDevis() {
    return devis;
  }

  public void setDevis(Devis devis) {
    this.devis = devis;
  }
}
