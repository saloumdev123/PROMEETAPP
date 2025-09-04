import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'] 
})
export class ResetPasswordComponent {
 token = '';
  newPassword = '';
  confirmPassword = '';
  loading = false;

  // 🔹 Pour gérer la visibilité des mots de passe
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    // 🔹 Récupérer le token depuis l’URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';
    });
  }

  // 🔹 Toggle visibilité pour le champ "Nouveau mot de passe"
  toggleNewPassword(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  // 🔹 Toggle visibilité pour le champ "Confirmer mot de passe"
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (!this.newPassword || !this.confirmPassword) {
      window.alert('Veuillez remplir tous les champs.');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      window.alert('Les mots de passe ne correspondent pas.');
      return;
    }

    this.loading = true;

    const request: ResetPasswordRequest = {
      token: this.token,
      newPassword: this.newPassword
    };

    this.authService.resetPassword(request).subscribe({
      next: (response: any) => {
        this.loading = false;
        window.alert(response.message || 'Mot de passe réinitialisé avec succès ! Connectez-vous.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Reset password error:', err);
        window.alert('Échec de la réinitialisation. Le token est peut-être invalide ou expiré.');
      }
    });
  }
}
