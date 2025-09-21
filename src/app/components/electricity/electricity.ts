import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-electricity',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './electricity.html',
  styleUrls: ['./electricity.css']
})
export class Electricity {
  hero = {
    title: "Réalisez facilement vos travaux d’électricité ⚡",
    subtitle: "Installer des prises, interrupteurs, luminaires, dépannage électrique...",

    showSearch: true,
    image: "https://avatars.mds.yandex.net/i?id=5e45cb533335641fbe96859b807cc381854822e7-5233627-images-thumbs&n=13"
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
