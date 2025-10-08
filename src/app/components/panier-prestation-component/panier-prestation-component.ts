import { Component } from '@angular/core';
import { PanierPrestation } from '../../models/panierPrestation';
import { ArtisanService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panier-prestation-component',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panier-prestation-component.html',
  styleUrl: './panier-prestation-component.css'
})
export class PanierPrestationComponent {
panier: PanierPrestation[] = [];

  constructor(private artisanService: ArtisanService) {}

  ngOnInit() {
    this.panier = this.artisanService.getPanier();
  }

  valider() {
    const message = this.artisanService.validerCommande();
    alert(message);
    this.panier = [];
  }
}
