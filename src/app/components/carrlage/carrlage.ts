import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrlage',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './carrlage.html',
  styleUrl: './carrlage.css'
})
export class Carrlage {
 hero = {
   title: "Réalisez facilement vos travaux de carrelage 🧱",
subtitle: "Pose de carrelage mural, sol, mosaïque, rénovation de salle de bain...",

    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=3e4875bd7c783be564a708dd8c6c00998e3c1d7b-9888116-images-thumbs&n=13"
  };

  navigate(link: string) {
    console.log("Navigate to:", link);
    // tu pourras mettre un Router.navigate ici
  }


  searchQuery = '';
  popularSearches = [
    'Plomberie',
    'Électricité',
    'Peinture',
    'Jardinage',
    'Ménage',
    'Déménagement',
    'Réparation',
    'Installation'
  ];

  performSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Recherche:', this.searchQuery);
      // Ici vous ajouteriez la logique de recherche
    }
  }

  selectPopularSearch(search: string): void {
    this.searchQuery = search;
    this.performSearch();
  }
}
