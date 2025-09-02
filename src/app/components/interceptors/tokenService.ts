import { Injectable } from "@angular/core";
import { AuthResponse } from "../../models/authResponse";

@Injectable({ providedIn: 'root' })
export class TokenService {
  saveTokens(auth: AuthResponse) {
    localStorage.setItem('accessToken', auth.accessToken);
    localStorage.setItem('refreshToken', auth.refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
