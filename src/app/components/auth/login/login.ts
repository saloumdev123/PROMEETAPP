import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
  loginError: string | null = null;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }


  toggleForgotPassword(event: Event): void {
    event.preventDefault();
    this.showForgotPassword = !this.showForgotPassword;
    this.loginError = null;
    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;
    this.loginError = null;

    this.authService.login(this.credentials).subscribe({
      next: (user) => {
        this.isLoading = false;

        // Rôle réel (backend via token)
        const backendRole = this.authService.getRole();

        // Rôle choisi via les cases
        const selectedRole = this.credentials.role;

        if (!backendRole || !selectedRole) {
          this.loginError = "Rôle non reconnu.";
          return;
        }

        // Vérifie si l’utilisateur essaie de tricher (ex: choisir CANDIDAT alors qu’il est PARTICULIER)
        if (backendRole !== selectedRole && backendRole !== 'ADMIN') {
          this.loginError = `Vous ne pouvez pas vous connecter en tant que ${selectedRole}. 
        Votre rôle réel est ${backendRole}.`;
          return;
        }

        // Redirection
        switch (backendRole) {
          case 'ADMIN':
            this.router.navigate(['/dashboard-admin']);
            break;
          case 'CANDIDAT':
            this.router.navigate(['/candidats']);
            break;
          case 'PARTENAIRE':
            this.router.navigate(['/dashboard-partenaires']);
            break;
          case 'PARTICULIER':
            this.router.navigate(['/dashboard-particulier']);
            break;
          default:
            this.loginError = "Votre rôle ne vous permet pas d'accéder à cette application.";
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        if (err.status === 401) this.loginError = "Email ou mot de passe incorrect.";
        else if (err.status === 404) this.loginError = "Utilisateur introuvable.";
        else this.loginError = "Une erreur est survenue. Veuillez réessayer.";
      }
    });
  }


  onForgotPassword(): void {
    this.isLoading = true;

    const request: ForgotPasswordRequest = { email: this.forgotEmail };
    this.authService.forgotPassword(request).subscribe({
      next: () => {
        alert('Lien de réinitialisation envoyé ! Vérifiez votre email.');
        this.isLoading = false;
        this.toggleForgotPassword(new Event('click'));
      },
      error: () => {
        alert('Erreur lors de l\'envoi du lien.');
        this.isLoading = false;
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
