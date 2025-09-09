import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categori';

@Injectable({
  providedIn: 'root'
})
export class CategoriService {

  
  private apiUrl = 'http://localhost:8091/api/categories';

  constructor(private http: HttpClient) { }

  // 🔹 Créer une catégorie
  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiUrl, categorie);
  }

  // 🔹 Récupérer toutes les catégories
  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl);
  }

  // 🔹 Récupérer une catégorie par ID
  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Mettre à jour une catégorie
  updateCategorie(id: number, categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/${id}`, categorie);
  }

  // 🔹 Supprimer une catégorie
  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
