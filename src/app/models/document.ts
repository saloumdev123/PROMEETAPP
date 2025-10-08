export interface Document {
  id?: number;
  nomFichier: string;
  type: string; // ex: "CV", "LM", "Diplôme", etc.
  url?: string; // chemin de stockage (S3, disque, etc.)
  dateUpload?: string; // ISO string (yyyy-MM-ddTHH:mm:ss)
  candidatId: number; // relation avec Candidat
}
