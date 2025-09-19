import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-b2b-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './b2b-component.html',
  styleUrls: ['./b2b-component.css']
})
export class B2bComponent {
  hero = {
    title: 'Boostez votre conversion avec notre service d\'installation',
    subtitle: 'Découvrez nos solutions dédiées aux retailers et aux e-commerçants.',
    image: 'https://d39jeaq38kq5vc.cloudfront.net/_image?sanity=15w996j8%2Fcms%2Fc4be0c36efa8b80a7a17e53120be9e3c1777561d-1760x1056.png&w=1920&q=75'
  };

  constructor(private router: Router) {}

  navigate(path: string) {
    if(path === '/solutions') {  // <-- ici on utilise 'path' et non 'route'
      const element = document.querySelector('.solution-section');
      if(element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // pour les autres routes, on utilise le router
      this.router.navigate([path]);
    }
  }

  // Le pack actuellement affiché
  activePack: 'starter' | 'premium' = 'starter';

  selectPack(pack: 'starter' | 'premium') {
    this.activePack = pack;

    const element = document.querySelector(`#${pack}`);
    if(element){
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  partners: string[] = ['Castorama', 'IKEA', 'Biko Déco', 'Conforama', 'Lepayre', 'Alinéa', 'BUT', 'EROY MERLIN'];
  currentPartnerIndex = 0;

  ngOnInit() {
    setInterval(() => {
      this.currentPartnerIndex = (this.currentPartnerIndex + 1) % this.partners.length;
      const partnerNameEl = document.getElementById('partner-name');
      if (partnerNameEl) {
        partnerNameEl.textContent = this.partners[this.currentPartnerIndex];
      }
    }, 2000); // toutes les 2 secondes
  }
    
}