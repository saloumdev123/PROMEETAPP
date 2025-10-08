import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Developpeur } from '../../models/developpeur';
import { DeveloppeurService } from '../../services/developpeurService';

@Component({
  selector: 'app-developpeur-dashboard',
  standalone: true, // ⚡ recommandé avec Angular 15+
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './developpeur-dashboard.html',
  styleUrl: './developpeur-dashboard.css'
})
export class DeveloppeurDashboard {
developpeurs: Developpeur[] = [];
  developpeurForm!: FormGroup;
  editing = false;
  selectedId?: number;
  searchTerm = '';

  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private devService: DeveloppeurService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDeveloppeurs();
  }

  initForm(): void {
    this.developpeurForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      specialite: [''],
      experience: [0, [Validators.min(0)]],
      dateEmbauche: ['']
    });
  }

  // 🔹 Charger tous les développeurs
  loadDeveloppeurs(): void {
    this.devService.getAll().subscribe({
      next: (data) => this.developpeurs = data,
      error: () => this.errorMessage = 'Erreur de chargement des développeurs.'
    });
  }

  // 🔹 Soumettre le formulaire
  submitForm(): void {
    if (this.developpeurForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement tous les champs requis.';
      return;
    }

    const devData: Developpeur = this.developpeurForm.value;

    if (this.editing && this.selectedId) {
      this.devService.update(this.selectedId, devData).subscribe({
        next: () => {
          this.successMessage = '✅ Développeur modifié avec succès !';
          this.resetForm();
          this.loadDeveloppeurs();
        },
        error: () => this.errorMessage = '❌ Erreur lors de la mise à jour.'
      });
    } else {
      this.devService.create(devData).subscribe({
        next: () => {
          this.successMessage = '✅ Développeur ajouté avec succès !';
          this.resetForm();
          this.loadDeveloppeurs();
        },
        error: () => this.errorMessage = '❌ Erreur lors de l’ajout.'
      });
    }
  }

  // 🔹 Sélectionner pour modification
  edit(dev: Developpeur): void {
    this.editing = true;
    this.selectedId = dev.id;
    this.developpeurForm.patchValue(dev);
  }

  // 🔹 Supprimer un développeur
  delete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce développeur ?')) {
      this.devService.delete(id).subscribe({
        next: () => this.loadDeveloppeurs(),
        error: () => this.errorMessage = 'Erreur lors de la suppression.'
      });
    }
  }

  // 🔹 Réinitialiser le formulaire
  resetForm(): void {
    this.editing = false;
    this.selectedId = undefined;
    this.developpeurForm.reset();
  }

  // 🔹 Rechercher un développeur
  search(): void {
    if (!this.searchTerm.trim()) {
      this.loadDeveloppeurs();
      return;
    }
    this.devService.searchByName(this.searchTerm).subscribe({
      next: (data) => this.developpeurs = data,
      error: () => this.errorMessage = 'Erreur de recherche.'
    });
  }
}
