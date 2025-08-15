import { Routes } from '@angular/router';
import { AuthGuard } from './config/auth-guard';
import { RoleGuard } from './config/role-guard';

export const routes: Routes = [

 { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./page/login/login.component').then(m => m.LoginComponent) },

  { path: 'accueil', canActivate: [AuthGuard], loadComponent: () => import('./components/accueil/accueil.component').then(m => m.AccueilComponent) },
  { path: 'admin', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] }, loadComponent: () => import('./page/admin/admin.component').then(m => m.AdminComponent) },
  { path: 'prestataire', canActivate: [AuthGuard, RoleGuard], data: { roles: ['PRESTATAIRE'] }, loadComponent: () => import('./page/pretataire/pretataire.component').then(m => m.PretataireComponent) },
  { path: 'client', canActivate: [AuthGuard, RoleGuard], data: { roles: ['CLIENT'] }, loadComponent: () => import('./page/client/client.component').then(m => m.ClientComponent) },

  // ← AJOUTER LES ROUTES OFFRES / RESERVATIONS
  { path: 'offres', canActivate: [AuthGuard], loadComponent: () => import('./components/offre/offre.component').then(m => m.OffreComponent) },
  { path: 'reservations', canActivate: [AuthGuard], loadComponent: () => import('./components/reservation/reservation.component').then(m => m.ReservationComponent) },

  {
    path: 'utilisateurs',
    loadComponent: () =>
      import('./components/utilisateur/utilisateur.component')
        .then(m => m.UtilisateurComponent)  // ✅ bien cibler l’export
  },
  { path: '**', redirectTo: 'login' },  
];
