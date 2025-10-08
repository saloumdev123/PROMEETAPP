// fourniture.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeFourniture } from '../enums/typeFourniture';
import { FournitureService } from '../services/fournitureService';
import { Fourniture } from '../models/fourniture';  // ✅ le vrai modèle
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fourniture',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './fourniture.html',
  styleUrls: ['./fourniture.css'] // ✅ "styleUrls" avec un S
})
export class FournitureComponent implements OnInit {   // ✅ Renommé ici
  fournitureForm!: FormGroup;
  fournitures: Fourniture[] = [];
  typeOptions = Object.values(TypeFourniture);
  isEditing = false;
  currentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private fournitureService: FournitureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFournitures();
  }

  initForm(): void {
    this.fournitureForm = this.fb.group({
      designation: ['', Validators.required],
      unite: ['', Validators.required],
      quantite: [0, [Validators.required, Validators.min(0.1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      type: ['', Validators.required]
    });
  }

  loadFournitures(): void {
    this.fournitureService.getAll().subscribe({
      next: (data) => (this.fournitures = data),
      error: (err) => console.error('Erreur chargement fournitures', err)
    });
  }

  save(): void {
    if (this.fournitureForm.invalid) return;

    const fourniture = this.fournitureForm.value as Fourniture;

    if (this.isEditing && this.currentId) {
      this.fournitureService.update(this.currentId, fourniture).subscribe({
        next: () => {
          this.loadFournitures();
          this.resetForm();
        },
        error: (err) => console.error('Erreur modification', err)
      });
    } else {
      this.fournitureService.create(fourniture).subscribe({
        next: () => {
          this.loadFournitures();
          this.resetForm();
        },
        error: (err) => console.error('Erreur création', err)
      });
    }
  }

  edit(f: Fourniture): void {
    this.isEditing = true;
    this.currentId = f.id || null;
    this.fournitureForm.patchValue(f);
  }

  delete(id?: number): void {
    if (id && confirm('Voulez-vous supprimer cette fourniture ?')) {
      this.fournitureService.delete(id).subscribe({
        next: () => this.loadFournitures(),
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentId = null;
    this.fournitureForm.reset();
  }
}
