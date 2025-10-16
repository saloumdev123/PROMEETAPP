package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.InvoiceStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "invoices")@AllArgsConstructor
@NoArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber;
    private String title;
    private String description;
    private String currency;

    private LocalDate issueDate;
    private LocalDate dueDate;
    private String paymentMode; // Virement, Espèces, Chèque…
    private String reference;   // Commande n°
    private String devisNumber; // Devis lié

    private BigDecimal subTotal;
    private BigDecimal taxAmount;
    private BigDecimal total;
    private BigDecimal amountDue;
    private Double acompte;
    private String number;
    @Enumerated(EnumType.STRING)
    private InvoiceStatus status;

    // === Client infos ===
    private String clientName;
    private String clientEmail;
    private String clientAddress;
    private String clientPhone;
    private String clientMobile;
    private String clientContact;
    private String clientTvaNumber;

    // === Société émettrice (FIBEM) ===
    private String companyName;
    private String companyContact;
    private String companyAddress;
    private String companyPhone;
    private String companyEmail;
    private String companySiret;
    private String companyApe;
    private String companyTvaNumber;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceItem> items = new ArrayList<>();
    @Column(length = 1000)
    private String remarque;

    @Column(length = 1000)
    private String conditionReglement;


    @Column(precision = 10, scale = 2)
    private BigDecimal remise;



    @Column(precision = 5, scale = 2)
    private BigDecimal taxRate;

    @Column(precision = 10, scale = 2)
    private BigDecimal port;






    // --- Getters & Setters ---
    public String getNumber() { return number; }
    public void setNumber(String number) { this.number = number; }

    public Double getAcompte() { return acompte; }
    public void setAcompte(Double acompte) { this.acompte = acompte; }
    public String getRemarque() {
        return remarque;
    }

    public void setRemarque(String remarque) {
        this.remarque = remarque;
    }

    public String getConditionReglement() {
        return conditionReglement;
    }

    public void setConditionReglement(String conditionReglement) {
        this.conditionReglement = conditionReglement;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getDevisNumber() {
        return devisNumber;
    }

    public void setDevisNumber(String devisNumber) {
        this.devisNumber = devisNumber;
    }

    public BigDecimal getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(BigDecimal subTotal) {
        this.subTotal = subTotal;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(BigDecimal amountDue) {
        this.amountDue = amountDue;
    }

    public InvoiceStatus getStatus() {
        return status;
    }

    public void setStatus(InvoiceStatus status) {
        this.status = status;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getClientEmail() {
        return clientEmail;
    }

    public void setClientEmail(String clientEmail) {
        this.clientEmail = clientEmail;
    }

    public String getClientAddress() {
        return clientAddress;
    }

    public void setClientAddress(String clientAddress) {
        this.clientAddress = clientAddress;
    }

    public String getClientPhone() {
        return clientPhone;
    }

    public void setClientPhone(String clientPhone) {
        this.clientPhone = clientPhone;
    }

    public String getClientMobile() {
        return clientMobile;
    }

    public void setClientMobile(String clientMobile) {
        this.clientMobile = clientMobile;
    }

    public String getClientContact() {
        return clientContact;
    }

    public void setClientContact(String clientContact) {
        this.clientContact = clientContact;
    }

    public String getClientTvaNumber() {
        return clientTvaNumber;
    }

    public void setClientTvaNumber(String clientTvaNumber) {
        this.clientTvaNumber = clientTvaNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyContact() {
        return companyContact;
    }

    public void setCompanyContact(String companyContact) {
        this.companyContact = companyContact;
    }

    public String getCompanyAddress() {
        return companyAddress;
    }

    public void setCompanyAddress(String companyAddress) {
        this.companyAddress = companyAddress;
    }

    public String getCompanyPhone() {
        return companyPhone;
    }

    public void setCompanyPhone(String companyPhone) {
        this.companyPhone = companyPhone;
    }

    public String getCompanyEmail() {
        return companyEmail;
    }

    public void setCompanyEmail(String companyEmail) {
        this.companyEmail = companyEmail;
    }

    public String getCompanySiret() {
        return companySiret;
    }

    public void setCompanySiret(String companySiret) {
        this.companySiret = companySiret;
    }

    public String getCompanyApe() {
        return companyApe;
    }

    public void setCompanyApe(String companyApe) {
        this.companyApe = companyApe;
    }

    public String getCompanyTvaNumber() {
        return companyTvaNumber;
    }

    public void setCompanyTvaNumber(String companyTvaNumber) {
        this.companyTvaNumber = companyTvaNumber;
    }

    public List<InvoiceItem> getItems() {
        return items;
    }

    public void setItems(List<InvoiceItem> items) {
        this.items.clear(); // on vide la liste existante pour éviter les doublons
        if (items != null) {
            items.forEach(i -> i.setInvoice(this)); // 🔗 relie chaque item à cette facture
            this.items.addAll(items);
        }
    }


    public BigDecimal getRemise() {
        return remise;
    }

    public void setRemise(BigDecimal remise) {
        this.remise = remise;
    }

    public BigDecimal getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(BigDecimal taxRate) {
        this.taxRate = taxRate;
    }

    public BigDecimal getPort() {
        return port;
    }

    public void setPort(BigDecimal port) {
        this.port = port;
    }
}
