import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fourniture } from '../models/fourniture';

@Injectable({
  providedIn: 'root'
})
export class FournitureService {
  private baseUrl = 'http://localhost:8091/api/fournitures'; // URL directe

  constructor(private http: HttpClient) {}

  create(fourniture: Fourniture): Observable<Fourniture> {
    return this.http.post<Fourniture>(this.baseUrl, fourniture);
  }

  getAll(): Observable<Fourniture[]> {
    return this.http.get<Fourniture[]>(this.baseUrl);
  }

  getById(id: number): Observable<Fourniture> {
    return this.http.get<Fourniture>(`${this.baseUrl}/${id}`);
  }

  update(id: number, fourniture: Fourniture): Observable<Fourniture> {
    return this.http.put<Fourniture>(`${this.baseUrl}/${id}`, fourniture);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
