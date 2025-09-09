import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produitService';
import { Produit } from '../../models/produit';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriService } from '../../services/categoriService';
import { PageProduit } from '../../models/PageProduit';
import { Categorie } from '../../models/categori';
import { MagasinService } from '../../services/magasin-service';

@Component({
  selector: 'app-produit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './produit.html',
  styleUrls: ['./produit.css'] 
})

export class ProduitComponent implements OnInit {
  
  produits: Produit[] = [];
  newProduit: Produit = {
    nom: '',
    description: '',
    prix: 0,
    image: '',
    quantiteEnStock: 0,
    magasinId: 0,
    categorieId: 0
  };
selectedProduit: Produit | null = null;
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 6;
startDate: string | null = null;
  endDate: string | null = null;
  searchKeyword: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: Categorie[] = [];
  selectedCategorie: number | '' = '';
    slides = [0, 1, 2, 3]; // 4 slides
  currentIndex = 0;
  slideInterval: any;
  magasins: any[] = []; // Liste des magasins
selectedMagasinId: number | '' = '';

  constructor(
    private produitService: ProduitService,
    private categorieService: CategoriService,
    private magasinService: MagasinService

  ) { }

  ngOnInit(): void {
    this.loadProduits(this.currentPage);
    this.loadCategories();
    this.startAutoSlide();
    this.loadMagasins(); 
  }
loadMagasins(): void {
  this.magasinService.getMagasins().subscribe({
    next: (data) => {
      this.magasins = data;
    },
    error: (err) => {
      console.error('Impossible de charger les magasins', err);
      this.magasins = [];
    }
  });
}
 addToCart(produit: any) {
    console.log('Produit ajouté au panier :', produit);
    // Ici tu peux appeler ton service panier pour réellement ajouter le produit
    alert(`${produit.nom} a été ajouté au panier !`);
  }

  // ✅ Charger les produits depuis le backend (pagination)
  loadProduits(page: number): void {
    this.produitService.getAllProduits(page, this.pageSize).subscribe({
      next: (response) => {
        this.produits = response.content; // Spring Boot renvoie { content, totalPages, number }
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      },
      error: (err) => {
        console.error("Impossible de charger les produits :", err);
        alert("Le serveur backend n'est pas disponible. Vérifiez qu'il est lancé sur le port 8080.");
      }
    });
  }

  // ✅ Charger les catégories
  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  // 🔹 Pagination backend
  loadPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.loadProduits(page);
    }
  }

  // 🔹 Filtrer par catégorie côté backend
  filterByCategorie(): void {
    if (this.selectedCategorie) {
      this.produitService.getProduitsByCategorie(+this.selectedCategorie, 0, this.pageSize)
        .subscribe(response => {
          this.produits = response.content;
          this.totalPages = response.totalPages;
          this.currentPage = response.number;
        });
    } else {
      this.loadProduits(0);
    }
  }

  // Créer produit
  createProduit(): void {
    this.produitService.createProduit(this.newProduit).subscribe(() => {
      this.loadProduits(0);
      this.newProduit = {
        nom: '',
        description: '',
        prix: 0,
        image: '',
        quantiteEnStock: 0,
        magasinId: 0,
        categorieId: 0
      };
    });
  }

filterProduits(): void {
  if (this.selectedMagasinId) {
    this.filterByMagasin(); // Priorité au filtre magasin
    return;
  }

  this.produitService.getProduitsFiltres(
    this.selectedCategorie ? +this.selectedCategorie : null,
    this.searchKeyword || '',
    this.minPrice,
    this.maxPrice,
    this.currentPage,
    this.pageSize
  ).subscribe(response => {
    this.produits = response.content;
    this.totalPages = response.totalPages;
    this.currentPage = response.number;
  });
}


  // Supprimer produit
  deleteProduit(id: number): void {
    this.produitService.deleteProduit(id).subscribe(() => {
      this.loadProduits(this.currentPage);
    });
  }

  showDetails(produit: Produit): void {
  this.selectedProduit = produit;
}
// Lancement du slider automatique
  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change de slide toutes les 5 secondes
  }

  // Slide suivant
  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  // Slide précédent
  prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  // Aller à un slide précis (boutons indicateurs)
  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }
filterByMagasin(): void {
  if (this.selectedMagasinId) {
    // On appelle l'API backend pour récupérer les produits de ce magasin
    this.produitService.getProduitsByMagasin(+this.selectedMagasinId, 0, this.pageSize)
      .subscribe(response => {
        this.produits = response.content;
        this.totalPages = response.totalPages;
        this.currentPage = response.number;
      });
  } else {
    // Si aucun magasin sélectionné, on recharge tous les produits
    this.loadProduits(0);
  }
}

}