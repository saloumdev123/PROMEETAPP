// src/app/models/candidat.model.ts

import { Abonnement } from "../components/abonnement/abonnement";

export interface Macros {
  cv?: string;
  lm?: string;
  cvFibem?: string;
  priseDeNotes?: string;
}

export interface Candidat {
  id?: number;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  dateNaissance?: string;
  metier?: string;

  documents?: string[];   // ou Document[] si tu as un modèle séparé
  photos?: string[];
  macros?: Macros;

  emailCompte?: string;
  reseauxSociaux?: string[];

  abonnement?: Abonnement;
}
