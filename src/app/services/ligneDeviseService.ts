import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneDevis } from '../models/ligneDevise';

@Injectable({
  providedIn: 'root'
})
export class LigneDevisService {
  private baseUrl = 'http://localhost:8091/api/lignes-devis'; // URL directe

  constructor(private http: HttpClient) {}

  create(ligne: LigneDevis): Observable<LigneDevis> {
    return this.http.post<LigneDevis>(this.baseUrl, ligne);
  }

  getAll(): Observable<LigneDevis[]> {
    return this.http.get<LigneDevis[]>(this.baseUrl);
  }

  getById(id: number): Observable<LigneDevis> {
    return this.http.get<LigneDevis>(`${this.baseUrl}/${id}`);
  }

  update(id: number, ligne: LigneDevis): Observable<LigneDevis> {
    return this.http.put<LigneDevis>(`${this.baseUrl}/${id}`, ligne);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
