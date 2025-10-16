export interface Entreprise {
  id?: number;
  nom: string;
  portable: string;
  adresse: string;
  telephone: string;
  email: string;
  siret: string;
  codeApe: string;
  numeroTva: string;
  dirigeant: string;
  indice?: string;        // Ex: "Particulier"
  numeroLot?: string;     // Ex: "TRAVAUX Projet MACONNERIE"
  lieu?: string;          // Ex: "Espagne"
  departement?: string;   // Ex: "10"
  reference?: string;     // Ex: "TRAVAUX MACONNERIE"
  affaire?: string;

}
