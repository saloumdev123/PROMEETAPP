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
import { ProduitComponent } from './components/produit/produitComponent';
import { CategoriService } from './services/categoriService';
import { CategorieComponent } from './components/categorie-component/categorie-component';
import { AboutComponent } from './components/about-component/about-component';
import { ContactComponent } from './components/contact/contactComponent';
import { MissionListComponent } from './components/mission-list-component/mission-list-component';
import { CandidatComponent } from './components/candidat-component/candidat-component';
import { ReseauComponent } from './components/reseau-component/reseau-component';
import { TeamComponent } from './components/team-component/team-component';
export const routes: Routes = [
  
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path:  'dashboard', component: Dashboard},
  {path: 'offres', component: OffreList },
  {path: 'mes-offres', component: OffreList },
  {path: 'offres/create', component: OffreForm },
  {path: 'offres/edit/:id', component: OffreForm },
  {path: 'offres/:id', component: OfferDetail },
  {path: 'admin/users', component: Utilisateurs, canActivate: [AuthGuard] },
  {path: 'reservations', component: ReservationComponent },
  {path: 'reservations/:id', component: ReservationComponent},
  {path: 'reset-password', component: ResetPasswordComponent },
  {path: 'paiement', component: PaiementComponent} ,
  {path: 'produits', component: ProduitComponent},
  {path: 'cateorie', component: CategorieComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'candidats', component: CandidatComponent},
  {path: 'reseau', component: ReseauComponent},
  {path: 'missions', component: MissionListComponent},
  {path: 'equipes', component: TeamComponent},
  {path: 'candidatures', component: CandidatComponent},
  {path: 'home', component: Home, canActivate: [AuthGuard]},
  {path: 'profile', component: Profile, canActivate: [AuthGuard] },
  {path: 'profile/edit', component: ProfileEdit, canActivate: [AuthGuard] },
  {path: 'avis', component: Avis },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];