import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  selector: 'app-electricityprocess',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './electricityprocess.html',
  styleUrls: ['./electricityprocess.css']
})
export class Electricityprocess implements OnInit {

  // ---- Variables générales ----
  role: 'PARTICULIER' | 'PROFESSIONNEL' | 'ADMIN' = 'PROFESSIONNEL';
  userCategory: string | null = null; 
  currentStep: number = 0;
  stepsCount: number = 13;

  // Champs divers
  projectTitle: string = '';
  selectedOption: string | null = null;
  adresseEmail: string = '';
  budget: number | null = null;
  maturite: string | null = null;
  interventionAdresse: string = '';
  dateOption: string | null = null;
  selectedDate: string | null = null;
  budgetTotal: number = 234;
  prixMoyenAnnonces: number = 234;
  userEmail: string = '';
  precision: string = '';

  // Étape 12 - Infos personnelles
  firstName: string = '';
  lastName: string = '';
  accountEmail: string = '';
  phone: string = '';
  password: string = '';
  marketingConsent: boolean = false;
  acceptTerms: boolean = false;

  // Étape 5 - Upload
  form!: FormGroup;
  selectedDocuments: string[] = [];
  uploadedFiles: { name: string; url: string; docName?: string }[] = [];

  // ✅ Champs pour rôle "PROFESSIONNEL"
  companyName: string = '';
  ninea: string = '';
  companyAddress: string = '';

  // Simul annonces similaires
  annoncesSimilaires: Annonce[] = [
    {
      titre: "Installation de tableau électrique",
      budget: 800,
      elements: "Tableau 12 modules",
      credence: "Oui",
      evacuations: "Ancien tableau",
      avancement: "En cours",
      localisation: "Dakar"
    },
    {
      titre: "Remplacement de prises",
      budget: 250,
      elements: "5 prises",
      credence: "Non",
      evacuations: "Anciennes prises",
      avancement: "Début",
      localisation: "Thiès"
    }
  ];

  // Catégories utilisateur (Étape 12)
  categories = [
    { key: 'PARTICULIER', label: 'Particulier' },
    { key: 'PROFESSIONNEL', label: 'Professionnel' },
    { key: 'ADMIN', label: 'Administrateur' }
  ];

  // Config documents par rôle/catégorie
  requiredDocs: { [key: string]: string[] } = {
    PARTICULIER: [
      "Carte d’identité",
      "CV",
      "Certificat de résidence",
      "Attestation fiscale (optionnel)"
    ],
    PROFESSIONNEL: [
      "Statuts / registre de commerce",
      "NINEA + attestations fiscales",
      "Contrat ou protocole d’accord"
    ],
    ADMIN: ["Badge administratif", "Lettre de mission"]
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectedDocuments = this.requiredDocs[this.role] || [];
    this.form = this.fb.group({});
  }

  // ---- Étape 5 : Upload fichiers ----
  onFilesSelected(event: any, docName: string): void {
    const files = event.target.files;
    for (let file of files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFiles.push({
          name: file.name,
          url: e.target.result,
          docName: docName
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // ---- Soumission formulaire ----
  onSubmit(): void {
    if (this.form.valid) {
      console.log("📤 Données soumises :", this.form.value);
    } else {
      console.log("⚠️ Formulaire incomplet !");
    }
  }

  // ---- Navigation ----
  get progressWidth() {
    return ((this.currentStep + 1) / this.stepsCount) * 100 + "%";
  }

  nextStep() {
    if (this.currentStep < this.stepsCount - 1) {
      this.currentStep++;
      if (this.currentStep === 5) {
        this.selectedDocuments = this.requiredDocs[this.role] || [];
      }
    }
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  isStep12(): boolean {
    return this.currentStep === 12;
  }

  canGoNextStep(): boolean {
    if (this.isStep12()) {
      return (
        this.firstName.trim() !== "" &&
        this.lastName.trim() !== "" &&
        this.accountEmail.trim() !== "" &&
        this.phone.trim() !== "" &&
        this.password.trim() !== "" &&
        this.acceptTerms
      );
    }
    return true;
  }

  // ---- Sélections ----
  selectOption(option: string) {
    this.selectedOption = option;
  }

  selectMaturite(maturite: string) {
    this.maturite = maturite;
  }

  selectDateOption(option: string) {
    this.dateOption = option;
  }

  selectCategory(catKey: string) {
    this.userCategory = catKey;
    this.selectedDocuments = this.requiredDocs[catKey] || [];
  }

  // ---- Récapitulatif ----
  recapItem = {
    titre: "Installation électrique complète",
    description: "Mise en conformité + tableau électrique",
    budget: 1200,
    image: "https://via.placeholder.com/150"
  };

  voirDetail(item: any) {
    console.log("🔎 Détail :", item);
  }
}
