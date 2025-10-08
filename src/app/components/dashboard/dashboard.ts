import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { OffreService } from '../../services/offre.service';
import { ReservationService } from '../../services/reservation.service';
import { AvisService } from '../../services/avis.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CandidatService } from '../../services/candidat.service';
import { Candidat } from '../../models/candidat';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dashboard',
  standalone: true, // ⚡ recommandé avec Angular 15+
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  
  currentUser: User | null = null;
  isSidebarOpen = false;

  offresCount = 0;
  reservationsCount = 0;
  avisCount = 0;

  candidats: Candidat[] = [];
  clients: Client[] = [];
  selectedSection: string | null = null;

  commonCards = [
    { title: 'Avis et notes', text: 'Consultez les avis', link: '/avis', icon: 'bi bi-star' },
    { title: 'Nos services', text: 'Découvrez nos offres', link: '/offres', icon: 'bi bi-info-circle' },
    { title: 'Nos produits', text: 'Découvrez nos produits', link: '/produits', icon: 'bi bi-box-seam' }
  ];

  fibemCards = [
    { title: 'Présentation', text: 'Informations sur l’entreprise', link: '/fibem/presentation', icon: 'bi bi-info-circle' },
    { title: 'Équipe', text: 'Rencontrez l’équipe', link: '/fibem/equipe', icon: 'bi bi-people' },
    { title: 'Historique', text: 'Découvrez notre histoire', link: '/fibem/historique', icon: 'bi bi-clock-history' },
    { title: 'Témoignages', text: 'Avis clients', link: '/fibem/temoignages', icon: 'bi bi-chat-dots' }
  ];

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private offreService: OffreService,
    private reservationService: ReservationService,
    private avisService: AvisService,
    private candidatService: CandidatService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) return;

      // Récupération des statistiques selon le rôle
      if (user.userRole === 'PARTICULIER') {
        this.reservationService.getByClient(user.id!).subscribe(res => {
          this.reservationsCount = res.length;
        });
      }

      this.avisService.getAll().subscribe(res => {
        this.avisCount = res.length;
      });

      // Chargement spécifique selon les rôles
      if (user.userRole === 'ADMIN') {
        this.loadCandidats();
        this.loadClients();
      }

      if (user.userRole === 'DEVELOPPEUR' || user.userRole === 'CHEF_DE_PROJET') {
        this.loadClients();
      }
    });
  }

  // ✅ Charger les candidats (réservé à l’admin)
  private loadCandidats(): void {
    this.candidatService.getCandidats(0, 10).subscribe({
      next: (res: any) => {
        this.candidats = res.content;
      },
      error: (err: any) => console.error('Erreur lors du chargement des candidats :', err)
    });
  }

  // ✅ Charger les clients (ADMIN, DEVELOPPEUR, CHEF DE PROJET)
  private loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (res: Client[]) => {
        this.clients = res;
      },
      error: (err: any) => console.error('Erreur lors du chargement des clients :', err)
    });
  }

  // ✅ Vérifications de rôles
  get isAdmin(): boolean {
    return this.currentUser?.userRole === 'ADMIN';
  }

  get isDeveloppeur(): boolean {
    return this.currentUser?.userRole === 'DEVELOPPEUR';
  }

  get isChefProjet(): boolean {
    return this.currentUser?.userRole === 'CHEF_DE_PROJET';
  }

  get canManageClients(): boolean {
    return this.isAdmin || this.isDeveloppeur || this.isChefProjet;
  }

  get isClient(): boolean {
    return this.currentUser?.userRole === 'PARTICULIER';
  }

  get isCandidat(): boolean {
    return this.currentUser?.userRole === 'CANDIDAT';
  }

  // ✅ Sélection d’une section du tableau de bord
  selectSection(section: string) {
    this.selectedSection = section;
  }

  // ✅ Sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
