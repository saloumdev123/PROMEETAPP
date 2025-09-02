import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PaiementService } from '../../services/paiement.service';
import { Paiement } from '../../models/paiement.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-paiement',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './paiement.html',
  styleUrl: './paiement.css'
})
export class PaiementComponent  {
 reservationId: number | undefined;
  montant: number | undefined;
  modePaiement: string = 'PAYDUNYA'; // valeur par défaut
  moyensPaiement = ['PAYDUNYA', 'CARTE_BANCAIRE', 'PAYPAL']; // ajouter d'autres moyens si nécessaire
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private paiementService: PaiementService
  ) {
    this.route.queryParams.subscribe(params => {
      this.reservationId = params['id'];
      this.montant = params['montant'];
    });
  }

  payer() {
    if (!this.reservationId || !this.montant) {
      alert('Paramètres manquants pour le paiement.');
      return;
    }

    this.loading = true;

    const paiement: Paiement = {
      reservationId: this.reservationId,
      montant: this.montant,
      datePaiement: new Date().toISOString(),
      modePaiement: this.modePaiement,
      referenceTransaction: 'REF' + Date.now(),
      statut: 'EN_ATTENTE',
      id: undefined
    };

    this.paiementService.create(paiement).subscribe({
      next: () => {
        this.loading = false;
        alert('Paiement initié !');
      },
      error: (err) => {
        this.loading = false;
        alert('Erreur lors du paiement : ' + err.message);
      }
    });
  }
}
