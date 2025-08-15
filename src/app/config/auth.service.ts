import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';
import { map } from 'rxjs/operators';




export type AppRole = 'CLIENT' | 'PRESTATAIRE' | 'ADMIN';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'http://localhost:8091/api/auth';

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getAccessToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('access') : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('refresh') : null;
  }

  setTokens(access: string, refresh: string) {
    if (this.isBrowser()) {
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        this.http.post(`${this.api}/logout`, { refreshToken }).subscribe();
      }
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;
    try {
      const payload = this.decodeJwt(token);
      return Date.now() < payload.exp * 1000;
    } catch {
      return false;
    }
  }

  getRole(): AppRole | null {
    const token = this.getAccessToken();
    if (!token) return null;
    try {
      const payload = this.decodeJwt(token);
      return payload.role as AppRole;
    } catch {
      return null;
    }
  }

  private decodeJwt(token: string): any {
    const base64 = token.split('.')[1];
    return JSON.parse(atob(base64.replace(/-/g, '+').replace(/_/g, '/')));
  }

  refreshAccessToken(): Observable<{ accessToken: string; refreshToken: string }> {
  const refreshToken = this.getRefreshToken();
  if (!refreshToken) return throwError(() => new Error('No refresh token'));
  return this.http.post<{ accessToken: string; refreshToken: string }>(
    `${this.api}/refresh-token`,
    { refreshToken }
  ).pipe(
    tap(res => this.setTokens(res.accessToken, res.refreshToken))
  );
}
login(email: string, password: string): Observable<void> {
  return this.http.post<AuthResponse>(`${this.api}/login`, { email, password }).pipe(
    tap(res => this.setTokens(res.accessToken, res.refreshToken)),
    map(() => void 0) // <-- transforme AuthResponse en void
  );
}
}
