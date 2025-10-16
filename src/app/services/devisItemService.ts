import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DevisItem {
  id?: number;
  referenceCode?: string;
  label?: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  lineTotal?: number;
  tvaRate?: number;
  devisId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class DevisItemService {
  private apiUrl = 'http://localhost:8091/api/devis-items';
  constructor(private http: HttpClient) {}

  getAll(): Observable<DevisItem[]> {
    return this.http.get<DevisItem[]>(this.apiUrl);
  }

  getById(id: number): Observable<DevisItem> {
    return this.http.get<DevisItem>(`${this.apiUrl}/${id}`);
  }

  create(item: DevisItem): Observable<DevisItem> {
    return this.http.post<DevisItem>(this.apiUrl, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
