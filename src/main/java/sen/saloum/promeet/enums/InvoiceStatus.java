package sen.saloum.promeet.enums;

public enum InvoiceStatus {
    BROUILLON,   // Facture en cours de préparation
    ENVOYÉE,     // Facture envoyée au client
    PAYÉE,        // Facture réglée
    EN_RETARD,   // Facture échue mais non payée
    ANNULÉE,
    EN_ATTENTE
}
