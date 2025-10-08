export interface Entreprise {
  id?: number;
  nom: string;
  responsable: string;
  adresse: string;
  codePostalVille: string;
  telephone: string;
  email: string;
  siret: string;
  codeApe: string;
  tvaIntracom: string;
  indice?: string;
  logoUrl?: string;
}
