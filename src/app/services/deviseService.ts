import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from '../models/devise';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private baseUrl = 'http://localhost:8091/api/devis';

  constructor(private http: HttpClient) {}

  /** 🔹 Créer un devis */
  create(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(`${this.baseUrl}`, devis);
  }

  /** 🔹 Récupérer tous les devis */
  getAll(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.baseUrl}`);
  }

  /** 🔹 Récupérer un devis par ID */
  getById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 Mettre à jour un devis */
  update(id: number, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.baseUrl}/${id}`, devis);
  }

  /** 🔹 Supprimer un devis */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** 🔹 Télécharger un PDF du devis (si ton backend le prévoit) */
  downloadPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/pdf`, { responseType: 'blob' });
  }
}
