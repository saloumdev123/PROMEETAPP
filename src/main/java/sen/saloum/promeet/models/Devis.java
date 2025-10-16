package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
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
  private LocalDate dateDevis;
  private String clientName;
  private String clientContact;
  private String clientEmail;
  private String clientPhone;
  private String clientAddress;
  private String projet;
  private String lieu;
  private String departement;
  private String affaireNumero;
  private String reference;
  private BigDecimal tva;
  private BigDecimal totalTtc;
  private BigDecimal acompte;


  @Column(length = 2000)
  private String posteTitle;
  @Column(length = 2000)
  private String descriptionPoste;
  @Column(length = 2000)
  private String assistanceTechnique;
  @Column(length = 2000)
  private String profil;
  // ✅ Total HT
  private Double totalHt;

  // ✅ Liste des travaux associés
  @ElementCollection
  @CollectionTable(name = "devis_travaux", joinColumns = @JoinColumn(name = "devis_id"))
  private List<TravauxItem> travaux;

  @OneToMany(mappedBy = "devis", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<DevisItem> items = new ArrayList<>();

  @ManyToOne
  private Entreprise entreprise;
  private String siret;

  public String getSiret() {
    return siret;
  }

  public void setSiret(String siret) {
    this.siret = siret;
  }

  public void setTotalHt(Double totalHt) {
    this.totalHt = totalHt;
  }

  public List<TravauxItem> getTravaux() {
    return travaux;
  }

  public void setTravaux(List<TravauxItem> travaux) {
    this.travaux = travaux;
  }

  public String getPosteTitle() {
    return posteTitle;
  }

  public void setPosteTitle(String posteTitle) {
    this.posteTitle = posteTitle;
  }

  public String getDescriptionPoste() {
    return descriptionPoste;
  }

  public void setDescriptionPoste(String descriptionPoste) {
    this.descriptionPoste = descriptionPoste;
  }

  public String getAssistanceTechnique() {
    return assistanceTechnique;
  }

  public void setAssistanceTechnique(String assistanceTechnique) {
    this.assistanceTechnique = assistanceTechnique;
  }

  public String getProfil() {
    return profil;
  }

  public void setProfil(String profil) {
    this.profil = profil;
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

  public LocalDate getDateDevis() {
    return dateDevis;
  }

  public void setDateDevis(LocalDate dateDevis) {
    this.dateDevis = dateDevis;
  }

  public String getClientName() {
    return clientName;
  }

  public void setClientName(String clientName) {
    this.clientName = clientName;
  }

  public String getClientContact() {
    return clientContact;
  }

  public void setClientContact(String clientContact) {
    this.clientContact = clientContact;
  }

  public String getClientEmail() {
    return clientEmail;
  }

  public void setClientEmail(String clientEmail) {
    this.clientEmail = clientEmail;
  }

  public String getClientPhone() {
    return clientPhone;
  }

  public void setClientPhone(String clientPhone) {
    this.clientPhone = clientPhone;
  }

  public String getClientAddress() {
    return clientAddress;
  }

  public void setClientAddress(String clientAddress) {
    this.clientAddress = clientAddress;
  }

  public String getProjet() {
    return projet;
  }

  public void setProjet(String projet) {
    this.projet = projet;
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

  public String getAffaireNumero() {
    return affaireNumero;
  }

  public void setAffaireNumero(String affaireNumero) {
    this.affaireNumero = affaireNumero;
  }

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public BigDecimal getTva() {
    return tva;
  }

  public void setTva(BigDecimal tva) {
    this.tva = tva;
  }

  public BigDecimal getTotalTtc() {
    return totalTtc;
  }

  public void setTotalTtc(BigDecimal totalTtc) {
    this.totalTtc = totalTtc;
  }

  public BigDecimal getAcompte() {
    return acompte;
  }

  public void setAcompte(BigDecimal acompte) {
    this.acompte = acompte;
  }

  public List<DevisItem> getItems() {
    return items;
  }

  public void setItems(List<DevisItem> items) {
    this.items = items;
  }

  public Entreprise getEntreprise() {
    return entreprise;
  }

  public void setEntreprise(Entreprise entreprise) {
    this.entreprise = entreprise;
  }
}
