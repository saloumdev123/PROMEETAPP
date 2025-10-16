package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "document_items")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;
    private String designation;
    private Double nbHeures;
    private Double puHt;
    private Double remisePercent;
    private Double remiseHt;
    private Double montantHt;
    private Double tva;
    private Integer orderIndex;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "document_info_id")
    private DocumentInfo documentinfo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public Double getNbHeures() {
        return nbHeures;
    }

    public void setNbHeures(Double nbHeures) {
        this.nbHeures = nbHeures;
    }

    public Double getPuHt() {
        return puHt;
    }

    public void setPuHt(Double puHt) {
        this.puHt = puHt;
    }

    public Double getRemisePercent() {
        return remisePercent;
    }

    public void setRemisePercent(Double remisePercent) {
        this.remisePercent = remisePercent;
    }

    public Double getRemiseHt() {
        return remiseHt;
    }

    public void setRemiseHt(Double remiseHt) {
        this.remiseHt = remiseHt;
    }

    public Double getMontantHt() {
        return montantHt;
    }

    public void setMontantHt(Double montantHt) {
        this.montantHt = montantHt;
    }

    public Double getTva() {
        return tva;
    }

    public void setTva(Double tva) {
        this.tva = tva;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public DocumentInfo getDocumentinfo() {
        return documentinfo;
    }

    public void setDocumentinfo(DocumentInfo documentinfo) {
        this.documentinfo = documentinfo;
    }
}
