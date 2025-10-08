import { Injectable } from "@angular/core";
import { Artisan } from "../models/artisan";
import { PanierPrestation } from "../models/panierPrestation";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ArtisanService {
  private artisans: Artisan[] = [
    {
      id: 1,
      nom: 'Jean Dupont',
      secteur: 'Bâtiment',
      metier: 'Maçon',
      localisation: 'Paris',
      disponibilite: 'Disponible sous 7 jours',
      rc: 'RC Pro valide',
      dcts: 'Décennale 2025',
      devis: 1500
    },
    {
      id: 2,
      nom: 'Samba Ndiaye',
      secteur: 'Plomberie',
      metier: 'Plombier',
      localisation: 'Dakar',
      disponibilite: 'Disponible sous 3 jours',
      rc: 'RC Pro valide',
      dcts: 'Décennale 2026',
      devis: 800
    }
  ];

  private panier: PanierPrestation[] = [];
  private panierCountSubject = new BehaviorSubject<number>(0);
  panierCount$ = this.panierCountSubject.asObservable();

  getArtisans(): Artisan[] {
    return this.artisans;
  }

  getPanier(): PanierPrestation[] {
    return this.panier;
  }

  ajouterAuPanier(utilisateur: string, artisan: Artisan, prestation: string) {
    const newItem: PanierPrestation = {
      id: this.panier.length + 1,
      utilisateur,
      artisan,
      prestation,
      devis: artisan.devis,
      prixEstime: artisan.devis
    };
    this.panier.push(newItem);

    // ➕ mise à jour du compteur
    this.panierCountSubject.next(this.panier.length);
  }

  validerCommande(): string {
    this.panier = [];
    // 🔄 remet le compteur à 0
    this.panierCountSubject.next(0);
    return 'Commande validée avec succès ✅';
  }
}