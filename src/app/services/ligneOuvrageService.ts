import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneOuvrage } from '../models/ligneOuvrage';

@Injectable({
  providedIn: 'root'
})
export class LigneOuvrageService {

  private apiUrl = 'http://localhost:8091/api/ligne-ouvrages'; 

  constructor(private http: HttpClient) {}

  // ➕ Créer une ligne d’ouvrage
  create(ligne: LigneOuvrage): Observable<LigneOuvrage> {
    return this.http.post<LigneOuvrage>(this.apiUrl, ligne);
  }

  // 🔁 Récupérer toutes les lignes
  getAll(): Observable<LigneOuvrage[]> {
    return this.http.get<LigneOuvrage[]>(this.apiUrl);
  }

  // 🔍 Récupérer une ligne par ID
  getById(id: number): Observable<LigneOuvrage> {
    return this.http.get<LigneOuvrage>(`${this.apiUrl}/${id}`);
  }

  // ✏️ Mettre à jour une ligne
  update(id: number, ligne: LigneOuvrage): Observable<LigneOuvrage> {
    return this.http.put<LigneOuvrage>(`${this.apiUrl}/${id}`, ligne);
  }

  // ❌ Supprimer une ligne
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
