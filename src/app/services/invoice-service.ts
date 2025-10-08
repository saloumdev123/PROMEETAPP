import { Injectable, OnInit } from '@angular/core';
import { Devis } from '../models/devise';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DevisService } from './deviseService';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService implements OnInit {
  
  
  private apiUrl = 'http://localhost:8091/api/devis'; // ou ton endpoint réel

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // ✅ Récupère toutes les factures / devis
  getAll(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}`);
  }

  // ✅ Récupère un devis par ID
  getById(id: number): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/${id}`);
  }

  // ✅ Exemple de sauvegarde
  save(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(this.apiUrl, devis);
  }


}
