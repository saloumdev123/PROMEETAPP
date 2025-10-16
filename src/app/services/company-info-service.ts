import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyInfo } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {

  private apiUrl = 'http://localhost:8091/api/company-info';

  constructor(private http: HttpClient) {}

  /** 🔐 Génère les en-têtes avec le token JWT */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /** 📜 Récupérer toutes les infos société */
  getAll(): Observable<CompanyInfo[]> {
    return this.http.get<CompanyInfo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /** 🔍 Récupérer une société par son ID */
  getById(id: number): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  /** ➕ Créer une nouvelle société */
  create(company: CompanyInfo): Observable<CompanyInfo> {
    return this.http.post<CompanyInfo>(this.apiUrl, company, { headers: this.getHeaders() });
  }

  /** ✏️ Mettre à jour une société */
  update(id: number, company: CompanyInfo): Observable<CompanyInfo> {
    return this.http.put<CompanyInfo>(`${this.apiUrl}/${id}`, company, { headers: this.getHeaders() });
  }

  /** ❌ Supprimer une société */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
