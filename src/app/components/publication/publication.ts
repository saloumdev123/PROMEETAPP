import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-publication',
  standalone: true, 
  imports: [CommonModule, RouterModule],
  templateUrl: './publication.html',
  styleUrls: ['./publication.css']
})
export class Publication {
 whyFibem = [
    'Réseau de professionnels vérifiés',
    'Avis et badges de confiance',
    'Garantie satisfaction'
  ];

  categories = [
    {
      id: 'maconnerie',
      title: 'Maçonnerie',
      image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Construction et rénovation en maçonnerie.'
    },
    {
      id: 'menuiserie',
      title: 'Menuiserie',
      image: 'https://avatars.mds.yandex.net/i?id=d2b5551c2a143d255de91eaf4851c7f8399004d3-5419089-images-thumbs&n=13',
      description: 'Fabrication et pose de meubles et structures en bois.'
    },
    {
      id: 'peinture',
      title: 'Peinture',
      image: 'https://avatars.mds.yandex.net/i?id=845e95a01336cec148457971b243065c21f0482bd41ae108-13469331-images-thumbs&n=13',
      description: 'Travaux de peinture intérieure et extérieure.'
    },
    {
      id: 'electricite',
      title: 'Électricité',
      image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Installation et maintenance électrique.'
    },
    {
      id: 'plomberie',
      title: 'Plomberie',
      image: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Réparation et installation de systèmes de plomberie.'
    },
    {
      id: 'carrelage',
      title: 'Carrelage',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Pose et rénovation de carrelage intérieur et extérieur.'
    },
    {
      id: 'jardinage',
      title: 'Jardinage',
      image: 'https://images.pexels.com/photos/4241703/pexels-photo-4241703.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Aménagement et entretien de jardins.'
    },
    {
      id: 'cuisine',
      title: 'Cuisine',
      image: 'https://images.pexels.com/photos/276593/pexels-photo-276593.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Conception et installation de cuisines modernes.'
    }
  ];
}
