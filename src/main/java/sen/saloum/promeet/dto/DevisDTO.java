package sen.saloum.promeet.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.models.TravauxItem;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DevisDTO {
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
    private List<DevisItemDto> items;
    private EntrepriseDto entreprise;

    private String posteTitle;
    private String descriptionPoste;
    private String assistanceTechnique;
    private String profil;
    private Double totalHt;
    private List<TravauxItem> travaux;
private String siret;

    public String getSiret() {
        return siret;
    }

    public void setSiret(String siret) {
        this.siret = siret;
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

    public Double getTotalHt() {
        return totalHt;
    }

    public void setTotalHt(Double totalHt) {
        this.totalHt = totalHt;
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

    public List<DevisItemDto> getItems() {
        return items;
    }

    public void setItems(List<DevisItemDto> items) {
        this.items = items;
    }

    public EntrepriseDto getEntreprise() {
        return entreprise;
    }

    public void setEntreprise(EntrepriseDto entreprise) {
        this.entreprise = entreprise;
    }
}
