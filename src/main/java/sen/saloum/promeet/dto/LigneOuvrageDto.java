package sen.saloum.promeet.dto;

public class LigneOuvrageDto {

    private Long id;
    private String tempsMO;
    private String designation;
    private String unite;
    private Double prixUnitaireHT;
    private Integer quantite;
    private Double montantTotalHT;
    private String tpsTotal;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTempsMO() {
        return tempsMO;
    }

    public void setTempsMO(String tempsMO) {
        this.tempsMO = tempsMO;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getUnite() {
        return unite;
    }

    public void setUnite(String unite) {
        this.unite = unite;
    }

    public Double getPrixUnitaireHT() {
        return prixUnitaireHT;
    }

    public void setPrixUnitaireHT(Double prixUnitaireHT) {
        this.prixUnitaireHT = prixUnitaireHT;
    }

    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }

    public Double getMontantTotalHT() {
        return montantTotalHT;
    }

    public void setMontantTotalHT(Double montantTotalHT) {
        this.montantTotalHT = montantTotalHT;
    }

    public String getTpsTotal() {
        return tpsTotal;
    }

    public void setTpsTotal(String tpsTotal) {
        this.tpsTotal = tpsTotal;
    }
}
