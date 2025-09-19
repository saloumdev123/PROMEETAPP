import { Component } from '@angular/core';
import { Offre } from '../../../models/offre.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OffreService } from '../../../services/offre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AvisService } from '../../../services/avis.service';
import { AvisModel } from '../../../models/avis.model';

@Component({
  selector: 'app-offer-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './offer-detail.html',
  styleUrls: ['./offer-detail.css']
})
export class OfferDetail {

 offre: Offre | null = null;
  isLoading = false;
  errorMessage = '';

  avisList: AvisModel[] = [];
  userNote: number = 0; // note que l'utilisateur clique

  constructor(
    private route: ActivatedRoute,
    private offreService: OffreService,
    public authService: AuthService,
    private router: Router,
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.loadOffre(id);
      this.loadAvis(id);
    }
  }

  loadOffre(id: number): void {
    this.isLoading = true;
    this.offreService.getById(id).subscribe({
      next: (offre) => {
        this.offre = offre;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger l’offre.';
        this.isLoading = false;
      }
    });
  }

  loadAvis(offreId: number): void {
    this.avisService.getByOffre(offreId).subscribe({
      next: (data: any[]) => {
        this.avisList = data.map(item => ({
          id: item.id,
          contenu: item.contenu,
          note: item.note,
          utilisateurId: item.utilisateurId,
          offreId: item.offreId,
          utilisateur: item.utilisateur,
          offre: item.offre,
          createdAt: item.createdAt ? new Date(item.createdAt) : undefined
        }));
      },
      error: (err) => console.error(err)
    });
  }

  averageNote(): number {
    if (this.avisList.length === 0) return 0;
    const total = this.avisList.reduce((sum, avis) => sum + avis.note, 0);
    return Math.round(total / this.avisList.length);
  }

  setNote(star: number): void {
    this.userNote = star;
    console.log(`Vous avez donné une note de ${this.userNote}`);
  }

  reserver(offreId: number | undefined, montant: number | undefined) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else if (offreId && montant !== undefined) {
      this.router.navigate(['/paiement'], { queryParams: { id: offreId, montant } });
    }
  }
}