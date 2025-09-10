package sen.saloum.promeet.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import sen.saloum.promeet.enums.StatutPaiement;

import java.time.OffsetDateTime;

    @Entity
    @Table(name = "paiements")
    @AllArgsConstructor
    @NoArgsConstructor
    public class Paiement {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private Double montant;
        private OffsetDateTime datePaiement;
        private String modePaiement; // PAYDUNYA, WAVE, etc.
        private String referenceTransaction;
        private String devise;
        private String telephone;
        private String lienPaiement;

        @Enumerated(EnumType.STRING)
        private StatutPaiement statut;
        @OneToOne
        @JoinColumn(name = "reservation_id")
        private Reservation reservation;


        @OneToOne
        @JoinColumn(name = "facture_id")
        private Facture facture;

        @PrePersist
        public void prePersist() {
            if (datePaiement == null) datePaiement = OffsetDateTime.now();
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public Double getMontant() { return montant; }
        public void setMontant(Double montant) { this.montant = montant; }
        public OffsetDateTime getDatePaiement() { return datePaiement; }
        public void setDatePaiement(OffsetDateTime datePaiement) { this.datePaiement = datePaiement; }
        public String getModePaiement() { return modePaiement; }
        public void setModePaiement(String modePaiement) { this.modePaiement = modePaiement; }
        public String getReferenceTransaction() { return referenceTransaction; }
        public void setReferenceTransaction(String referenceTransaction) { this.referenceTransaction = referenceTransaction; }
        public String getDevise() { return devise; }
        public void setDevise(String devise) { this.devise = devise; }
        public String getTelephone() { return telephone; }
        public void setTelephone(String telephone) { this.telephone = telephone; }
        public StatutPaiement getStatut() { return statut; }
        public void setStatut(StatutPaiement statut) { this.statut = statut; }
        public Facture getFacture() { return facture; }
        public void setFacture(Facture facture) { this.facture = facture; }

        public String getLienPaiement() {
            return lienPaiement;
        }

        public void setLienPaiement(String lienPaiement) {
            this.lienPaiement = lienPaiement;
        }

        public Reservation getReservation() {
            return reservation;
        }

        public void setReservation(Reservation reservation) {
            this.reservation = reservation;
        }
    }
