import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ForgotPasswordRequest, LoginRequest } from '../../../models/authResponse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
 credentials: LoginRequest = { email: '', password: '' };
  forgotEmail: string = '';
  showForgotPassword: boolean = false;
  isLoading = false;
  loginError: string | null = null; // ✅ Message d'erreur backend

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loginError = null;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;

        // Gestion erreurs backend
        if (err.status === 401) {
          this.loginError = "Email ou mot de passe incorrect.";
        } else if (err.status === 404) {
          this.loginError = "Utilisateur introuvable.";
        } else {
          this.loginError = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    });
  }

  toggleForgotPassword(event: Event): void {
    event.preventDefault();
    this.showForgotPassword = !this.showForgotPassword;
    this.forgotEmail = '';
  }

  onForgotPassword(): void {
    if (this.isLoading) return;
    this.isLoading = true;

    const request: ForgotPasswordRequest = { email: this.forgotEmail };
    this.authService.forgotPassword(request).subscribe({
      next: () => {
        alert('Lien de réinitialisation envoyé ! Vérifiez votre email.');
        this.showForgotPassword = false;
        this.isLoading = false;
      },
      error: () => {
        alert('Erreur lors de l\'envoi du lien.');
        this.isLoading = false;
      }
    });
  }
}
