import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-prestataire-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription-prestataire-component.html',
  styleUrl: './inscription-prestataire-component.css'
})
export class InscriptionPrestataireComponent {
 form = this.fb.group({
    type: ['particulier', Validators.required],
    metier: ['', Validators.required],
    siren: [''],
    entreprise: [''],
    adresse: ['', Validators.required],
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telephone: ['', Validators.required],
    motDePasse: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    ]],
    newsletter: [false],
    cgu: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  submit() {
    if (this.form.valid) {
      console.log('Données du formulaire :', this.form.value);
      alert('Compte prestataire créé avec succès ✅');
      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  back() {
    this.router.navigate(['/prestataire']);
  }
}
