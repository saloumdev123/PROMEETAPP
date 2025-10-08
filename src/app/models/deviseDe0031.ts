import { Entreprise } from './entreprise';
import { Client } from './client';
import { LigneDevisDe0031 } from './ligneDeviseDe0031';

export interface DevisDe0031 {
  id?: number;
  numero: string;
  date: string; // format ISO ex: "2025-10-06"
  devise: string;
  totalHt: number;
  tva: number;
  totalTtc: number;
  tvaPourcentage: number;
  conditionsPaiement: string;
  descriptionPoste: string;
  totalHeures: number;
  entreprise: Entreprise;
  client: Client;
  lignes: LigneDevisDe0031[];
}
