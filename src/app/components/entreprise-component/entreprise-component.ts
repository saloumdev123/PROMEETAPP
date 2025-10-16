import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Entreprise } from '../../models/entreprise';
import { EntrepriseService } from '../../services/entreprise.service';

@Component({
  selector: 'app-entreprise-component',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './entreprise-component.html',
  styleUrl: './entreprise-component.css'
})
export class EntrepriseComponent {
  entreprises: Entreprise[] = [];
  entrepriseForm!: FormGroup;
  editMode = false;
  selectedId: number | null = null;

  successMessage = '';
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEntreprises();
  }

  /** 🧾 Initialise le formulaire */
  initForm(): void {
    this.entrepriseForm = this.fb.group({
      nom: ['', Validators.required],
      portable: [''],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      siret: ['', Validators.required],
      codeApe: ['', Validators.required],
      numeroTva: ['', Validators.required],
      dirigeant: ['', Validators.required],
      indice: [''],
      numeroLot: [''],
      lieu: [''],
      departement: [''],
      reference: [''],
      affaire: ['']
    });
  }

  /** 🔄 Charger la liste des entreprises */
  loadEntreprises(): void {
    this.entrepriseService.getAll().subscribe({
      next: (data) => (this.entreprises = data),
      error: () => (this.errorMessage = '❌ Erreur lors du chargement des entreprises.')
    });
  }

  /** 💾 Créer ou modifier une entreprise */
  saveEntreprise(): void {
    if (this.entrepriseForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const entrepriseData = this.entrepriseForm.value as Entreprise;
    this.loading = true;

    if (this.editMode && this.selectedId) {
      this.entrepriseService.update(this.selectedId, entrepriseData).subscribe({
        next: () => {
          this.successMessage = '✅ Entreprise mise à jour avec succès !';
          this.resetForm();
          this.loadEntreprises();
        },
        error: () => (this.errorMessage = '❌ Erreur lors de la mise à jour.'),
        complete: () => (this.loading = false)
      });
    } else {
      this.entrepriseService.create(entrepriseData).subscribe({
        next: () => {
          this.successMessage = '✅ Entreprise ajoutée avec succès !';
          this.resetForm();
          this.loadEntreprises();
        },
        error: () => (this.errorMessage = '❌ Erreur lors de la création.'),
        complete: () => (this.loading = false)
      });
    }
  }

  /** ✏️ Modifier une entreprise */
  editEntreprise(entreprise: Entreprise): void {
    this.entrepriseForm.patchValue(entreprise);
    this.selectedId = entreprise.id!;
    this.editMode = true;
  }

  /** 🗑️ Supprimer une entreprise */
  deleteEntreprise(id?: number): void {
  if (!id) {
    this.errorMessage = '❌ ID entreprise non valide.';
    console.error('Erreur : id undefined lors de la suppression.');
    return;
  }

  if (confirm('Supprimer cette entreprise ?')) {
    this.entrepriseService.delete(id).subscribe({
      next: () => {
        this.successMessage = '✅ Entreprise supprimée avec succès !';
        this.loadEntreprises();
      },
      error: () => (this.errorMessage = '❌ Erreur lors de la suppression.')
    });
  }
}

  /** 🔁 Réinitialiser le formulaire */
  resetForm(): void {
    this.entrepriseForm.reset();
    this.editMode = false;
    this.selectedId = null;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
