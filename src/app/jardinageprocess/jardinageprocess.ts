import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


interface Annonce {
  titre: string;
  budget: number;
  elements: string;
  credence: string;
  evacuations: string;
  avancement: string;
  localisation: string;
}
@Component({
  selector: 'app-jardinageprocess',
   standalone:true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './jardinageprocess.html',
  styleUrl: './jardinageprocess.css'
})
export class Jardinageprocess {
currentStep: number = 0;
  stepsCount: number = 13;  // Inclut l’étape 12
  projectTitle: string = '';
  selectedOption: string | null = null;
  adresseEmail: string = '';
  budget: number | null = null;
  uploadedFiles: { name: string, url: string }[] = [];
  maturite: string | null = null;
  interventionAdresse: string = '';
  dateOption: string | null = null;
  selectedDate: string | null = null;
  budgetTotal: number = 234;
  prixMoyenAnnonces: number = 234;
  userEmail: string = '';
  precision: string = '';

  // Étape 12 – compte utilisateur
  userType: 'particulier' | 'entreprise' | null = null;
  firstName: string = '';
  lastName: string = '';
  accountEmail: string = '';
  phone: string = '';
  password: string = '';
  marketingConsent: boolean = false;
  acceptTerms: boolean = false;


  // Récapitulatif étape 10 – un seul item
  recapItem = {
    titre: 'Déposer une cuisine',
    description: 'Voici le résumé de votre demande sélectionnée.',
    budget: 234,
    image: 'https://avatars.mds.yandex.net/i?id=910a442d87655efc47f6c43878f044e0c452f13f-10702479-images-thumbs&n=13'
  };

  // Annonces similaires
  annoncesSimilaires: Annonce[] = [
    {
      titre: 'Déposer une kitchenette',
      budget: 325,
      elements: 'Meubles hauts: 1, Meubles bas: 1, Plan de travail: 1, Évier et plomberie: 1, Électroménager encastré: 1, Hotte: 1',
      credence: 'A définir ensemble',
      evacuations: 'Oui',
      avancement: 'Je suis prêt à démarrer',
      localisation: '93300 Aubervilliers'
    },
    {
      titre: 'Déposer une kitchenette',
      budget: 130,
      elements: 'Électroménager encastré: 1, Plan de travail: 1',
      credence: 'A définir ensemble',
      evacuations: 'Non',
      avancement: 'Je suis prêt à démarrer',
      localisation: '78100 Saint-Germain-en-Laye'
    },
    {
      titre: 'Déposer une cuisine',
      budget: 195,
      elements: 'Meubles hauts: 5, Meubles bas: 4, Plan de travail: 1, Évier et plomberie: 1, Electroménager: 1, Hotte: 1',
      credence: 'Non',
      evacuations: 'A définir ensemble',
      avancement: 'J\'ai besoin d\'accompagnement',
      localisation: '77220 Gretz-Armainvilliers'
    },
    {
      titre: 'Déposer une cuisine de 7 m²',
      budget: 455,
      elements: 'Meubles hauts: 3, Meubles bas: 5, Plan de travail: 1, Évier et plomberie: 1, Électroménager encastré: 2, Electroménager: 1, Hotte: 1',
      credence: 'Oui',
      evacuations: 'Oui',
      avancement: 'J\'ai besoin d\'accompagnement',
      localisation: '75016 Paris'
    },
    {
      titre: 'Déposer une cuisine',
      budget: 174,
      elements: 'Meubles hauts: 1, Meubles bas: 1, Plan de travail: 1, Évier et plomberie: 1, Hotte: 1, Électroménager encastré: 1',
      credence: 'A définir ensemble',
      evacuations: 'A définir ensemble',
      avancement: 'Je suis prêt à démarrer',
      localisation: '37170 Chambray-lès-Tours'
    },
    {
      titre: 'Modifier la colonne de cuisine pour frigidaire',
      budget: 221,
      elements: 'Meubles hauts: 1',
      credence: 'Oui, A définir ensemble',
      evacuations: 'A définir ensemble',
      avancement: 'Je suis prêt à démarrer',
      localisation: '91190 Gif-sur-Yvette'
    }
  ];

