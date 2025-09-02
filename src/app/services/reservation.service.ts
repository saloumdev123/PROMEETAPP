import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly API_URL = 'http://localhost:8091/api/reservations';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.http.post<Reservation>(this.API_URL, reservation)
      .pipe(catchError(this.handleError));
  }

  update(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.API_URL}/${reservation.id}`, reservation)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getByClient(clientId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.API_URL}/client/${clientId}`)
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