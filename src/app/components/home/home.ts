import { style } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './home.html',
   styleUrls: ['./home.css']
})
export class Home {

   constructor(private router: Router) {} 
hero = {
    title: "Votre chantier simplifié, du choix des fournitures à la mise en relation avec les artisans",
    subtitle: "Trouvez vos produits, planifiez vos travaux et engagez des professionnels fiables, rapidement et en toute sécurité.",
    ctaButtons: [
      { text: "Publier une demande", type: "blue", link: "/publier-demande" },
      { text: "Découvrir les artisans", type: "red", link: "/artisans" }
    ],
    image: "https://avatars.mds.yandex.net/i?id=c711c7f87b4436d08e7d01b9f26803fb9ec23793-4408821-images-thumbs&n=13"
  };

   navigate(link: string) {
    this.router.navigate([link]);
  }
   howItWorksCards = [
    {
      image: 'https://avatars.mds.yandex.net/i?id=f582a6dd8742d1129cb85f9d7de96311de8b4306-9624682-images-thumbs&n=13',
      title: 'Choisissez vos produits',
      description: 'Parcourez les catalogues de Leroy Merlin, Castorama, Lapeyre, Bricodépôt et ajoutez vos articles au panier.'
    },
    {
      image: 'https://avatars.mds.yandex.net/i?id=58f5c8763635b4aef6acd1091bda47871c02a9bf-10471913-images-thumbs&n=13',
      title: 'Engagez un professionnel',
      description: 'Sélectionnez les artisans proches de votre chantier selon métier, secteur et devis.'
    },
    {
      image: 'https://avatars.mds.yandex.net/i?id=8abd3c86efff570baa7712b501848b851d9b3ab0-10114046-images-thumbs&n=13',
      title: 'Planifiez vos travaux',
      description: 'Validez le devis et planifiez le RDV du chantier avec votre artisan sélectionné.'
    }
  ];

   finalCTA = {
    text: "Prêt à simplifier vos travaux ? Rejoignez SENFIBEM dès aujourd’hui !",
    buttons: [
      { text: "Publier une demande", type: "red", link: "/publier-demande" },
      { text: "Créer un compte pro", type: "blue", link: "/inscription-pro" }
    ]
  };

 partenaires = [
    { nom: 'Partenaire 1', logo: 'https://avatars.mds.yandex.net/i?id=b48acf55d8cf8d52253655f2af76c11fc0599925-9858868-images-thumbs&n=13', description: 'Description du partenaire 1' },
    { nom: 'Partenaire 2', logo: 'https://avatars.mds.yandex.net/i?id=472a0d927a7fa5f4c3d6374b65495347996031c9-4102221-images-thumbs&n=13', description: 'Description du partenaire 2' },
    { nom: 'Partenaire 3', logo: 'https://avatars.mds.yandex.net/i?id=1c11d5c0a3c5fc253d48c55a52acadec52bc372c-12480668-images-thumbs&n=13', description: 'Description du partenaire 3' },
    { nom: 'Partenaire 4', logo: 'https://avatars.mds.yandex.net/i?id=900d08bc961366b9c164e5ef736da1840196b017-5895977-images-thumbs&n=13', description: 'Description du partenaire 4' },
    { nom: 'Partenaire 5', logo: 'https://avatars.mds.yandex.net/i?id=828fb84cbe584d32a6d980d4c8c27a22-5591414-images-thumbs&n=13', description: 'Description du partenaire 5' },
    { nom: 'Partenaire 6', logo: 'https://avatars.mds.yandex.net/i?id=5315920e16a78b76c7fde3dcc768a4d8caa41a09-4437502-images-thumbs&n=13', description: 'Description du partenaire 6' },
    { nom: 'Partenaire 7', logo: 'https://avatars.mds.yandex.net/i?id=393598c1ed3479b9baaccb1a45295ce105fe5833-16307997-images-thumbs&n=13', description: 'Description du partenaire 7' },
    { nom: 'Partenaire 8', logo: 'https://avatars.mds.yandex.net/i?id=597cec85b5aaea6c77df133b81c72fc2a01b8d24-10289922-images-thumbs&n=13', description: 'Description du partenaire 8' },
    { nom: 'Partenaire 9', logo: 'https://avatars.mds.yandex.net/i?id=7ae77da9f43940d648364d971f15a342e9c8cf56-5427399-images-thumbs&n=13', description: 'Description du partenaire 9' },
    { nom: 'Partenaire 10', logo: 'https://avatars.mds.yandex.net/i?id=8007e7167627e45095da622269a9437d8f46397d-5094289-images-thumbs&n=13', description: 'Description du partenaire 10' }
  ];
 testimonials = [
    {
      image: 'https://avatars.mds.yandex.net/i?id=faafc4996d94fdacdb6072441df8b7c9-4903276-images-thumbs&n=13',
      quote: "SENFIBEM a rendu mes travaux tellement plus simples et rapides !",
      name: "Amadou Diallo",
      profession: "Particulier"
    },
    {
      image: 'https://avatars.mds.yandex.net/i?id=64ff577968cfc2ddc9f5b08806ac68e4d7d70d12-16404329-images-thumbs&n=13',
      quote: "J'ai trouvé un artisan fiable près de mon chantier grâce à la plateforme.",
      name: "Fatou Ndiaye",
      profession: "Entrepreneur"
    },
    {
      image: 'https://avatars.mds.yandex.net/i?id=47008afd997620a89a0ce34a15bf0bd0af129238-16389722-images-thumbs&n=13',
      quote: "Livraison rapide et suivi impeccable des fournitures commandées.",
      name: "Mamadou Ba",
      profession: "Particulier"
    }
  ];
faqs = [
  { question: "Pourquoi proposer des missions dans notre communauté ?", reponse: "Parce que..." },
  { question: "Quel est l'intérêt de l'apport d'affaires pour les consultants ?", reponse: "Cela permet..." },
  { question: "Quelle prime est pratiquée dans l'apport d'affaires ?", reponse: "La prime varie selon..." },
  { question: "Quels types de missions peut-on recommander ?", reponse: "Toutes les missions IT..." },
  { question: "Comment la rémunération est-elle calculée ?", reponse: "Selon chaque facturation réussie..." },
  { question: "Quelles sont les conditions pour devenir apporteur d'affaires ?", reponse: "Avoir un réseau solide..." },
  { question: "Quel est le tarif pour publier sur la plateforme ?", reponse: "La publication est gratuite..." }
];


}
