import { Component, OnInit } from '@angular/core';
import { Candidat } from '../../models/candidat';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CandidatService } from '../../services/candidat.service';

@Component({
  selector: 'app-candidat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './candidat-component.html',
  styleUrls: ['./candidat.css']
})
export class CandidatComponent {

  candidats: Candidat[] = [];
  candidatForm!: FormGroup;
  isEditing = false;
  currentCandidatId?: number;

  constructor(
    private fb: FormBuilder,
    private candidatService: CandidatService
  ) {}

  ngOnInit(): void {
    this.loadCandidats();

    this.candidatForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
      dateNaissance: [''],
      metier: ['']
    });
  }

  // Charger tous les candidats
  loadCandidats(): void {
    this.candidatService.getCandidats(0, 10).subscribe({
      next: (data) => {
        this.candidats = data.content; // ⚡ dépend si backend retourne Page
      },
      error: (err) => console.error(err)
    });
  }

  // Créer ou mettre à jour
  saveCandidat(): void {
    if (this.candidatForm.invalid) return;

    const formValue: Candidat = this.candidatForm.value;

    if (this.isEditing && this.currentCandidatId) {
      this.candidatService.updateCandidat(this.currentCandidatId, formValue).subscribe({
        next: () => {
          this.loadCandidats();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.candidatService.createCandidat(formValue).subscribe({
        next: () => {
          this.loadCandidats();
          this.resetForm();
        },
        error: (err) => console.error(err)
      });
    }
  }

  // Éditer un candidat
  editCandidat(candidat: Candidat): void {
    this.isEditing = true;
    this.currentCandidatId = candidat.id;
    this.candidatForm.patchValue(candidat);
  }

  // Supprimer
  deleteCandidat(id?: number): void {
    if (!id) return;
    this.candidatService.deleteCandidat(id).subscribe({
      next: () => this.loadCandidats(),
      error: (err) => console.error(err)
    });
  }

  // Reset form
  resetForm(): void {
    this.isEditing = false;
    this.currentCandidatId = undefined;
    this.candidatForm.reset();
  }
}