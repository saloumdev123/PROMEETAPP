// reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';

// On importe explicitement le modèle
import { Reservation } from '../../models/reservation.model';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class ReservationComponent implements OnInit {
  
   reservations: Reservation[] = [];
  isLoading = false;

  constructor(
    private reservationService: ReservationService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.reservationService.getByClient(currentUser.id!).subscribe({
        next: (reservations) => {
          this.reservations = reservations;
          this.isLoading = false;
        },
        error: () => this.isLoading = false
      });
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR');
  }

  getStatusClass(statut: string): string {
    switch (statut) {
      case 'CONFIRMEE': return 'bg-success';
      case 'EN_ATTENTE': return 'bg-warning';
      case 'ANNULEE': return 'bg-danger';
      case 'TERMINEE': return 'bg-secondary';
      default: return 'bg-primary';
    }
  }

  cancelReservation(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      this.loadReservations();
    }
  }
}
