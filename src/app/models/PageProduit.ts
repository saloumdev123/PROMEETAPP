import { Produit } from "./produit";

export interface PageProduit {
  content: Produit[];   // liste des produits
  number: number;       // page actuelle
  totalPages: number;   // nombre total de pages
  size: number;         // taille de la page
  totalElements: number;// nombre total de produits
}