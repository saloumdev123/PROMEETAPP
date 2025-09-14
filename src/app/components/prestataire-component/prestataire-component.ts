import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prestataire-component',
  imports: [CommonModule],
  templateUrl: './prestataire-component.html',
  styleUrls: ['./prestataire-component.css']
})
export class PrestataireComponent {
constructor(private router: Router) {}

  navigate(link: string) {
    this.router.navigate([link]);
  }
   onDevenirPro() {
    console.log("Navigation vers inscription prestataire Pro");
     this.router.navigate(['/inscription-prestataire']);
  }
}
