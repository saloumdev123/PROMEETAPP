import { Role } from "../enums/role";
import { TypeIdentification } from "../enums/typeIdentification";
import { TypePartenaire } from "../enums/typePartenaire";

export interface RegisterRequest {
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  metier: string;
  adresse: string;
  role:Role;                      
 typePartenaire?: TypePartenaire;       // Seulement si role = PARTENAIRE
  numeroIdentification?: string;         // Obligatoire pour Entreprise & Professionnel
  typeIdentification?: TypeIdentification;
}