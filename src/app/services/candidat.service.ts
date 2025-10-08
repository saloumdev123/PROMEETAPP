import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Candidat, Macros } from '../models/candidat';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {
  private apiUrl = 'http://localhost:8091/api/candidats'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  // Créer un candidat
  createCandidat(candidat: Candidat): Observable<Candidat> {
    return this.http.post<Candidat>(this.apiUrl, candidat);
  }

  // Récupérer tous les candidats (paginés)
  getCandidats(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // Récupérer un candidat par ID
  getCandidatById(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour un candidat complet
  updateCandidat(id: number, candidat: Candidat): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}`, candidat);
  }

  // Supprimer un candidat
  deleteCandidat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔥 Mettre à jour uniquement les macros
  updateMacros(id: number, macros: Macros): Observable<Candidat> {
    return this.http.put<Candidat>(`${this.apiUrl}/${id}/macros`, macros);
  }

  // Recherche par nom ou prénom
  searchCandidats(keyword: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?keyword=${keyword}&page=${page}&size=${size}`);
  }
}
