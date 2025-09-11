import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-publication',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './publication.html',
  styleUrls: ['./publication.css']
})
export class Publication {
 whyFibem = [
    'Réseau de professionnels vérifiés',
    'Avis et badges de confiance',
    'Garantie satisfaction'
  ];
}
