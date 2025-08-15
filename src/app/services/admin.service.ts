import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleChangerRequest } from '../interfaces/role-changer-request';
import { UtilisateurCreateDTO } from '../interfaces/UtilisateurCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   private baseUrl = 'http://localhost:8091/api/admin';

  constructor(private http: HttpClient) {}

  changerRoleUtilisateur(id: number, role: 'CLIENT' | 'ADMIN' | 'PRESTATAIRE'): Observable<any> {
    const body: RoleChangerRequest = { role };
    return this.http.put(`${this.baseUrl}/utilisateurs/${id}/role`, body);
  }
  getAllUtilisateurs(): Observable<UtilisateurCreateDTO[]> {
  return this.http.get<UtilisateurCreateDTO[]>(`${this.baseUrl}/utilisateurs`);
}

}
