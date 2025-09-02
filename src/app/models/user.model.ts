export interface User {
  id?: number;
  nom: string;
  email: string;
  password?: string;
  role: 'CLIENT' | 'PRESTATAIRE' | 'ADMIN';
  createdAt?: Date;
  updatedAt?: Date;
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