import { Component } from '@angular/core';
import { AuthService } from '../../config/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule,RouterLink, RouterLinkActive,CommonModule,],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Helpers basés sur ton AuthService
  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated(); // ✅ utilise ta méthode
  }

  get userRole(): string | null {
    return this.auth.getRole();
  }
}
