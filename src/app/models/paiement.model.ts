export interface Paiement {
  id?: number;
  montant: number;
  datePaiement: string;
  modePaiement: string;
  referenceTransaction: string;
  statut: string;
  reservationId: number;
  reservation?: any;
}