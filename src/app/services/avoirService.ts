import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Avoir } from '../models/avoir';

@Injectable({
  providedIn: 'root'
})
export class AvoirService {
  private apiUrl = 'http://localhost:8091/api/avoirs'; 

  constructor(private http: HttpClient) {}

  /** 🟢 Créer un nouvel avoir */
  create(avoir: Avoir): Observable<Avoir> {
    return this.http.post<Avoir>(`${this.apiUrl}`, avoir);
  }

  /** 🟣 Récupérer la liste de tous les avoirs */
  getAll(): Observable<Avoir[]> {
    return this.http.get<Avoir[]>(`${this.apiUrl}`);
  }

  /** 🔵 Récupérer un avoir par son ID */
  getById(id: number): Observable<Avoir> {
    return this.http.get<Avoir>(`${this.apiUrl}/${id}`);
  }

  /** 🟠 Mettre à jour un avoir */
  update(id: number, avoir: Avoir): Observable<Avoir> {
    return this.http.put<Avoir>(`${this.apiUrl}/${id}`, avoir);
  }

  /** 🔴 Supprimer un avoir */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** 📄 Télécharger un PDF d’avoir */
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }
}
