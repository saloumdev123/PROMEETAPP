package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "avoir_items")
@NoArgsConstructor
@AllArgsConstructor
public class AvoirItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String referenceCode;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String label;
    private Integer quantity;
    private Double unitPrice;
    private Double discountRate;
    private Double tvaRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avoir_id")
    private Avoir avoir;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReferenceCode() {
        return referenceCode;
    }

    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Double discountRate) {
        this.discountRate = discountRate;
    }

    public Double getTvaRate() {
        return tvaRate;
    }

    public void setTvaRate(Double tvaRate) {
        this.tvaRate = tvaRate;
    }

    public Avoir getAvoir() {
        return avoir;
    }

    public void setAvoir(Avoir avoir) {
        this.avoir = avoir;
    }
}