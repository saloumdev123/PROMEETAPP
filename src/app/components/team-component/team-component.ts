import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-team-component',
  imports: [CommonModule],
  templateUrl: './team-component.html',
  styleUrls: ['./team-component.css']
})
export class TeamComponent {
    constructor(public translate: TranslateService) {}

  // Getter pour utiliser t.instant(...) comme dans ton HTML
  get t() {
    return this.translate;
  }
  
 teamMembers = [
    {
      nom: 'Jean Dupont',
      poste: 'CEO',
      description: 'Fondateur et visionnaire de la plateforme, expert en stratégie multisectorielle.',
      photo: 'assets/images/team/jean.jpg',
      linkedin: 'https://linkedin.com/in/jeandupont'
    },
    {
      nom: 'Amina Ndiaye',
      poste: 'CTO',
      description: 'Responsable technique, développeur Full Stack et spécialiste des intégrations API.',
      photo: 'https://avatars.mds.yandex.net/i?id=5303282e9921ae9f72cade3bc2c371e99a921ed4-4135367-images-thumbs&n=13',
      linkedin: 'https://linkedin.com/in/aminandiaye'
    },
    {
      nom: 'Fatou Bâ',
      poste: 'Marketing Manager',
      description: 'Gère la communication et le marketing pour tous les secteurs.',
      photo: 'https://avatars.mds.yandex.net/i?id=65e35003cf2a4fa47fac1fc79091464d7c981910-16396210-images-thumbs&n=13',
      twitter: 'https://twitter.com/fatouba'
    },
    {
      nom: 'Ousmane Diop',
      poste: 'Customer Support',
      description: 'Accompagne nos utilisateurs et veille à la satisfaction client.',
      photo: 'assets/images/team/ousmane.jpg'
    }
  ];
}
