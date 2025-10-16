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
import { CategorieComponent } from './components/categorie-component/categorie-component';
import { AboutComponent } from './components/about-component/about-component';
import { ContactComponent } from './components/contact/contactComponent';
import { MissionListComponent } from './components/mission-list-component/mission-list-component';
import { ReseauComponent } from './components/reseau-component/reseau-component';
import { TeamComponent } from './components/team-component/team-component';
import { Publication } from './components/publication/publication';
import { Serrureri } from './components/serrureri/serrureri';
import { PrestataireComponent } from './components/prestataire-component/prestataire-component';
import { InscriptionPrestataireComponent } from './components/inscription-prestataire-component/inscription-prestataire-component';
import { B2bComponent } from './b2b-component/b2b-component';
import { RdvComponent } from './components/rdv-component/rdv-component';
import { PrestataireProcesseComponent } from './components/prestataire-processe-component/prestataire-processe-component';
import { Electricity } from './components/electricity/electricity';
import { Maconnerie } from './components/maconnerie/maconnerie';
import { Maconnerieprocess } from './components/maconnerieprocess/maconnerieprocess';
import { Peinture } from './components/peinture/peinture';
import { Peintureprocess } from './components/peintureprocess/peintureprocess';
import { Plomberie } from './components/plomberie/plomberie';
import { Plomberieprocess } from './components/plomberieprocess/plomberieprocess';
import { Menuiserieprocess } from './menuiserieprocess/menuiserieprocess';
import { Menuiserie } from './menuiserie/menuiserie';
import { Jardinage } from './jardinage/jardinage';
import { Jardinageprocess } from './jardinageprocess/jardinageprocess';
import { Cuisineprocess } from './cuisineprocess/cuisineprocess';
import { Carrlage } from './components/carrlage/carrlage';
import { Carrelageprocess } from './components/carrelageprocess/carrelageprocess';
import { CandidatComponent } from './components/candidat/candidat.component';
import { CommandePrestationComponent } from './components/commande-prestation-component/commande-prestation-component';
import { PanierPrestationComponent } from './components/panier-prestation-component/panier-prestation-component';
import { ArtisanListComponent } from './components/artisan-list-component/artisan-list-component';
import { Panier } from './components/panier/panier';
import { Electricityprocess } from './components/electricityprocess/electricityprocess';
import { roleGuard } from './components/guards/role-guard';
import { Role } from './enums/role';
import { CandidatProfilComponent } from './components/candidat-profil-component/candidat-profil-component';
import { DevisComponent } from './devise-component/devise-component';
import { LigneDevisComponent } from './ligne-devise-component/ligne-devise-component';
import { FournitureComponent } from './fourniture/fourniture';
import { FactureComponent } from './components/facture-component/facture-component';
import { DeveloppeurDashboard } from './components/developpeur-dashboard/developpeur-dashboard';
import { GestionClients } from './components/gestion-clients/gestion-clients';
import { GestionDeveloppeur } from './components/gestion-developpeur/gestion-developpeur';
import { ProjetComponent } from './components/projet-component/projet-component';
import { ChefDeProjetComponent } from './components/chef-de-projet-component/chef-de-projet-component';
import { AvoireCoponent } from './components/avoire-coponent/avoire-coponent';
import { ClientManagementComponent } from './components/client-management-component/client-management-component';
import { DocumenaireComponent } from './components/documenaire-component/documenaire-component';
import { EntrepriseComponent } from './components/entreprise-component/entreprise-component';
import { CloudComponent } from './cloud-component/cloud-component';
import { CloudOffers } from './cloud-offers/cloud-offers';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: Dashboard },
  {path:'candidats', component: CandidatComponent},
  { path: 'offres', component: OffreList },
  { path: 'mes-offres', component: OffreList },
  { path: 'offres/create', component: OffreForm },
  { path: 'offres/edit/:id', component: OffreForm },
  { path: 'offres/:id', component: OfferDetail },
  { path: 'admin/users', component: Utilisateurs, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationComponent },
  { path: 'reservations/:id', component: ReservationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'commande-prestation', component: CommandePrestationComponent },
  { path: 'panier-prestation', component: PanierPrestationComponent },
  { path: 'paiement', component: PaiementComponent },
  { path: 'produits', component: ProduitComponent },
  { path: 'cateorie', component: CategorieComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'panier-detail', component: Panier },
  { path: 'reseau', component: ReseauComponent },
  { path: 'missions', component: MissionListComponent },
  { path: 'equipes', component: TeamComponent },
  { path: 'candidatures', component: CandidatComponent },
  { path: 'publications', component: Publication },
  { path: 'serrureri', component: Serrureri },
  { path: 'electricity', component: Electricity },
  { path: 'electricity-process', component: Electricityprocess },
  { path: 'maconnerie', component: Maconnerie },
  { path: 'maconnerie-process', component: Maconnerieprocess },
  { path: 'peinture', component: Peinture },
  { path: 'peinture-process', component: Peintureprocess },
  { path: 'plomberie', component: Plomberie },
  { path: 'plomberie-process', component: Plomberieprocess },
  { path: 'menuiserie', component: Menuiserie },
  { path: 'menuiserie-process', component: Menuiserieprocess },
  { path: 'carrelage', component: Carrlage },
  { path: 'carrelage-process', component: Carrelageprocess },
  { path: 'jardinage', component: Jardinage },
  { path: 'jardinage-process', component: Jardinageprocess },
  { path: 'cuisine-process', component: Cuisineprocess },
  { path: 'prestataire', component: PrestataireComponent },
  { path: 'inscription-prestataire', component: InscriptionPrestataireComponent },
  { path: 'b2b', component: B2bComponent },
  { path: 'rendez-vous', component: RdvComponent },
  { path: 'publier-demande-process', component: PrestataireProcesseComponent },
  { path: 'home', component: Home},
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEdit, canActivate: [AuthGuard] },
  { path: 'avis', component: Avis },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
 {path: 'devise', component: DevisComponent},
 {path: 'ligne-devise', component: LigneDevisComponent},
 {path: 'fournitures', component: FournitureComponent},
 {path: 'factures', component: FactureComponent},
 {path: 'avoirs', component: AvoireCoponent},
 {path: 'gestion-des-entreprises', component: EntrepriseComponent},
{path: 'gestionnaire-documentaire', component: DocumenaireComponent  },
{ path: 'dashboard-admin', component: Dashboard, canActivate: [roleGuard], data: { roles: [Role.ADMIN] } },

