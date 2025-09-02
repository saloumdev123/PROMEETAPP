import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { OffreService } from '../../services/offre.service';
import { ReservationService } from '../../services/reservation.service';
import { AvisService } from '../../services/avis.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']

})
export class Dashboard implements OnInit{
 currentUser$: Observable<User | null>;
  offresCount = 0;
  reservationsCount = 0;
  avisCount = 0;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private offreService: OffreService,
    private reservationService: ReservationService,
    private avisService: AvisService
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Récupérer le user actuel et charger les stats
    this.currentUser$.subscribe(user => {
      if (!user) return;

      if (user.role === 'CLIENT') {
        // Nombre de réservations
        this.reservationService.getByClient(user.id!).subscribe(res => {
          this.reservationsCount = res.length;
        });
      }

      if (user.role === 'PRESTATAIRE') {
        // Nombre d’offres
        this.offreService.getByPrestataire(user.id!).subscribe(res => {
          this.offresCount = res.length;
        });
      }

      // Avis visible pour tous
      this.avisService.getAll().subscribe(res => {
        this.avisCount = res.length;
      });
    });
  }
}
