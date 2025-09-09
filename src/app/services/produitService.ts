import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit';
import { PageProduit } from '../models/PageProduit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8091/api/produits'; 

  constructor(private http: HttpClient) {}

  // ✅ Créer un produit
  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, produit);
  }

  // ✅ Récupérer un produit par ID
  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`);
  }

  // ✅ Récupérer tous les produits (avec pagination)
  getAllProduits(page: number = 0, size: number = 6): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // ✅ Produits par catégorie (avec pagination)
  getProduitsByCategorie(categorieId: number, page: number = 0, size: number = 6): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categorie/${categorieId}?page=${page}&size=${size}`);
  }

  // ✅ Mettre à jour un produit
  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/${id}`, produit);
  }

  // ✅ Supprimer un produit
  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Produits par magasin (avec pagination)
  getProduitsByMagasin(magasinId: number, page: number = 0, size: number = 6): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/magasin/${magasinId}/page?page=${page}&size=${size}`);
  }

  // ✅ Produits par magasin et catégorie
  getProduitsByMagasinAndCategorie(magasinId: number, categorieId: number): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/magasin/${magasinId}/categorie/${categorieId}`);
  }

  // Dans ProduitService
getProduitsFiltres(
  categorieId: number | null,
  searchKeyword: string,
  minPrice: number | null,
  maxPrice: number | null,
  page: number = 0,
  size: number = 6
): Observable<any> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  if (categorieId !== null) params = params.set('categorieId', categorieId.toString());
  if (searchKeyword) params = params.set('search', searchKeyword);
  if (minPrice !== null) params = params.set('minPrice', minPrice.toString());
  if (maxPrice !== null) params = params.set('maxPrice', maxPrice.toString());

  return this.http.get<any>(`${this.apiUrl}/filter`, { params });
}

}
