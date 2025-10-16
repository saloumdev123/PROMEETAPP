package sen.saloum.promeet.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentInfoDTO { 
    private Long id;
    private String documentType;
    private String documentNumber;
    private LocalDate documentDate;
    private String reference;
    private String modeReglement;
    private String echeance;
    private String nIdCee;
    private Double tauxEuro;
    private Double remiseGlobale;
    private Double tauxTva;
    private String remarks;
    private Long companyInfoId;
    private Long clientInfoId;
    private List<DocumentItemDTO> items;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDocumentType() {
        return documentType;
    }

    public void setDocumentType(String documentType) {
        this.documentType = documentType;
    }

    public String getDocumentNumber() {
        return documentNumber;
    }

    public void setDocumentNumber(String documentNumber) {
        this.documentNumber = documentNumber;
    }

    public LocalDate getDocumentDate() {
        return documentDate;
    }

    public void setDocumentDate(LocalDate documentDate) {
        this.documentDate = documentDate;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getModeReglement() {
        return modeReglement;
    }

    public void setModeReglement(String modeReglement) {
        this.modeReglement = modeReglement;
    }

    public String getEcheance() {
        return echeance;
    }

    public void setEcheance(String echeance) {
        this.echeance = echeance;
    }

    public String getnIdCee() {
        return nIdCee;
    }

    public void setnIdCee(String nIdCee) {
        this.nIdCee = nIdCee;
    }

    public Double getTauxEuro() {
        return tauxEuro;
    }

    public void setTauxEuro(Double tauxEuro) {
        this.tauxEuro = tauxEuro;
    }

    public Double getRemiseGlobale() {
        return remiseGlobale;
    }

    public void setRemiseGlobale(Double remiseGlobale) {
        this.remiseGlobale = remiseGlobale;
    }

    public Double getTauxTva() {
        return tauxTva;
    }

    public void setTauxTva(Double tauxTva) {
        this.tauxTva = tauxTva;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public Long getCompanyInfoId() {
        return companyInfoId;
    }

    public void setCompanyInfoId(Long companyInfoId) {
        this.companyInfoId = companyInfoId;
    }

    public Long getClientInfoId() {
        return clientInfoId;
    }

    public void setClientInfoId(Long clientInfoId) {
        this.clientInfoId = clientInfoId;
    }

    public List<DocumentItemDTO> getItems() {
        return items;
    }

    public void setItems(List<DocumentItemDTO> items) {
        this.items = items;
    }
}
