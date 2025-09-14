export interface Prestataire {
  type: 'entreprise' | 'particulier'; 
  metier: string;                     
  siren?: string;                     
  adresse: string;                    
  nom: string;                       
  prenom: string;                     
  email: string;                     
  telephone: string;                 
  motDePasse: string;                
  newsletter: boolean;                
  cgu: boolean;                       
}


