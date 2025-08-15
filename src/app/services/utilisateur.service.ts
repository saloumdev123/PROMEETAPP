import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../interfaces/utilisateur';
import { Observable } from 'rxjs';
import { UtilisateurCreateDTO } from '../interfaces/UtilisateurCreateDTO';



@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private baseUrl = 'http://localhost:8091/api/utilisateurs';

  constructor(private http: HttpClient) { }

  getAllUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.baseUrl);
  }

  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.baseUrl}/${id}`);
  }

  createUtilisateur(utilisateur: UtilisateurCreateDTO): Observable<Utilisateur> {
  return this.http.post<Utilisateur>(this.baseUrl, utilisateur);
}


  updateUtilisateur(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.baseUrl}/${id}`, utilisateur);
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  searchUtilisateurs(keyword: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/search`, {
      params: new HttpParams().set('keyword', keyword)
    });
  }

  getUtilisateursByRole(role: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/role/${role}`);
  }

  getUtilisateursByLocalisation(localisation: string): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${this.baseUrl}/localisation`, {
      params: new HttpParams().set('localisation', localisation)
    });
  }
}
