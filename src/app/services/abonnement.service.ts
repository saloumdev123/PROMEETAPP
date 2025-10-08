import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnement } from '../models/abonnement';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  private apiUrl = 'http://localhost:8091/api/abonnements';

  constructor(private http: HttpClient) {}

  createOrUpdate(dto: Abonnement): Observable<Abonnement> {
    return this.http.post<Abonnement>(this.apiUrl, dto);
  }

  getActive(page: number = 0, size: number = 10): Observable<Page<Abonnement>> {
    return this.http.get<Page<Abonnement>>(`${this.apiUrl}/actifs?page=${page}&size=${size}`);
  }

  getExpired(page: number = 0, size: number = 10): Observable<Page<Abonnement>> {
    return this.http.get<Page<Abonnement>>(`${this.apiUrl}/expires?page=${page}&size=${size}`);
  }
}
