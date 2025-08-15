export interface UtilisateurCreateDTO {
  id: number; 
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  bio?: string;
  localisation?: string;
  motDePasse: string;
  role: string; // string ici
}
