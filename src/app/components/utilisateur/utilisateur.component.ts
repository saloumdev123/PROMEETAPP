import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../config/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurCreateDTO } from '../../interfaces/UtilisateurCreateDTO';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../interfaces/utilisateur';

@Component({
  selector: 'app-utilisateur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utilisateur.component.html',
  styleUrl: './utilisateur.component.css'
})
export class UtilisateurComponent implements OnInit {
 sidebarCollapsed = false;
  utilisateurs: Utilisateur[] = [];

  constructor(public auth: AuthService, private router: Router, private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
     if (this.userRole === 'ADMIN') {
      this.loadUtilisateurs();
    }
  }
   loadUtilisateurs(): void {
    this.utilisateurService.getAllUtilisateurs().subscribe({
      next: (data) => {
        this.utilisateurs = data;
      },
      error: (err) => console.error('Erreur chargement utilisateurs', err)
    });
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  get userRole(): string | null {
    return this.auth.getRole();
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
