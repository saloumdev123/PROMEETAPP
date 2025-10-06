package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Devis {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String numero;
  private LocalDate date;
  private String clientNom;
  private String clientAdresse;
  private String clientVille;
  private String clientTel;
  private String description;
  private Double totalHT;
  private Double tva;
  private Double totalTTC;

  @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL)
  private List<LigneDevis> lignes = new ArrayList<>();
  @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Fourniture> fournitures;

  public List<Fourniture> getFournitures() {
    return fournitures;
  }

  public void setFournitures(List<Fourniture> fournitures) {
    this.fournitures = fournitures;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNumero() {
    return numero;
  }

  public void setNumero(String numero) {
    this.numero = numero;
  }

  public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public String getClientNom() {
    return clientNom;
  }

  public void setClientNom(String clientNom) {
    this.clientNom = clientNom;
  }

  public String getClientAdresse() {
    return clientAdresse;
  }

  public void setClientAdresse(String clientAdresse) {
    this.clientAdresse = clientAdresse;
  }

  public String getClientVille() {
    return clientVille;
  }

  public void setClientVille(String clientVille) {
    this.clientVille = clientVille;
  }

  public String getClientTel() {
    return clientTel;
  }

  public void setClientTel(String clientTel) {
    this.clientTel = clientTel;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Double getTotalHT() {
    return totalHT;
  }

  public void setTotalHT(Double totalHT) {
    this.totalHT = totalHT;
  }

  public Double getTva() {
    return tva;
  }

  public void setTva(Double tva) {
    this.tva = tva;
  }

  public Double getTotalTTC() {
    return totalTTC;
  }

  public void setTotalTTC(Double totalTTC) {
    this.totalTTC = totalTTC;
  }

  public List<LigneDevis> getLignes() {
    return lignes;
  }

  public void setLignes(List<LigneDevis> lignes) {
    this.lignes = lignes;
  }
}
