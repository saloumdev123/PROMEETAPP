import { Component, OnInit } from '@angular/core';
import { AvisService } from '../../services/avis.service';
import { CommonModule } from '@angular/common';

import { AvisModel } from '../../models/avis.model';

@Component({
  selector: 'app-avis',
  imports: [CommonModule],
  templateUrl: './avis.html',
  styleUrls: ['./avis.css']
})
export class Avis implements OnInit {
   avis: AvisModel[] = []; 
  isLoading = false;
  id: any;

  constructor(
    private avisService: AvisService
  ) {}

  ngOnInit(): void {
    this.loadAvis();
  }

 loadAvis(): void {
  this.isLoading = true;
  this.avisService.getAll().subscribe({
    next: (data: any[]) => {
      this.avis = data.map(item => ({
        id: item.id,
        contenu: item.contenu,
        note: item.note,
        utilisateurId: item.utilisateurId,
        offreId: item.offreId,
        utilisateur: item.utilisateur,
        offre: item.offre,
        createdAt: item.createdAt
      }));
      this.isLoading = false;
    },
    error: () => this.isLoading = false
  });
}


  getStars(note: number): number[] {
    return Array(Math.floor(note)).fill(0);
  }

  getEmptyStars(note: number): number[] {
    return Array(5 - Math.floor(note)).fill(0);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR');
  }

}
