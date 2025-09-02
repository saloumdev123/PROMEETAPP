export interface AvisModel {
  id?: number;
  contenu: string;
  note: number;
  utilisateurId: number;
  offreId: number;
  utilisateur?: any;
  offre?: any;
  createdAt?: Date;
}
