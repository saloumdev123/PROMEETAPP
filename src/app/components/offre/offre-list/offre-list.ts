import { Component, OnInit } from '@angular/core';
import { Offre } from '../../../models/offre.model';
import { OffreService } from '../../../services/offre.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserRole } from '../../../enums/userRole';
import { Role } from '../../../enums/role';

@Component({
  selector: 'app-offre-list',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule ],
  templateUrl: './offre-list.html',
  styleUrls: ['./offre-list.css']
})
export class OffreList implements OnInit {
  offres: Offre[] = [];
  filteredOffres: Offre[] = [];
   Role = Role;
  searchTerm = '';
  priceFilter = '';
  isLoading = false;

  constructor(
    private offreService: OffreService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOffres();
  }

  loadOffres(): void {
    this.isLoading = true;
    this.offreService.getAll().subscribe({
      next: (offres) => {
        this.offres = offres;
        this.filteredOffres = offres;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  filterOffres(): void {
    this.filteredOffres = this.offres.filter(offre => {
      const matchesSearch = offre.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           offre.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      let matchesPrice = true;
      if (this.priceFilter) {
        if (this.priceFilter === '0-50') {
          matchesPrice = offre.prix <= 50;
        } else if (this.priceFilter === '50-100') {
          matchesPrice = offre.prix > 50 && offre.prix <= 100;
        } else if (this.priceFilter === '100+') {
          matchesPrice = offre.prix > 100;
        }
      }
      
      return matchesSearch && matchesPrice;
    });
  }

  reserver(offre: Offre): void {
    // Redirection vers le composant de réservation
  }
}