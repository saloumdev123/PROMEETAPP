import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Magasin } from '../models/magasin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  
  private apiUrl = 'http://localhost:8091/api/magasins'; 

  constructor(private http: HttpClient) { }

  getMagasins(): Observable<Magasin[]> {
    return this.http.get<Magasin[]>(this.apiUrl);
  }

  getMagasin(id: number): Observable<Magasin> {
    return this.http.get<Magasin>(`${this.apiUrl}/${id}`);
  }

  createMagasin(magasin: Magasin): Observable<Magasin> {
    return this.http.post<Magasin>(this.apiUrl, magasin);
  }

  updateMagasin(id: number, magasin: Magasin): Observable<Magasin> {
    return this.http.put<Magasin>(`${this.apiUrl}/${id}`, magasin);
  }

  deleteMagasin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
