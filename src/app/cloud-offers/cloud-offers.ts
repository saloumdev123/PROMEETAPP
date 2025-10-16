import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cloud-offers',
  imports: [CommonModule],
  templateUrl: './cloud-offers.html',
  styleUrl: './cloud-offers.css'
})
export class CloudOffers {
offers = [
    {
      name: 'Cloud Basic',
      target: 'Site vitrine, petit projet',
      price: '19,99 €/mois',
      specs: ['2 vCPU', '2 Go RAM', '50 Go SSD', 'Support Email'],
      recommended: false,
    },
    {
      name: 'Cloud Pro',
      target: 'Application métier',
      price: '49,99 €/mois',
      specs: ['4 vCPU', '8 Go RAM', '100 Go SSD', 'Support Email + Téléphone'],
      recommended: true,
    },
    {
      name: 'Cloud Premium',
      target: 'Sites à fort trafic',
      price: '89,99 €/mois',
      specs: ['8 vCPU', '16 Go RAM', '250 Go SSD', 'Support 24/7'],
      recommended: false,
    },
  ];
}
