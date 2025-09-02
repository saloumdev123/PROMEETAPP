import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Paiement } from '../models/paiement.model';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private readonly API_URL = 'http://localhost:8091/api/paiements';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(paiement: Partial<Paiement>): Observable<Paiement> {
    return this.http.post<Paiement>(this.API_URL, paiement)
      .pipe(catchError(this.handleError));
  }

  update(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.API_URL}/${paiement.id}`, paiement)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getByReservation(reservationId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.API_URL}/reservation/${reservationId}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client: ${error.error.message}`;
    } else {
      errorMessage = `Erreur serveur: ${error.status} - ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}