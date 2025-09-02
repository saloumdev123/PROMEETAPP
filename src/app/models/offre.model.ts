export interface Offre {
  id?: number;
  titre: string;
  description: string;
  prix: number;
  categorie?: string;           // nouvelle propriété
  image?: string;               // nouvelle propriété
  createdAt?: Date;
  updatedAt?: Date;
  prestataireId: number;
  prestataire?: any;            // optionnel, pour les infos du prestataire
  reservationsId?: number;   // liste des ids de réservations associées
}
