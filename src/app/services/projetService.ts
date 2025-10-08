import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from '../models/projet';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private apiUrl = 'http://localhost:8091/api/projets'; // ✅ adapte selon ton backend

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer tous les projets
  getAll(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.apiUrl);
  }

  // 🔹 Récupérer un projet par ID
  getById(id: number): Observable<Projet> {
    return this.http.get<Projet>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Créer un projet
  create(projet: Projet): Observable<Projet> {
    return this.http.post<Projet>(this.apiUrl, projet);
  }

  // 🔹 Modifier un projet
  update(id: number, projet: Projet): Observable<Projet> {
    return this.http.put<Projet>(`${this.apiUrl}/${id}`, projet);
  }

  // 🔹 Supprimer un projet
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Rechercher par nom
  searchByNom(nom: string): Observable<Projet[]> {
    const params = new HttpParams().set('nom', nom);
    return this.http.get<Projet[]>(`${this.apiUrl}/search`, { params });
  }

  // 🔹 Recherche globale
  searchGlobal(keyword: string): Observable<Projet[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Projet[]>(`${this.apiUrl}/filter`, { params });
  }

  // 🔹 Récupérer les projets d’un client
  findByClient(clientId: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/client/${clientId}`);
  }

  // 🔹 Récupérer les projets d’un développeur
  findByDeveloppeur(devId: number): Observable<Projet[]> {
    return this.http.get<Projet[]>(`${this.apiUrl}/developpeur/${devId}`);
  }

  // 🔹 Filtrer les projets par période
  findByDateRange(start: string, end: string): Observable<Projet[]> {
    const params = new HttpParams().set('start', start).set('end', end);
    return this.http.get<Projet[]>(`${this.apiUrl}/periode`, { params });
  }
}
