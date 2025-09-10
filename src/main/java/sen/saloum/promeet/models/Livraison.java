package sen.saloum.promeet.models;

import jakarta.persistence.*;

@Entity
@Table(name = "livraisons")
public class Livraison {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modeLivraison;
    private Double frais;
    private String conditions;

    @ManyToOne
    @JoinColumn(name = "magasin_id")
    private Magasin magasin;

    public Livraison() {
    }

    public Livraison(Long id, String modeLivraison, Double frais, String conditions, Magasin magasin) {
        this.id = id;
        this.modeLivraison = modeLivraison;
        this.frais = frais;
        this.conditions = conditions;
        this.magasin = magasin;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModeLivraison() {
        return modeLivraison;
    }

    public void setModeLivraison(String modeLivraison) {
        this.modeLivraison = modeLivraison;
    }

    public Double getFrais() {
        return frais;
    }

    public void setFrais(Double frais) {
        this.frais = frais;
    }

    public String getConditions() {
        return conditions;
    }

    public void setConditions(String conditions) {
        this.conditions = conditions;
    }

    public Magasin getMagasin() {
        return magasin;
    }

    public void setMagasin(Magasin magasin) {
        this.magasin = magasin;
    }
}
