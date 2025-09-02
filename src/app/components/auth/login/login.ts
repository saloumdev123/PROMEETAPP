import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ForgotPasswordRequest, LoginRequest } from '../../../models/authResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
 credentials: LoginRequest = {
    email: '',
    password: ''
  };
  
  // ✅ Déclarations manquantes
  forgotEmail: string = '';
  showForgotPassword: boolean = false;
  
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
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
      next: (res) => {
        alert('Lien de réinitialisation envoyé ! Vérifiez votre email.');
        this.showForgotPassword = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l\'envoi du lien.');
        this.isLoading = false;
      }
    });
  }
}
