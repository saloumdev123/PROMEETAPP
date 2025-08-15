import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../config/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurComponent } from '../utilisateur/utilisateur.component';


@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterModule,UtilisateurComponent],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit{
 sidebarCollapsed = false;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

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
