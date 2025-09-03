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

  constructor(private authService: AuthService, private router: Router) {}
 

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
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
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
}
