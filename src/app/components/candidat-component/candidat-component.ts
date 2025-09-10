import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-candidat-component',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './candidat-component.html',
  styleUrl: './candidat-component.css'
})
export class CandidatComponent {
searchKeywords = '';
  searchLocation = '';

   selectedFile: File | null = null;

  // Récupérer le fichier sélectionné
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('CV sélectionné :', this.selectedFile);
  }

  // Soumettre le formulaire
  onSubmit() {
    if (this.selectedFile) {
      console.log('Envoi du CV...', this.selectedFile);

      // Ici tu peux ajouter la logique pour envoyer le fichier
      // vers ton backend (Spring Boot) via un service Angular
    } else {
      console.log('Aucun fichier sélectionné');
    }
  }
}
