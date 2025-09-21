import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-jardinage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jardinage.html',
  styleUrls: ['./jardinage.css']
})
export class Jardinage {
  hero = {
    title: "Réalisez facilement vos travaux de jardinage 🌱",
    subtitle: "Planter, entretenir, tailler vos arbres et haies, créer ou rénover vos espaces verts...",
    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=38176321d8be67b474c056069562735b1ba0daee-10113980-images-thumbs&n=13"
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
