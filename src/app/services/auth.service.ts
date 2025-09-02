import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ResetPasswordRequest } from '../models/resetPasswordRequest ';
import { AuthResponse, ForgotPasswordRequest, LoginRequest } from '../models/authResponse';
import { RegisterRequest } from '../models/registerRequest ';
import { Role } from '../enums/role';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private  API_URL = 'http://localhost:8091/api/auth';
 
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

   private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

    getToken(): string | null {
      return this.getAccessToken();
    }

 getAccessToken(): string | null {
  return this.isBrowser() ? localStorage.getItem('accessToken') : null;
}


  getRefreshToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('refresh') : null;
  }

  constructor(private http: HttpClient) {
  if (this.isBrowser()) {
    const user = this.getCurrentUser();
    const auth = this.hasToken();
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(auth);
  }
}

 login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data).pipe(
      tap(res => {
        // Stocker tokens
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.isAuthenticatedSubject.next(true);

        // Récupérer le profil après login
        this.getProfile().subscribe({
          next: user => this.setCurrentUser(user),
          error: err => console.error('Erreur récupération profil après login', err)
        });
      })
    );
  }
   private decodeJwt(token: string): any {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64.replace(/-/g, '+').replace(/_/g, '/')));
  }
  getRole(): Role | null {
  const token = this.getAccessToken();
  if (!token) return null;
  try {
    const payload = this.decodeJwt(token);
    return payload.role as Role;
  } catch {
    return null;
  }
}

 hasRole(role: Role): boolean {
    return this.getRole() === role;
  }

    hasAnyRole(roles: Role[]): boolean {
    const currentRole = this.getRole();
    return currentRole ? roles.includes(currentRole) : false;
  }
  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): User | null {
  if (!this.isBrowser()) return null;
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

 private hasToken(): boolean {
  if (!this.isBrowser()) return false;
  return !!localStorage.getItem('accessToken');
}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/refresh-token`, { refreshToken });
  }

  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, data);
  }

  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password`, data);
  }

  getProfile(): Observable<User> {
    const token = this.getAccessToken();
    if (!token) throw new Error('Token manquant');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.API_URL}/profile`, { headers }).pipe(
      tap(user => this.setCurrentUser(user))
    );
  }

}