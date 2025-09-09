import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contactComponent.html',
  styleUrl: './contact.css'
})
export class ContactComponent
 {
contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // ✅ Initialisation du formulaire avec validations
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  // ✅ Méthode appelée lors du submit
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('📩 Message envoyé :', this.contactForm.value);

      alert('✅ Merci pour votre message, nous vous répondrons rapidement !');

      // Réinitialiser le formulaire après envoi
      this.contactForm.reset();
    } else {
      alert('⚠️ Merci de remplir tous les champs correctement.');
    }
  }
}
