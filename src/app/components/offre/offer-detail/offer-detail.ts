import { Component } from '@angular/core';
import { Offre } from '../../../models/offre.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OffreService } from '../../../services/offre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../enums/role';

@Component({
  selector: 'app-offer-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './offer-detail.html',
  styleUrl: './offer-detail.css'
})
export class OfferDetail {

  offre: Offre | null = null;
  isLoading = false;
  errorMessage = '';
  Role = Role;

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    public authService: AuthService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.loadOffre(id);
    }
  }

  loadOffre(id: number): void {
    this.isLoading = true;
    this.offreService.getById(id).subscribe({
      next: (offre) => {
        this.offre = offre;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger l’offre.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

    goToPayment(offreId: number | undefined, montant: number) {
    if (offreId) {
      // Redirection vers le composant de paiement avec paramètres
      this.router.navigate(['/payment'], { queryParams: { id: offreId, montant } });
    }
  }

reserver(offreId: number | undefined, montant: number | undefined) {
  if (!this.authService.isAuthenticated()) {
    // Redirection vers le register si pas connecté
    this.router.navigate(['/register']);
  } else if (offreId && montant !== undefined) {
    // Redirection vers le paiement avec queryParams
    this.router.navigate(['/paiement'], { queryParams: { id: offreId, montant } });
  } else {
    console.error('ID ou montant de l’offre manquant');
  }
}


}