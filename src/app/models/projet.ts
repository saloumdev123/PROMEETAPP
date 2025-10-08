import { Developpeur } from "./developpeur";

export interface Projet {
  id?: number;
  nom: string;
  description?: string;
  client?: string;
  dateDebut?: string; // Format ISO
  dateFin?: string;   // Format ISO
  statut?: string; // EX: EN_COURS, TERMINE, EN_ATTENTE
  budget?: number;
 developpeurNom?: string;
 telephone:string;
 email:string;
}
