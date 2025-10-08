export interface Abonnement {
  id?: number;
  type?: string;
  dateDebut: string; // ISO string
  dateFin: string;   // ISO string
  actif: boolean;
  candidatId?: number; // si lié à un candidat
}
