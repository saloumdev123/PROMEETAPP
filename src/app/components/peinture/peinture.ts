import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-peinture',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './peinture.html',
  styleUrl: './peinture.css'
})
export class Peinture {
  hero = {
    title: "Réalisez facilement vos travaux de peinture 🎨",
    subtitle: "Peindre vos murs, plafonds, façades, appliquer des finitions et protections...",
    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=f1b70d00672ebae98fae7ef3057e55b440851492-10814708-images-thumbs&n=13"
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
