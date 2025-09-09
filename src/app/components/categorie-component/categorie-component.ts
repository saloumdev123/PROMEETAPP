import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../models/categori';
import { Produit } from '../../models/produit';
import { CategoriService } from '../../services/categoriService';
import { ProduitService } from '../../services/produitService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorie-component',
  imports: [CommonModule, FormsModule, RouterModule
  ],
  templateUrl: './categorie-component.html',
  styleUrl: './categorie-component.css'
})
export class CategorieComponent  implements OnInit{

  categories: Categorie[] = [];
  newCategorie: Categorie = { nom: '', description: '' };

  // 🔥 Produits associés à une catégorie
  produits: Produit[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 6;
  selectedCategorieId: number | null = null;

  constructor(
    private categorieService: CategoriService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  createCategorie(): void {
    this.categorieService.createCategorie(this.newCategorie).subscribe(data => {
      this.categories.push(data);
      this.newCategorie = { nom: '', description: '' };
    });
  }

  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(() => {
      this.categories = this.categories.filter(c => c.id !== id);
    });
  }

  // 🔹 Charger les produits par catégorie
  loadProduitsByCategorie(categorieId: number, page: number = 0): void {
    this.selectedCategorieId = categorieId;
    this.produitService.getProduitsByCategorie(categorieId, page, this.pageSize)
      .subscribe(data => {
        this.produits = data.content;
        this.totalPages = data.totalPages;
        this.currentPage = data.number;
      });
  }

  // 🔹 Pagination des produits
  changePage(page: number): void {
    if (this.selectedCategorieId !== null && page >= 0 && page < this.totalPages) {
      this.loadProduitsByCategorie(this.selectedCategorieId, page);
    }
  }
}