{ path: 'dashboard-partenaires', component: ArtisanListComponent, canActivate: [roleGuard], data: { roles: [Role.PARTENAIRE, Role.ADMIN] } },

{ path: 'candidats', component: CandidatProfilComponent, canActivate: [roleGuard], data: { roles: [Role.CANDIDAT, Role.ADMIN] } },
{ path: 'developpeur-dashboard', component: DeveloppeurDashboard, canActivate: [roleGuard], data: { roles: [Role.DEVELOPPEUR, Role.ADMIN] } },
{path: 'gestion-clients', component: GestionClients},
{path: 'gestion-developpeur', component: GestionDeveloppeur},
{path:'gestion-projets',component:  ProjetComponent},
{path: 'chef-de-projet-dashboard', component: ChefDeProjetComponent, canActivate: [roleGuard], data: { roles: [Role.CHEF_DE_PROJET, Role.ADMIN] } },

  //{ path: 'candidat', component: CandidatDashboardComponent }, // ton menu avec cartes
 // { path: 'candidat/profil', component: CandidatProfilComponent} // gestion du profil
{ path: 'mon-profil', component: CandidatProfilComponent },
 // { path: 'candidat/entreprises', component: EntreprisesComponent },
 // { path: 'candidat/agences', component: AgencesComponent },
  //{ path: 'candidat/conseils', component: ConseilsComponent },
  {path: 'gestion-client', component: ClientManagementComponent },
  {path: 'gestionnaire-documentaire', component: DocumenaireComponent  },// redirection pour toute autre route non définie

{path: 'genereation-de-devis', component: DevisComponent},

{path: 'hebergeur-cloud', component: CloudComponent },
{path: 'offres-cloud', component: CloudOffers },
];