import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-plomberie',
   standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './plomberie.html',
  styleUrl: './plomberie.css'
})
export class Plomberie {
hero = {
    title: "Réalisez facilement vos travaux de plomberie 🚰",
subtitle: "Réparer vos fuites, installer des équipements sanitaires, déboucher et entretenir vos canalisations...",
    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=c73aba0ab76877f7158bb901409b1b568abd4ada-5321633-images-thumbs&n=13"
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
