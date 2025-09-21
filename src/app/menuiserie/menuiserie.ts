import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menuiserie',
  imports: [CommonModule],
  templateUrl: './menuiserie.html',
  styleUrl: './menuiserie.css'
})
export class Menuiserie {
 hero = {
   title: "Réalisez facilement vos travaux de menuiserie 🪚",
subtitle: "Fabriquer, installer ou rénover des meubles, portes, fenêtres, et aménagements en bois...",
    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=2378466a90301673741e788b4fc4afd7ef5f3aa0-5434079-images-thumbs&n=13"
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
