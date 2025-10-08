import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Developpeur } from '../../models/developpeur';
import { Projet } from '../../models/projet';
import { DeveloppeurService } from '../../services/developpeurService';
import { ProjetService } from '../../services/projetService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projet-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './projet-component.html',
  styleUrl: './projet-component.css'
})
export class ProjetComponent {
  projets: Projet[] = [];
  developpeurs: Developpeur[] = [];
  projetForm!: FormGroup;
  editing = false;
  selectedId?: number;
  searchTerm = '';

  successMessage = '';
  errorMessage = '';
  developpeurNom: string = '';
developpeurNoms: string[] = [];

ajouterDeveloppeur(): void {
  const nom = this.developpeurNom.trim();
  if (nom) {
    this.developpeurNoms.push(nom);
    this.developpeurNom = '';
  }
}

supprimerDeveloppeur(index: number): void {
  this.developpeurNoms.splice(index, 1);
}


  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private devService: DeveloppeurService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProjets();
  }

initForm(): void {
  this.projetForm = this.fb.group({
    nom: ['', Validators.required],
    description: [''],
    client: [''],
    dateDebut: [''],
    dateFin: [''],
    statut: ['EN_COURS'],
    budget: [0, [Validators.min(0)]],
    developpeurNom: [''] ,
    telephone:[''],
    email:['']
  });
}

listeVisible: boolean = true;

toggleListe(): void {
  this.listeVisible = !this.listeVisible;
}


  // 🔹 Charger tous les projets
  loadProjets(): void {
    this.projetService.getAll().subscribe({
      next: (data) => this.projets = data,
      error: () => this.errorMessage = 'Erreur de chargement des projets.'
    });
  }



submitForm(): void {
  if (this.projetForm.invalid) {
    this.errorMessage = 'Veuillez remplir les champs requis.';
    return;
  }

  const formValue = this.projetForm.value;

  const projetData: Projet = {
  ...formValue,
  developpeurNom: formValue.developpeurNom 
};

  this.projetService.create(projetData).subscribe({
    next: () => {
      this.successMessage = '✅ Projet créé avec succès !';
      this.resetForm();
      this.loadProjets();
    },
    error: () => this.errorMessage = 'Erreur lors de la création.'
  });
}


  // 🔹 Éditer un projet
  edit(projet: Projet): void {
    this.editing = true;
    this.selectedId = projet.id;
    this.projetForm.patchValue(projet);
  }

  // 🔹 Supprimer un projet
  delete(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce projet ?')) {
      this.projetService.delete(id).subscribe({
        next: () => this.loadProjets(),
        error: () => this.errorMessage = 'Erreur lors de la suppression.'
      });
    }
  }

  // 🔹 Réinitialiser le formulaire
  resetForm(): void {
    this.editing = false;
    this.selectedId = undefined;
    this.projetForm.reset();
  }

  // 🔹 Recherche par nom
  search(): void {
    if (!this.searchTerm.trim()) {
      this.loadProjets();
      return;
    }
    this.projetService.searchByNom(this.searchTerm).subscribe({
      next: (data) => this.projets = data,
      error: () => this.errorMessage = 'Erreur lors de la recherche.'
    });
  }
}
