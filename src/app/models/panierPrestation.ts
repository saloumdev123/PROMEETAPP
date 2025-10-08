import { Artisan } from "./artisan";

export interface PanierPrestation {
  id: number;
  utilisateur: string;
  artisan: Artisan;
  prestation: string;
  devis: number;
  prixEstime: number;
}