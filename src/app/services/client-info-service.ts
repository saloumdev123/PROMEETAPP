import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientInfo } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
private apiUrl = 'http://localhost:8091/api/client-info';

  constructor(private http: HttpClient) {}

  // ✅ Récupération des headers avec token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 🟢 Créer un client-info
  create(clientInfo: ClientInfo): Observable<ClientInfo> {
    return this.http.post<ClientInfo>(this.apiUrl, clientInfo, { headers: this.getHeaders() });
  }

  // 🟡 Récupérer tous les client-info
  getAll(): Observable<ClientInfo[]> {
    return this.http.get<ClientInfo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // 🔵 Récupérer un client-info par ID
  getById(id: number): Observable<ClientInfo> {
    return this.http.get<ClientInfo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // 🟠 Mettre à jour un client-info
  update(id: number, clientInfo: ClientInfo): Observable<ClientInfo> {
    return this.http.put<ClientInfo>(`${this.apiUrl}/${id}`, clientInfo, { headers: this.getHeaders() });
  }

  // 🔴 Supprimer un client-info
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