  // Barre de progression
  get progressWidth() {
    return ((this.currentStep + 1) / this.stepsCount) * 100 + '%';
  }

  // Navigation étapes
  nextStep() {
    if (this.currentStep < this.stepsCount - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Vérifier si on est à l'étape 12
  isStep12(): boolean {
    return this.currentStep === 12;
  }

  // Étape 2 – Installer / Remplacer / Réparer
  selectOption(option: string) {
    this.selectedOption = option;
  }

  // Étape 6 – Maturité
  selectMaturite(option: string) {
    this.maturite = option;
  }

  // Étape 5 – Upload fichiers
  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFiles.push({ name: file.name, url: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Activation bouton suivant
  canGoNextStep(): boolean {
    if (this.currentStep === 2) return this.selectedOption !== null;
    if (this.currentStep === 6) return this.maturite !== null;
    if (this.currentStep === 7) return this.interventionAdresse.trim() !== '';
    if (this.currentStep === 8 && this.dateOption) return this.selectedDate !== null;
    if (this.isStep12()) return this.acceptTerms && this.firstName.trim() !== '' && this.lastName.trim() !== '' && this.accountEmail.trim() !== '' && this.password.trim() !== '';
    return true;
  }

  // Étape 8 – Choix de date
  selectDateOption(option: string) {
    this.dateOption = option;
    this.selectedDate = null;
  }

  // Fonction pour voir les détails
  voirDetail(item: any) {
    alert(`Détails pour : ${item.titre}\nBudget : ${item.budget} €\nDescription : ${item.description}`);
  }
  // Étape 12 – sélection type utilisateur
  userCategory: string | null = null;
  selectedDocuments: string[] = [];

  categories = [
    {
      key: 'sous_traitant',
      label: 'Sous-traitant',
      documents: [
        'Registre de commerce',
        'NINEA',
        'Attestations CNSS/IPRES',
        'Attestation fiscale',
        'Contrat de sous-traitance'
      ]
    },
    {
      key: 'particulier',
      label: 'Particulier',
      documents: [
        'Carte d’identité',
        'CV',
        'Certificat de résidence',
        'Attestation fiscale (optionnel)'
      ]
    },
    {
      key: 'sous_traitant',
      label: 'Sous-traitant',
      documents: [
        'Registre de commerce',
        'NINEA',
        'Attestations CNSS/IPRES',
        'Attestation fiscale',
        'Contrat de sous-traitance'
      ]
    },
    {
      key: 'particulier',
      label: 'Particulier',
      documents: [
        'Carte d’identité',
        'CV',
        'Certificat de résidence',
        'Attestation fiscale (optionnel)'
      ]
    },
    {
      key: 'artisan',
      label: 'Artisan',
      documents: [
        'Carte professionnelle',
        'NINEA (si enregistré)',
        'Carte d’identité',
        'Références / portfolio'
      ]
    },
    {
      key: 'partenaire',
      label: 'Partenaire',
      documents: [
        'Statuts / registre de commerce',
        'NINEA + attestations fiscales',
        'Contrat ou protocole d’accord'
      ]
    },
    {
      key: 'candidat',
      label: 'Candidat',
      documents: [
        'CV',
        'Lettre de motivation',
        'Diplômes / attestations',
        'Carte d’identité'
      ]
    },
    {
      key: 'stagiaire',
      label: 'Stagiaire',
      documents: [
        'CV',
        'Lettre de motivation',
        'Convention de stage',
        'Carte d’étudiant / identité',
        'Assurance'
      ]
    },
    {
      key: 'commercial',
      label: 'Commercial / Rapporteur d’affaires',
      documents: [
        'CV',
        'Carte d’identité',
        'Contrat de collaboration',
        'NDA (confidentialité)'
      ]
    }
  ];

  selectCategory(key: string) {
    this.userCategory = key;
    const category = this.categories.find(c => c.key === key);
    this.selectedDocuments = category ? category.documents : [];
  }
}
