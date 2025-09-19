import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
user: User = {
  id: 0,
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  userRole: 'PARTICULIER',
  metier: '',
  adresse: '',
  typeIdentification: 'SIREN',
  numeroIdentification: ''
};

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
     const current = this.authService.currentUser;
  if (current) this.user = { ...current };
  }

  updateProfile(): void {
    if (!this.user) return;
    this.userService.update(this.user).subscribe({
      next: updated => {
        console.log('Profil mis à jour', updated);
        // Optionnel : mettre à jour le currentUser dans AuthService
        this.authService.setCurrentUser(updated);
      },
      error: err => console.error('Erreur mise à jour profil', err)
    });
  }
}
