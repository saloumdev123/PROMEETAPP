import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/auth/login/login';
import { OffreList } from './components/offre/offre-list/offre-list';
import { OffreForm } from './components/offre/offre-form/offre-form';
import { ReservationComponent } from './components/reservation/reservation';
import { Avis } from './components/avis/avis';
import { Dashboard } from './components/dashboard/dashboard';
import { Home } from './components/home/home';
import { RegisterComponent } from './components/auth/register/register';
import { OfferDetail } from './components/offre/offer-detail/offer-detail';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PaiementComponent } from './components/paiement/paiement.component ';
import { ProfileEdit } from './components/profile-edit/profile-edit';
import { Profile } from './components/profile/profile';
import { Utilisateurs } from './components/utilisateurs/utilisateurs';
export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:  'dashboard', component: Dashboard},
  { path: 'offres', component: OffreList },
  { path: 'mes-offres', component: OffreList },
  { path: 'offres/create', component: OffreForm },
  { path: 'offres/edit/:id', component: OffreForm },
  { path: 'offres/:id', component: OfferDetail },
  { path: 'admin/users', component: Utilisateurs, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationComponent },
  {path: 'reservations/:id', component: ReservationComponent},
   { path: 'reset-password', component: ResetPasswordComponent },
   {path: 'paiement', component: PaiementComponent} ,
    {path: 'home', component: Home, canActivate: [AuthGuard]},
    { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEdit, canActivate: [AuthGuard] },
  { path: 'avis', component: Avis },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];