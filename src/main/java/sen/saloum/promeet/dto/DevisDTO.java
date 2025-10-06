package sen.saloum.promeet.dto;

import lombok.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DevisDTO {
    private Long id;
    private String numero;
    private LocalDate date;
    private String clientNom;
    private String clientAdresse;
    private String email;
    private String clientVille;
    private String clientTel;
    private String description;
    private Double totalHT;
    private Double tva;
    private Double totalTTC;
    private List<LigneDevisDTO> lignes;
    private List<FournitureDTO> fournitures;

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

    public List<LigneDevisDTO> getLignes() {
        return lignes;
    }

    public void setLignes(List<LigneDevisDTO> lignes) {
        this.lignes = lignes;
    }

    public List<FournitureDTO> getFournitures() {
        return fournitures;
    }

    public void setFournitures(List<FournitureDTO> fournitures) {
        this.fournitures = fournitures;
    }
}
