import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ligne-devise-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ligne-devise-component.html',
  styleUrl: './ligne-devise-component.css'
})

export class LigneDevisComponent implements OnInit {

   ligneDeviseForm!: FormGroup;
  lignes: any[] = [];
  isEditing = false;
  editIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.ligneDeviseForm = this.fb.group({
      nomDevise: ['', Validators.required],
      taux: [0, [Validators.required, Validators.min(0)]],
      symbole: ['', Validators.required],
      pays: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ligneDeviseForm.invalid) return;

    if (this.isEditing && this.editIndex !== null) {
      this.lignes[this.editIndex] = this.ligneDeviseForm.value;
      this.isEditing = false;
      this.editIndex = null;
    } else {
      const nouvelleLigne = { id: this.lignes.length + 1, ...this.ligneDeviseForm.value };
      this.lignes.push(nouvelleLigne);
    }

    this.ligneDeviseForm.reset();
  }

  editLigne(index: number): void {
    this.ligneDeviseForm.patchValue(this.lignes[index]);
    this.isEditing = true;
    this.editIndex = index;
  }

  supprimer(index: number): void {
    this.lignes.splice(index, 1);
  }
}
