export interface User {
   id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  bio?: string;
  localisation?: string;
}

export enum UserRole {
  CLIENT = 'CLIENT',
  PRESTATAIRE = 'PRESTATAIRE',
  ADMIN = 'ADMIN'
}


export interface AuthResponse {
  token: string;
  user: User;
}