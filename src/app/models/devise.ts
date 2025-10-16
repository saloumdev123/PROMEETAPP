import { DevisItem } from "./devisItem";
import { LigneOuvrage } from "./ligneOuvrage";


export interface Devis {
 id?: number;
  number: string;
  dateEmission: string;
  dateEcheance?: string;
  clientName: string;
  clientAddress?: string;
  clientEmail?: string;
  clientPhone?: string;
  reference?: string;
  devisNumber?: string;
  paymentMode?: string;
  baseHt?: number;
  remise?: number;
  mtTva?: number;
  taxRate?: number;
  port?: number;
  totalTtc?: number;
  netAPayer?: number;
  entrepriseId?: number;
  items?:DevisItem[];
  siret?:string;
  lignesOuvrages?: LigneOuvrage[];

    // 🧱 === Champs pour le tableau “POSTE À POURVOIR” ===
  posteTitle?: string;
  descriptionPoste?: string;
  assistanceTechnique?: string;
  profil?: string;
   travaux?: { description: string; montant: number }[];
  totalHt?: number;

}
