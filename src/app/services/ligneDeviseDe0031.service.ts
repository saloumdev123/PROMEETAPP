import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LigneDevisDe0031 } from '../models/ligneDeviseDe0031';

@Injectable({
  providedIn: 'root'
})
export class LigneDevisDe0031Service {
  private apiUrl = 'http://localhost:8091/api/lignes-devis-de0031';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LigneDevisDe0031[]> {
    return this.http.get<LigneDevisDe0031[]>(this.apiUrl);
  }

  getById(id: number): Observable<LigneDevisDe0031> {
    return this.http.get<LigneDevisDe0031>(`${this.apiUrl}/${id}`);
  }

  create(ligne: LigneDevisDe0031): Observable<LigneDevisDe0031> {
    return this.http.post<LigneDevisDe0031>(this.apiUrl, ligne);
  }

  update(id: number, ligne: LigneDevisDe0031): Observable<LigneDevisDe0031> {
    return this.http.put<LigneDevisDe0031>(`${this.apiUrl}/${id}`, ligne);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
