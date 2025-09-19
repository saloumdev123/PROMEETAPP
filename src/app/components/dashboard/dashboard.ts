import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { OffreService } from '../../services/offre.service';
import { ReservationService } from '../../services/reservation.service';
import { AvisService } from '../../services/avis.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']

})
export class Dashboard implements OnInit{
 currentUser: User | null = null;
isSidebarOpen: boolean = false;
  offresCount = 0;
  reservationsCount = 0;
  avisCount = 0;


  selectedSection: string | null = null;
   toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  commonCards = [
    {
      title: 'Avis et notes',
      text: 'Consultez les avis',
      link: '/avis',
      icon: 'bi bi-star'
    },
    {
      title: 'Nos services',
      text: 'Découvrez ce que nous proposons',
      link: '/offres',
      icon: 'bi bi-info-circle'
    },
    {
      title: 'Nos produits',
      text: 'Découvrez tous nos produits disponibles',
      link: '/produits',
      icon: 'bi bi-box-seam'
    }
  ];

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private offreService: OffreService,
    private reservationService: ReservationService,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    // S'abonner à currentUser$ et stocker dans currentUser
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;

      if (!user) return;

      if (user.userRole === 'PARTICULIER') {
        this.reservationService.getByClient(user.id!).subscribe(res => {
          this.reservationsCount = res.length;
        });
      }

      if (user.userRole === 'PROFESSIONNEL') {
        this.offreService.getByPrestataire(user.id!).subscribe(res => {
          this.offresCount = res.length;
        });
      }

      this.avisService.getAll().subscribe(res => {
        this.avisCount = res.length;
      });
    });
  }
  get isAdmin() {
  return this.currentUser?.userRole === 'ADMIN';
}

get isPrestataire() {
  return this.currentUser?.userRole === 'PROFESSIONNEL';
}
get isClient(): boolean {
  return this.currentUser?.userRole === 'PARTICULIER';
}


  selectSection(section: string) {
    this.selectedSection = section;
  }

  fibemCards = [
  { title: 'Présentation', text: 'Informations sur l’entreprise', link: '/fibem/presentation', icon: 'bi bi-info-circle' },
  { title: 'Équipe', text: 'Rencontrez l’équipe Fibem', link: '/fibem/equipe', icon: 'bi bi-people' },
  { title: 'Historique', text: 'Découvrez l’historique de l’entreprise', link: '/fibem/historique', icon: 'bi bi-clock-history' },
  { title: 'Témoignages', text: 'Avis et retours clients', link: '/fibem/temoignages', icon: 'bi bi-chat-dots' }
];
}
