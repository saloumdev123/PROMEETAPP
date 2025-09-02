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
 currentUser: User | null = null;

  offresCount = 0;
  reservationsCount = 0;
  avisCount = 0;

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

      if (user.role === 'CLIENT') {
        this.reservationService.getByClient(user.id!).subscribe(res => {
          this.reservationsCount = res.length;
        });
      }

      if (user.role === 'PRESTATAIRE') {
        this.offreService.getByPrestataire(user.id!).subscribe(res => {
          this.offresCount = res.length;
        });
      }

      this.avisService.getAll().subscribe(res => {
        this.avisCount = res.length;
      });
    });
  }
}
