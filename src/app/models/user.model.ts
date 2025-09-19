export interface User {
  id: number;

  // Infos personnelles
  nom: string;
  prenom: string;
  email: string;
  telephone: string;

  // Rôle (PARTICULIER, PROFESSIONNEL, ADMIN)
  userRole: 'PARTICULIER' | 'PROFESSIONNEL' | 'ADMIN';

  // Optionnel, utile pour les professionnels
  metier: string;
  typeIdentification: 'SIREN' | 'NINEA';
  numeroIdentification: string;

  // Localisation
  adresse: string;
}


export interface AuthResponse {
  token: string;
  user: User;
}