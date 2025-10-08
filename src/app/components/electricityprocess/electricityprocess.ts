import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtisanService } from '../../services/artisan.service';
import { PanierPrestation } from '../../models/panierPrestation';
import { PanierService } from '../../services/panier.service';

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
  role: 'PARTICULIER' | 'PROFESSIONNEL' | 'ADMIN' = 'PARTICULIER';
  userCategory: string | null = null;
  currentStep: number = 0;
  stepsCount: number = 15;

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

  // ---- Budget & Devise ----
  selectedCurrency: string = "EUR"; // valeur par défaut
acceptCommission: boolean = false;
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
      "Attestation fiscale (optionnel)",
      "Autres (optionnel)"
    ],
    PROFESSIONNEL: [
      "Statuts / registre de commerce",
      "NINEA + attestations fiscales",
      "Contrat ou protocole d’accord",
      "Autres (optionnel)"
    ],
    ADMIN: ["Badge administratif", "Lettre de mission"]
  };

  constructor(private fb: FormBuilder,private panierService: PanierService ) { }



  phoneNumber: string = "";
  selectedCountryCode: string = "+221"; // par défaut Sénégal
  phonePlaceholder: string = "+221 XX XXX XX XX"; // placeholder dynamique
  phoneError: boolean = false;

  countryCodes: { code: string, label: string }[] = [
    { code: "+221", label: "Sénégal" },
    { code: "+33", label: "France" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "Royaume-Uni" },
    { code: "+49", label: "Allemagne" },
    { code: "+34", label: "Espagne" },
    { code: "+39", label: "Italie" },
    { code: "+212", label: "Maroc" },
    { code: "+216", label: "Tunisie" },
    { code: "+213", label: "Algérie" },
    { code: "+81", label: "Japon" },
    { code: "+86", label: "Chine" },
    { code: "+91", label: "Inde" },
    { code: "+55", label: "Brésil" },
    { code: "+7", label: "Russie" }
  ];

  // 🔹 Met à jour le placeholder quand on change de pays
  updatePhonePlaceholder() {
    this.phonePlaceholder = `${this.selectedCountryCode} XX XXX XX XX`;
  }

  // 🔹 Validation stricte
  validatePhoneNumber() {
    if (!this.phoneNumber.startsWith(this.selectedCountryCode)) {
      this.phoneError = true;
    } else {
      this.phoneError = false;
    }
  }

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

  // Paiement
  selectedPayment: string | null = null;
  commissionRate: number = 0;
  transactionId: string = "";
  paymentDate: Date | null = null;
  electronicSignature: string = "";
  cardNumber: string = "";
  cardExpiry: string = "";
  cardCvv: string = "";

  selectPayment(method: string) {
    this.selectedPayment = method;
  }

  // Calcul commission selon rôle
  calculateCommission() {
    if (this.role === 'PARTICULIER') {
      this.commissionRate = 2; // ex. entre 1 et 3 %
    } else if (this.role === 'PROFESSIONNEL') {
      this.commissionRate = 10; // ex. entre 3 et 15 %
    }
  }

  effectuerPaiement() {
    this.calculateCommission();
    // Simule un paiement réussi
    this.transactionId = 'TX' + Math.floor(Math.random() * 1000000000);
    this.paymentDate = new Date();
    this.electronicSignature = btoa(this.transactionId + "|" + this.paymentDate);
    this.currentStep = 14;
  }

  // Génération du reçu téléchargeable (PDF simple simulé)
  telechargerRecu() {
    const contenu = `
    Reçu de paiement Fibem
    ----------------------------
    Transaction : ${this.transactionId}
    Montant payé : ${this.budgetTotal} ${this.selectedCurrency}
    Méthode : ${this.selectedPayment}
    Date : ${this.paymentDate}
    Signature : ${this.electronicSignature}
  `;
    const blob = new Blob([contenu], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu_${this.transactionId}.txt`;
    a.click();
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


  finish() {
    // Exemple : réinitialiser le process
    console.log("Processus terminé !");
    this.currentStep = 0;

    // ✅ tu peux aussi afficher un message de succès
    alert("Merci ! Votre demande a été finalisée avec succès.");

    // ou rediriger vers une autre page si besoin :
    // this.router.navigate(['/confirmation']);
  }

  nextStep() {
  // 1️⃣ Vérifier si l’étape courante peut avancer
  if (!this.canGoNextStep()) {
    return;
  }

  // 3️⃣ Incrémenter UNE SEULE FOIS
  if (this.currentStep < this.stepsCount - 1) {
    this.currentStep++;

    // Cas particuliers liés à certaines étapes
    if (this.currentStep === 5) {
      this.selectedDocuments = this.requiredDocs[this.role] || [];
    }

    if (this.currentStep === 9 && (!this.budgetTotal || this.budgetTotal === 0)) {
      this.budgetTotal = this.budget ?? this.recapItem.budget;
    }

    if (this.currentStep === 10) {
      this.recapItem.budget = this.budget ?? this.recapItem.budget;
      this.recapItem.currency = this.selectedCurrency ?? this.recapItem.currency;
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
  // Cas spécifique pour l’étape 12
  if (this.currentStep === 12) {
    if (this.role === "PARTICULIER" || this.role === "PROFESSIONNEL") {
      return (
        this.firstName.trim() !== "" &&
        this.accountEmail.trim() !== "" &&
        this.phone.trim() !== "" &&
        this.password.trim() !== "" &&
        this.acceptTerms
      );
    } else if (this.role === "ADMIN") {
      return (
        this.accountEmail.trim() !== "" &&
        this.password.trim() !== "" &&
        this.acceptTerms &&
        this.acceptCommission
      );
    }
    return false; // si aucun rôle valide
  }

  // Autres étapes
  switch (this.currentStep) {
    case 1: return this.projectTitle.trim() !== "";
    case 2: return this.selectedOption !== null;
    case 3: return this.adresseEmail.trim() !== "";
    case 4: return this.budget !== null && this.budget >= 50;
    case 5: return this.phone.trim() !== ""; // tel obligatoire dès l’upload
    case 7: return this.interventionAdresse.trim() !== "";
    case 8: return this.selectedDate !== null;
    case 9: return this.budgetTotal >= 50;
    case 11: return this.userEmail.trim() !== "";
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
    budget: 0,
    currency: "EUR",
    image: "https://avatars.mds.yandex.net/i?id=3a9e6b0e95ea1f5bf262f3a488b2cc42c6f7ab05-8264209-images-thumbs&n=13"
  };

  voirDetail(item: any) {
    console.log("🔎 Détail :", item);
  }

  // Panier en mémoire (peut venir d’un service)
panier: any[] = [];
panierCount: number = 0;

ajouterAuPanier(item: any): void {
  this.panier.push(item);
  this.panierCount = this.panier.length; // 🔥 met à jour le badge
  console.log("Article ajouté au panier:", item);
}

}
