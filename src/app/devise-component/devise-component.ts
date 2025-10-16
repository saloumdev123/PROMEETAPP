import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fourniture } from '../models/fourniture';
import { TypeFourniture } from '../enums/typeFourniture';
import { DevisService } from '../services/deviseService';
import { FournitureService } from '../services/fournitureService';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PdfGeneratorServiceDevis } from '../services/pdf-generator-service-devis';
import { Devis } from '../models/devise';
import { LigneOuvrageService } from '../services/ligneOuvrageService';

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

@Component({
  selector: 'app-devise-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './devise-component.html',
  styleUrls: ['./devise-component.css']

})

export class DevisComponent implements OnInit {
  devisForm: FormGroup;
  listeDevis: Devis[] = [];

  constructor(
    private fb: FormBuilder,
    private pdfService: PdfGeneratorServiceDevis,
    private devisService: DevisService,
    private ligneOuvrageService: LigneOuvrageService
  ) {
    this.devisForm = this.fb.group({
      number: ['', Validators.required],
      clientName: ['', Validators.required],
      dateEmission: ['', Validators.required],

      // 🆕 Champs pour la section "Poste à Pourvoir"
      posteTitle: ['', Validators.required],
      descriptionPoste: ['', Validators.required],
      assistanceTechnique: ['', Validators.required],
      profil: ['', Validators.required],
      travaux: this.fb.array([this.createLigne()]),
      lignesOuvrages: this.fb.array([this.createLigneOuvrage()])
    });
  }
  ngOnInit(): void {
    // Tu peux éventuellement charger des devis ici plus tard si besoin
    console.log('DevisComponent initialisé');
    this.recupererTousLesDevis();
  }

  get travaux(): FormArray {
    return this.devisForm.get('travaux') as FormArray;
  }
  recupererTousLesDevis(): void {
    this.devisService.getAll().subscribe({
      next: (data) => {
        this.listeDevis = data;
        console.log('📄 Devis récupérés depuis le backend :', data);
      },
      error: (err) => {
        console.error('❌ Erreur lors du chargement des devis :', err);
      }
    });
  }

  createLigne(): FormGroup {
    return this.fb.group({
      description: [''],
      montant: [0]
    });
  }

  addLigne() {
    this.travaux.push(this.createLigne());
  }

  removeLigne(index: number) {
    this.travaux.removeAt(index);
  }


  generatePdf(): void {
    if (this.devisForm.valid) {
      const devis = this.devisForm.value;
      const travaux = this.travaux.value;
      const totalHT = this.totalHT;

      this.pdfService.generateDevisPDF(
        devis,
        travaux,
        totalHT,
        this.clientSignature as string,   // 👈 on transmet la signature client
        this.companySignature as string   // 👈 et celle de l’entreprise
      );
    } else {
      alert('⚠️ Veuillez remplir tous les champs obligatoires avant de générer le PDF.');
    }
  }


  onSubmit(): void {
    if (this.devisForm.valid) {
      const devis = this.devisForm.value;
      const lignes = this.lignesOuvrages().value;
      const travaux = this.travaux.value;
      const totalHT = this.totalHT;

      // 🟢 Étape 1 : Enregistrer le devis
      this.devisService.create(devis).subscribe({
        next: (savedDevis) => {
          console.log('✅ Devis enregistré avec succès :', savedDevis);

          // 🟡 Étape 2 : Enregistrer chaque ligne d’ouvrage associée au devis
          lignes.forEach((ligne: any) => {
            const ligneToSave = {
              ...ligne,
              devisId: savedDevis.id // 🔗 liaison entre la ligne et le devis
            };

            this.ligneOuvrageService.create(ligneToSave).subscribe({
              next: (savedLigne) => {
                console.log('📄 Ligne enregistrée :', savedLigne);
              },
              error: (err) => {
                console.error('❌ Erreur lors de l’enregistrement d’une ligne :', err);
              }
            });
          });

          // 🟢 Étape 3 : Génération du PDF après enregistrement
          this.pdfService.generateDevisPDF(
            devis,
            lignes,
            totalHT,
            this.clientSignature as string,
            this.companySignature as string
          );

          alert('✅ Devis et lignes enregistrés, PDF généré avec succès !');
        },
        error: (err) => {
          console.error('❌ Erreur lors de la sauvegarde du devis :', err);
          alert('❌ Une erreur est survenue lors de la sauvegarde du devis.');
        }
      });
    } else {
      alert('⚠️ Veuillez remplir tous les champs obligatoires avant de soumettre le devis.');
    }
  }



  save(): void {
    if (this.devisForm.valid) {
      const devis = this.devisForm.value;
      const travaux = this.travaux.value;
      const totalHT = this.totalHT;

      // 🟢 Même logique que onSubmit(), mais sans alert de succès
      this.devisService.create(devis).subscribe({
        next: () => {
          this.pdfService.generateDevisPDF(
            devis,
            travaux,
            totalHT,
            this.clientSignature as string,
            this.companySignature as string
          );
        },
        error: (err) => {
          console.error('❌ Erreur lors de la sauvegarde du devis :', err);
        }
      });
    } else {
      alert('⚠️ Veuillez remplir tous les champs obligatoires.');
    }
  }


  // === Télécharger un PDF existant ===
  telechargerPdf(devis: Devis): void {
    const travaux = devis.travaux || [];
    const totalHT = devis.totalHt || 0;

    this.pdfService.generateDevisPDF(devis, travaux, totalHT);
  }
  clientSignature: string | ArrayBuffer | null = null;
  companySignature: string | ArrayBuffer | null = null;

  onClientSignatureSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.clientSignature = reader.result as string;
        console.log("✅ Signature client chargée");
      };
      reader.readAsDataURL(file);
    }
  }

  onCompanySignatureSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.companySignature = reader.result as string;
        console.log("✅ Signature entreprise chargée");
      };
      reader.readAsDataURL(file);
    }
  }

  updateMontant(i: number): void {
    const ligne = this.lignesOuvrages().at(i);
    const prix = ligne.get('prixUnitaireHT')?.value || 0;
    const qte = ligne.get('quantite')?.value || 0;
    ligne.get('montantTotalHT')?.setValue(prix * qte);
  }
  lignesOuvrages(): FormArray {
    return this.devisForm.get('lignesOuvrages') as FormArray;
  }

  createLigneOuvrage(): FormGroup {
    return this.fb.group({
      tempsMO: [''],
      designation: [''],
      unite: ['u'],
      prixUnitaireHT: [0],
      quantite: [1],
      montantTotalHT: [0],
      tpsTotal: ['']
    });
  }

  addLigneOuvrage(): void {
    this.lignesOuvrages().push(this.createLigneOuvrage());
  }

  removeLigneOuvrage(i: number): void {
    this.lignesOuvrages().removeAt(i);
  }

  get totalTravauxHT(): number {
    return this.travaux.value.reduce(
      (sum: number, t: any) => sum + (Number(t.montant) || 0),
      0
    );
  }

  get totalOuvragesHT(): number {
    return this.lignesOuvrages().value.reduce(
      (sum: number, l: any) => sum + (Number(l.montantTotalHT) || 0),
      0
    );
  }

  get totalHT(): number {
    return Number((this.totalTravauxHT + this.totalOuvragesHT).toFixed(2));
  }


}
