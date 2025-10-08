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
  devisForm!: FormGroup;
  devisList: any[] = [];
  fournitures: Fourniture[] = [];
  typeOptions = Object.values(TypeFourniture);
  montantTVA: number = 0;

  constructor(
    private fb: FormBuilder,
    private devisService: DevisService,
    private fournitureService: FournitureService
  ) { }

ngOnInit(): void {
  this.initForm();
  this.loadDevis();
  this.loadFournitures();

  // 🔹 Recalcul automatique dès qu’une ligne, une fourniture, ou une donnée change
  this.devisForm.valueChanges.subscribe(() => {
    this.updateTotals();
  });

  // 🔹 Recalcul immédiat quand la TVA (%) est modifiée manuellement
  this.devisForm.get('tva')?.valueChanges.subscribe(() => {
    this.updateTotals();
  });
}

  /** 🧾 Initialisation du formulaire */
  initForm(): void {
    this.devisForm = this.fb.group({
      numero: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      clientNom: ['', Validators.required],
      clientAdresse: [''],
      clientVille: [''],
      clientTel: [''],
      description: [''],
      totalHT: [0],
      tva: [18],
      totalTTC: [0],
      lignes: this.fb.array([]),
      fournitures: this.fb.array([])
    });
  }

  /** ⚙️ Getters pour simplifier le code HTML */
  get lignes(): FormArray {
    return this.devisForm.get('lignes') as FormArray;
  }

  get fournituresArray(): FormArray {
    return this.devisForm.get('fournitures') as FormArray;
  }

  /** ➕ Ajouter une ligne */
  addLigne(): void {
    const ligne = this.fb.group({
      designation: ['', Validators.required],
      quantite: [1, [Validators.required, Validators.min(1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0]
    });

    ligne.valueChanges.subscribe(() => this.updateTotals());
    this.lignes.push(ligne);
  }

  /** ➕ Ajouter une fourniture */
  addFourniture(): void {
    const fourniture = this.fb.group({
      designation: ['', Validators.required],
      unite: [''],
      quantite: [0, [Validators.required, Validators.min(0.1)]],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      montantTotal: [0],
      type: ['POSEUR']
    });

    fourniture.valueChanges.subscribe(() => this.updateTotals());
    this.fournituresArray.push(fourniture);
  }

  /** 🔄 Charger les devis */
  loadDevis(): void {
    this.devisService.getAll().subscribe({
      next: (data) => (this.devisList = data),
      error: (err) => console.error('Erreur chargement devis', err)
    });
  }

  /** 🔄 Charger les fournitures */
  loadFournitures(): void {
    this.fournitureService.getAll().subscribe({
      next: (data) => (this.fournitures = data),
      error: (err) => console.error('Erreur chargement fournitures', err)
    });
  }

  /** 🧮 Calcul des totaux */
updateTotals(): void {
  const lignes = this.lignes.controls;
  const fournitures = this.fournituresArray.controls;
  let totalHT = 0;

  // 🔹 Calcul total des lignes
  lignes.forEach((ctrl) => {
    const qte = +ctrl.get('quantite')?.value || 0;
    const prix = +ctrl.get('prixUnitaire')?.value || 0;
    const montant = qte * prix;
    ctrl.patchValue({ montantTotal: parseFloat(montant.toFixed(2)) }, { emitEvent: false });
    totalHT += montant;
  });

  // 🔹 Calcul total des fournitures
  fournitures.forEach((ctrl) => {
    const qte = +ctrl.get('quantite')?.value || 0;
    const prix = +ctrl.get('prixUnitaire')?.value || 0;
    const montant = qte * prix;
    ctrl.patchValue({ montantTotal: parseFloat(montant.toFixed(2)) }, { emitEvent: false });
    totalHT += montant;
  });

  // 🔹 Calcul de la TVA et du TTC
  const tva = +this.devisForm.get('tva')?.value || 0;
  this.montantTVA = +(totalHT * (tva / 100)).toFixed(2); // 💰 enregistre le montant de la TVA
  const totalTTC = totalHT + this.montantTVA;

  // 🔹 Mise à jour du formulaire
  this.devisForm.patchValue(
    {
      totalHT: parseFloat(totalHT.toFixed(2)),
      totalTTC: parseFloat(totalTTC.toFixed(2))
    },
    { emitEvent: false }
  );
}




  /** 💾 Sauvegarde du devis */
  save(): void {
    if (this.devisForm.invalid) return;

    this.updateTotals();

    this.devisService.create(this.devisForm.value).subscribe({
      next: () => {
        alert('✅ Devis enregistré avec succès');
        this.loadDevis();
        this.generatePDF(this.devisForm.value);
        this.devisForm.reset();
        this.lignes.clear();
        this.fournituresArray.clear();
      },
      error: (err) => console.error('Erreur création devis', err)
    });
  }

  /** 🧾 Génération du PDF */
  /** 🧾 Génération du PDF format FIBEM France complet */
  generatePDF(devis: any): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // === LOGO + COULEUR BLEUE POUR TITRE ===
    const logo = new Image();
    logo.src = 'assets/images/logofibem.png';
    doc.addImage(logo, 'PNG', 150, 10, 45, 25); // logo à droite

    doc.setTextColor(0, 102, 204); // bleu FIBEM
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('SEN FIBEM France', 15, 20);

    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Mr GOMIS', 15, 26);
    doc.text('51 Rue du Grévarin – 27200 Vernon', 15, 31);
    doc.text('Tél. : +33 6 05 51 14 32', 15, 36);
    doc.text('Email : senfibem.paris@outlook.com', 15, 41);
    doc.text('SIRET : 445 374 937 00032', 15, 46);
    doc.text('Code APE : 4120B Travaux Bâtiment & Industrie', 15, 51);
    doc.text('N° TVA : FR17378128441', 15, 56);

    // === CADRE "DEVIS" ===
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(140, 45, 55, 20);
    doc.setFont('helvetica', 'bold');
    doc.text('DEVIS EN EURO', 145, 52);
    doc.text(`N° ${devis.numero}`, 145, 58);

    // === TABLEAU D’INFOS (même largeur que le cadre devis) ===
    autoTable(doc, {
      startY: 65,
      head: [['DATE', 'CLIENT', 'PAGE']],
      body: [[devis.date, devis.clientNom || '', '1/1']],
      theme: 'grid',
      styles: { fontSize: 10, halign: 'center', lineColor: [0, 0, 0], lineWidth: 0.2 },
      headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: 'bold' },
      tableWidth: 55,
      margin: { left: 140 }
    });

    // === INFORMATIONS CLIENT ===
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT', 15, finalY);
    doc.setFont('helvetica', 'normal');
    finalY += 6;
    doc.text(`${devis.clientNom || ''}`, 15, finalY);
    if (devis.clientAdresse) doc.text(`Adresse : ${devis.clientAdresse}`, 15, finalY + 5);
    if (devis.clientVille) doc.text(`Ville : ${devis.clientVille}`, 15, finalY + 10);
    if (devis.clientTel) doc.text(`Téléphone : ${devis.clientTel}`, 15, finalY + 15);

    // === TABLEAU DES LIGNES ===
    const startTableY = finalY + 25;
    autoTable(doc, {
      startY: startTableY,
      head: [['Désignation', 'Quantité', 'Prix Unitaire (€)', 'Montant Total (€)']],
      body: devis.lignes.map((l: any) => [
        l.designation,
        l.quantite,
        l.prixUnitaire.toFixed(2),
        (l.quantite * l.prixUnitaire).toFixed(2)
      ]),
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 2, lineColor: [0, 0, 0], lineWidth: 0.2 },
      headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: 'bold' },
      columnStyles: { 0: { cellWidth: 90 }, 1: { cellWidth: 25 }, 2: { cellWidth: 35 }, 3: { cellWidth: 35 } },
      margin: { left: 15, right: 15 }
    });

    const endTableY = (doc as any).lastAutoTable.finalY + 10;

    // === TABLEAU DES TOTAUX À DROITE ===
    autoTable(doc, {
      startY: endTableY,
      head: [['Total HT (€)', 'TVA (%)', 'Total TTC (€)']],
      body: [[
        devis.totalHT.toFixed(2),
        `${devis.tva}%`,
        devis.totalTTC.toFixed(2)
      ]],
      theme: 'grid',
      styles: { fontSize: 11, halign: 'center', lineColor: [0, 0, 0], lineWidth: 0.2 },
      headStyles: { fillColor: [220, 220, 220], textColor: 0, fontStyle: 'bold' },
      tableWidth: 100,
      margin: { left: 95 }
    });

    // === FOOTER ===
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text(
      'SEN FIBEM France · 51 Rue du Grévarin – 27200 Vernon · Email : senfibem.paris@outlook.com · SIRET : 445 374 937 00032',
      15,
      pageHeight - 10
    );

    // === SAUVEGARDE ===
    doc.save(`Devis_${devis.numero}.pdf`);
  }




  /** ❌ Suppression */
  deleteDevis(id: number): void {
    if (confirm('Voulez-vous supprimer ce devis ?')) {
      this.devisService.delete(id).subscribe({
        next: () => this.loadDevis(),
        error: (err) => console.error('Erreur suppression', err)
      });
    }
  }
}
