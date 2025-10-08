import { Fourniture } from "./fourniture";
import { LigneDevis } from "./ligneDevise";


export interface Devis {
  id?: number;
  numero: string;
  date: string;
  clientNom: string;
  clientAdresse: string;
  clientVille: string;
  clientTel: string;
  email: string;
  description?: string;
  totalHT?: number;
  tva?: number;
  totalTTC?: number;
  lignes?: LigneDevis[];
  fournitures?: Fourniture[];
}
