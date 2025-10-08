import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Developpeur } from '../../models/developpeur';
import { Projet } from '../../models/projet';
import { DeveloppeurService } from '../../services/developpeurService';
import { ProjetService } from '../../services/projetService';

@Component({
  selector: 'app-gestion-developpeur',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './gestion-developpeur.html',
  styleUrls: ['./gestion-developpeur.css']
})
export class GestionDeveloppeur {
developpeurs: Developpeur[] = [];
  projets: Projet[] = [];
  devForm!: FormGroup;

  editing = false;
  selectedId?: number;
  searchTerm = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private devService: DeveloppeurService,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDeveloppeurs();
    this.loadProjets();

    // 🎯 Quand un projet est sélectionné → on remplit automatiquement les infos du dev associé
    this.devForm.get('projetId')?.valueChanges.subscribe((projetId) => {
      if (projetId) {
        this.loadDeveloppeurParProjet(projetId);
      } else {
        // 🔹 Réinitialiser les champs si aucun projet sélectionné
        this.devForm.patchValue({
          nom: '',
          email: ''
        });
      }
    });
  }

  // ✅ Initialisation du formulaire
  initForm(): void {
    this.devForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.email]],
      specialite: [''],
      experience: [0, [Validators.min(0)]],
      projetId: [null]
    });
  }

  // 🔹 Charger tous les développeurs
  loadDeveloppeurs(): void {
    this.devService.getAll().subscribe({
      next: (data) => (this.developpeurs = data),
      error: () => (this.errorMessage = 'Erreur lors du chargement des développeurs.')
    });
  }

  // 🔹 Charger les projets
  loadProjets(): void {
    this.projetService.getAll().subscribe({
      next: (data) => (this.projets = data),
      error: () => (this.errorMessage = 'Erreur de chargement des projets.')
    });
  }

 // 🧠 Charger le développeur lié à un projet
loadDeveloppeurParProjet(projetId: number): void {
  this.projetService.getById(projetId).subscribe({
    next: (projet: Projet) => {
      if (projet) {
        this.devForm.patchValue({
          nom: projet.developpeurNom || '',
          email: projet.email || ''
        });
      } else {
        this.devForm.patchValue({
          nom: '',
          prenom: '',
          email: ''
        });
      }
    },
    error: () => {
      this.errorMessage = '❌ Impossible de charger le développeur pour ce projet.';
    }
  });
}


  // 🔹 Soumission du formulaire
  submitForm(): void {
    if (this.devForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const devData: Developpeur = this.devForm.value;

    if (this.editing && this.selectedId) {
      this.devService.update(this.selectedId, devData).subscribe({
        next: () => {
          this.successMessage = '✅ Développeur mis à jour avec succès.';
          this.resetForm();
          this.loadDeveloppeurs();
        },
        error: () => (this.errorMessage = 'Erreur lors de la mise à jour.')
      });
    } else {
      this.devService.create(devData).subscribe({
        next: () => {
          this.successMessage = '✅ Développeur ajouté avec succès.';
          this.resetForm();
          this.loadDeveloppeurs();
        },
        error: () => (this.errorMessage = 'Erreur lors de l’ajout du développeur.')
      });
    }
  }

  edit(dev: Developpeur): void {
    this.editing = true;
    this.selectedId = dev.id;
    this.devForm.patchValue(dev);
  }

  delete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce développeur ?')) {
      this.devService.delete(id).subscribe({
        next: () => this.loadDeveloppeurs(),
        error: () => (this.errorMessage = 'Erreur lors de la suppression.')
      });
    }
  }

  resetForm(): void {
    this.devForm.reset();
    this.editing = false;
    this.selectedId = undefined;
    this.successMessage = '';
    this.errorMessage = '';
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.loadDeveloppeurs();
      return;
    }
    this.devService.searchByNom(this.searchTerm).subscribe({
      next: (data) => (this.developpeurs = data),
      error: () => (this.errorMessage = 'Erreur lors de la recherche.')
    });
  }
}
