import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Avis } from '../components/avis/avis';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private readonly API_URL = 'http://localhost:8091/api/avis';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.API_URL)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Avis> {
    return this.http.get<Avis>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(avis: Partial<Avis>): Observable<Avis> {
    return this.http.post<Avis>(this.API_URL, avis)
      .pipe(catchError(this.handleError));
  }

  update(avis: Avis): Observable<Avis> {
    return this.http.put<Avis>(`${this.API_URL}/${avis.id}`, avis)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getByOffre(offreId: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.API_URL}/offre/${offreId}`)
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