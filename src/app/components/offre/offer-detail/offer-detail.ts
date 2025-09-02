import { Component } from '@angular/core';
import { Offre } from '../../../models/offre.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OffreService } from '../../../services/offre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role } from '../../../enums/role';
import { AvisService } from '../../../services/avis.service';
import { AvisModel } from '../../../models/avis.model';

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

  avisList: AvisModel[] = [];
  newAvis: { note: number; contenu: string } = { note: 5, contenu: '' }; 

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
      error: (err) => {
        this.errorMessage = 'Impossible de charger l’offre.';
        this.isLoading = false;
      }
    });
  }

 loadAvis(offreId: number): void {
  this.avisService.getByOffre(offreId).subscribe({
    next: (data: any[]) => {
      // Mapper chaque objet reçu vers AvisModel
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


  submitAvis(): void {
    if (!this.authService.isAuthenticated() || !this.offre) return;

    const avisToSend: AvisModel = {
      note: this.newAvis.note,
      contenu: this.newAvis.contenu,
      offreId: this.offre.id!,
      utilisateurId: this.authService.currentUser?.id!,
      createdAt: new Date()
    };

    this.avisService.create(avisToSend).subscribe({
      next: () => {
        // Réinitialiser le formulaire
        this.newAvis = { note: 5, contenu: '' };
        // Recharger les avis
        this.loadAvis(this.offre!.id!);
      },
      error: (err) => console.error('Erreur lors de l’ajout de l’avis', err)
    });
  }

  reserver(offreId: number | undefined, montant: number | undefined) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else if (offreId && montant !== undefined) {
      this.router.navigate(['/paiement'], { queryParams: { id: offreId, montant } });
    }
  }


}