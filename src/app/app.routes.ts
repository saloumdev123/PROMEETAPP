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
import { Component } from '@angular/core';
import { PaiementComponent } from './components/paiement/paiement.component ';
export const routes: Routes = [
  
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {path:  'dashboard', component: Dashboard},
  { path: 'offres', component: OffreList },
  { path: 'mes-offres', component: OffreList },
  { path: 'offres/create', component: OffreForm },
  { path: 'offres/edit/:id', component: OffreForm },
  { path: 'offres/:id', component: OfferDetail },
  { path: 'reservations', component: ReservationComponent },
  {path: 'reservations/:id', component: ReservationComponent},
   { path: 'reset-password', component: ResetPasswordComponent },
   {path: 'paiement', component: PaiementComponent} ,
    {path: 'home', component: Home},
  { path: 'avis', component: Avis },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];