import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developpeur } from '../models/developpeur';

@Injectable({
  providedIn: 'root'
})
export class DeveloppeurService {
  private apiUrl = 'http://localhost:8091/api/developpeurs'; 
  constructor(private http: HttpClient) {}

  // 🔹 Récupérer tous les développeurs
  getAll(): Observable<Developpeur[]> {
    return this.http.get<Developpeur[]>(this.apiUrl);
  }

  // 🔹 Récupérer un développeur par ID
  getById(id: number): Observable<Developpeur> {
    return this.http.get<Developpeur>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Créer un développeur
  create(dev: Developpeur): Observable<Developpeur> {
    return this.http.post<Developpeur>(this.apiUrl, dev);
  }

  // 🔹 Modifier un développeur
  update(id: number, dev: Developpeur): Observable<Developpeur> {
    return this.http.put<Developpeur>(`${this.apiUrl}/${id}`, dev);
  }

  // 🔹 Supprimer un développeur
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Rechercher par nom
  searchByName(keyword: string): Observable<Developpeur[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Developpeur[]>(`${this.apiUrl}/search`, { params });
  }

  // 🔹 Recherche globale
  searchGlobal(keyword: string): Observable<Developpeur[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Developpeur[]>(`${this.apiUrl}/filter`, { params });
  }
searchByNom(nom: string): Observable<Developpeur[]> {
  return this.http.get<Developpeur[]>(`${this.apiUrl}/search?nom=${nom}`);
}

  // 🔹 Filtrer par spécialité
  findBySpecialite(specialite: string): Observable<Developpeur[]> {
    return this.http.get<Developpeur[]>(`${this.apiUrl}/specialite/${specialite}`);
  }

  // 🔹 Récupérer les développeurs par projet
  findByProjet(projetId: number): Observable<Developpeur[]> {
    return this.http.get<Developpeur[]>(`${this.apiUrl}/projet/${projetId}`);
  }
}
