import { Role } from "../enums/role";

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role?: string;  
  bio?: string;
  localisation?: string;
}
