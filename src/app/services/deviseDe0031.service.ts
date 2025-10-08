import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DevisDe0031 } from '../models/deviseDe0031';

@Injectable({
  providedIn: 'root'
})
export class DevisDe0031Service {
  private apiUrl = 'http://localhost:8091/api/devis-de0031';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DevisDe0031[]> {
    return this.http.get<DevisDe0031[]>(this.apiUrl);
  }

  getById(id: number): Observable<DevisDe0031> {
    return this.http.get<DevisDe0031>(`${this.apiUrl}/${id}`);
  }

  create(devis: DevisDe0031): Observable<DevisDe0031> {
    return this.http.post<DevisDe0031>(this.apiUrl, devis);
  }

  update(id: number, devis: DevisDe0031): Observable<DevisDe0031> {
    return this.http.put<DevisDe0031>(`${this.apiUrl}/${id}`, devis);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
