import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentInfo } from '../models/document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentInfoService {

    private apiUrl = 'http://localhost:8091/api/documents-info';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAll(): Observable<DocumentInfo[]> {
    return this.http.get<DocumentInfo[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<DocumentInfo> {
    return this.http.get<DocumentInfo>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(documentInfo: DocumentInfo): Observable<DocumentInfo> {
    return this.http.post<DocumentInfo>(this.apiUrl, documentInfo, { headers: this.getHeaders() });
  }

  update(id: number, documentInfo: DocumentInfo): Observable<DocumentInfo> {
    return this.http.put<DocumentInfo>(`${this.apiUrl}/${id}`, documentInfo, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
