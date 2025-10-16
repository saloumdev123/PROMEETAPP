import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from '../models/devise';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = 'http://localhost:8091/api/devis';

    constructor(private http: HttpClient) {}

  getAll(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.apiUrl);
  }

  getById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${id}`);
  }

  create(data: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, data);
  }

  update(id: number, data: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 📄 Génération PDF
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }

}
