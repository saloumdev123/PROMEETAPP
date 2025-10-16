package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "avoirs")
@NoArgsConstructor@AllArgsConstructor
public class Avoir {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String number;
    private LocalDate dateEmission;
    private LocalDate dateEcheance;

    // 👤 Client
    private String clientName;
    private String clientEmail;
    private String clientPhone;
    private String clientAddress;

    // 🏢 Société
    private String companyName;
    private String companyAddress;
    private String companyEmail;
    private String companyPhone;
    private String companySiret;
    private String companyApe;
    private String companyTvaNumber;

    // 💰 Informations financières
    private String paymentMode;
    private String reference;
    private String devisNumber;
    private String remarque;

    private Double baseHt;
    private Double mtTva;
    private Double totalTtc;
    private Double acompte;
    private Double netAPayer;

    // 🔗 Relation avec les lignes d'articles
    @OneToMany(mappedBy = "avoir", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AvoirItem> items;

    // === Getters / Setters ===
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public LocalDate getDateEmission() { return dateEmission; }
    public void setDateEmission(LocalDate dateEmission) { this.dateEmission = dateEmission; }

    public LocalDate getDateEcheance() { return dateEcheance; }
    public void setDateEcheance(LocalDate dateEcheance) { this.dateEcheance = dateEcheance; }

    public String getClientName() { return clientName; }
    public void setClientName(String clientName) { this.clientName = clientName; }

    public String getClientEmail() { return clientEmail; }
    public void setClientEmail(String clientEmail) { this.clientEmail = clientEmail; }

    public String getClientPhone() { return clientPhone; }
    public void setClientPhone(String clientPhone) { this.clientPhone = clientPhone; }

    public String getClientAddress() { return clientAddress; }
    public void setClientAddress(String clientAddress) { this.clientAddress = clientAddress; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyAddress() { return companyAddress; }
    public void setCompanyAddress(String companyAddress) { this.companyAddress = companyAddress; }

    public String getCompanyEmail() { return companyEmail; }
    public void setCompanyEmail(String companyEmail) { this.companyEmail = companyEmail; }

    public String getCompanyPhone() { return companyPhone; }
    public void setCompanyPhone(String companyPhone) { this.companyPhone = companyPhone; }

    public String getCompanySiret() { return companySiret; }
    public void setCompanySiret(String companySiret) { this.companySiret = companySiret; }

    public String getCompanyApe() { return companyApe; }
    public void setCompanyApe(String companyApe) { this.companyApe = companyApe; }

    public String getCompanyTvaNumber() { return companyTvaNumber; }
    public void setCompanyTvaNumber(String companyTvaNumber) { this.companyTvaNumber = companyTvaNumber; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public String getReference() { return reference; }
    public void setReference(String reference) { this.reference = reference; }

    public String getDevisNumber() { return devisNumber; }
    public void setDevisNumber(String devisNumber) { this.devisNumber = devisNumber; }

    public String getRemarque() { return remarque; }
    public void setRemarque(String remarque) { this.remarque = remarque; }

    public Double getBaseHt() { return baseHt; }
    public void setBaseHt(Double baseHt) { this.baseHt = baseHt; }

    public Double getMtTva() { return mtTva; }
    public void setMtTva(Double mtTva) { this.mtTva = mtTva; }

    public Double getTotalTtc() { return totalTtc; }
    public void setTotalTtc(Double totalTtc) { this.totalTtc = totalTtc; }

    public Double getAcompte() { return acompte; }
    public void setAcompte(Double acompte) { this.acompte = acompte; }

    public Double getNetAPayer() { return netAPayer; }
    public void setNetAPayer(Double netAPayer) { this.netAPayer = netAPayer; }

    public List<AvoirItem> getItems() { return items; }
    public void setItems(List<AvoirItem> items) { this.items = items; }
}
