import { Component } from '@angular/core';
import { PanierPrestation } from '../../models/panierPrestation';
import { ArtisanService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class Panier {
 panier: PanierPrestation[] = [];

  constructor(private artisanService: ArtisanService) {}

  ngOnInit(): void {
    this.panier = this.artisanService.getPanier();
  }

  validerCommande() {
    const message = this.artisanService.validerCommande();
    alert(message);
    this.panier = []; // vider localement aussi
  }
}
