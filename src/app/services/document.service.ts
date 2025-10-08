import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8091/api/documents';

  constructor(private http: HttpClient) {}

  add(dto: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, dto);
  }

  getByCandidat(candidatId: number, page: number = 0, size: number = 10): Observable<Page<Document>> {
    return this.http.get<Page<Document>>(
      `${this.apiUrl}/candidat/${candidatId}?page=${page}&size=${size}`
    );
  }

  search(keyword: string, page: number = 0, size: number = 10): Observable<Page<Document>> {
    return this.http.get<Page<Document>>(
      `${this.apiUrl}/search?keyword=${keyword}&page=${page}&size=${size}`
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
