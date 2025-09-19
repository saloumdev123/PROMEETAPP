export interface Prestataire {
 role: 'PARTICULIER' | 'PROFESSIONNEL' | 'ADMIN';

  // Métier ou activité (utile surtout pour les pros)
  metier?: string;

  // Identification légale (utile surtout pour les pros/entreprises)
  typeIdentification?: 'SIREN' | 'NINEA';
  numeroIdentification?: string;

  // Infos de base
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;

  // Auth
  motDePasse: string;                      
}


