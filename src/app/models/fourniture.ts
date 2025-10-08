import { TypeFourniture } from "../enums/typeFourniture";

export interface Fourniture {
 id?: number;
  designation: string;
  unite: string;
  quantite: number;
  prixUnitaire: number;
  montantTotal?: number;
  type?: TypeFourniture;
}
