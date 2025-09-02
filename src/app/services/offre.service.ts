import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Offre } from '../models/offre.model';

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private readonly API_URL = 'http://localhost:8091/api/offres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(offre: Partial<Offre>): Observable<Offre> {
    return this.http.post<Offre>(this.API_URL, offre)
      .pipe(catchError(this.handleError));
  }

  update(offre: Offre): Observable<Offre> {
    return this.http.put<Offre>(`${this.API_URL}/${offre.id}`, offre)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getByPrestataire(prestataireId: number): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.API_URL}/prestataire/${prestataireId}`)
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