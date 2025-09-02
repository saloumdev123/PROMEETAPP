import { Component, OnInit } from '@angular/core';
import { Offre } from '../../../models/offre.model';
import { OffreService } from '../../../services/offre.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-offre-form',
  imports: [CommonModule, RouterModule, FormsModule ],
  templateUrl: './offre-form.html',
  styleUrl: './offre-form.css'
})
export class OffreForm implements OnInit {
  offre: Partial<Offre> = {
    titre: '',
    description: '',
    prix: 0,
    prestataireId: 0
  };
  isEdit = false;
  isLoading = false;
  private offreId?: number;

  constructor(
    private offreService: OffreService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.offre.prestataireId = currentUser.id!;
    }

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.offreId = +id;
      this.loadOffre();
    }
  }

  loadOffre(): void {
    if (!this.offreId) return;
    
    this.isLoading = true;
    this.offreService.getById(this.offreId).subscribe({
      next: (offre) => {
        this.offre = offre;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    const operation = this.isEdit 
      ? this.offreService.update(this.offre as Offre)
      : this.offreService.create(this.offre);

    operation.subscribe({
      next: () => {
  
        this.router.navigate(['/mes-offres']);
        this.isLoading = false;
      },
      error: (error) => {
    
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/mes-offres']);
  }

}
