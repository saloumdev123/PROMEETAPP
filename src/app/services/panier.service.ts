import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierPrestation } from '../models/panierPrestation';

@Injectable({ providedIn: 'root' })
export class PanierService {
  private panier: PanierPrestation[] = [];

  // compteur observable pour la navbar
  private panierCountSubject = new BehaviorSubject<number>(0);
  panierCount$ = this.panierCountSubject.asObservable();

  getPanier(): PanierPrestation[] {
    return this.panier;
  }

  ajouter(item: PanierPrestation) {
    this.panier.push(item);
    this.panierCountSubject.next(this.panier.length);
  }

  valider(): string {
    if (this.panier.length === 0) return "⚠️ Panier vide";
    const message = `✅ Commande validée avec ${this.panier.length} prestation(s).`;
    this.panier = [];
    this.panierCountSubject.next(0);
    return message;
  }
}
