import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rdv-component',
  standalone: true, 
  imports: [ CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule],
  templateUrl: './rdv-component.html',
   styleUrls: ['./rdv-component.css']
})
export class RdvComponent {
 rdvDate: Date | null = null;
  rdvTime: string = '';

  submitRdv() {
    if(this.rdvDate && this.rdvTime){
      alert(`Rendez-vous pris le ${this.rdvDate.toLocaleDateString()} à ${this.rdvTime}`);
      // Ici tu peux envoyer la réservation vers ton backend
    } else {
      alert('Veuillez choisir une date et une heure.');
    }
  }
}
