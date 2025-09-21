import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-maconnerie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './maconnerie.html',
  styleUrls: ['./maconnerie.css']
})
export class Maconnerie {
  hero = {
    title: "Réalisez facilement vos travaux de maçonnerie 🧱",
    subtitle: "Construire un mur, rénover une structure, coffrage, finition de maçonnerie...",
    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=f69209ec13b62b85bc9fd38f80da369c3f0e1527-7011736-images-thumbs&n=13"
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
