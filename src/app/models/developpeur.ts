import { Projet } from "./projet";

export interface Developpeur {
  id?: number;
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  specialite?: string;
  experience?: number;
  dateEmbauche?: string; // Format ISO (yyyy-MM-dd)
  projet?: Projet;
}
