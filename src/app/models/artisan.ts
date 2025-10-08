export interface Artisan {
  id: number;
  nom: string;
  secteur: string;
  metier: string;
  localisation: string;
  disponibilite: string;
  rc: string;   // Responsabilité civile
  dcts: string;   // Décennale
  devis: number;
  duree?: string;
}