export interface Produit {
 id?: number;
  nom: string;
  description: string;
  prix: number;
  image: string;
  quantiteEnStock: number;
  magasinId: number;
  categorieId: number;
}
