import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-commande-prestation-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './commande-prestation-component.html',
  styleUrl: './commande-prestation-component.css'
})
export class CommandePrestationComponent {
rdvDate: string = '';

  planifier() {
    alert(`RDV planifié pour le ${this.rdvDate} 📅`);
  }
}
