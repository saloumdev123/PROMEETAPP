import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FactureService } from '../../services/facture-service';
import { ClientService } from '../../services/client.service';
import { Invoice } from '../../models/invoice';
import { Client } from '../../models/client';
import autoTable from 'jspdf-autotable';
import { InvoiceStatus } from '../../enums/invoiceStatus';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './facture-component.html',
  styleUrls: ['./facture-component.css'] // ✅ corrigé (styleUrls au lieu de styleUrl)
})

export class FactureComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoices: Invoice[] = [];
  clients: Client[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  filtreStatut = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private factureService: FactureService,
    private pdfService: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFactures();
    this.loadClients();

    // recalcul automatique lors du changement de taux TVA
  this.invoiceForm.get('taxRate')?.valueChanges.subscribe(() => this.recalculerMontant());

  // 🟢 Ajout : recalculer dès qu’on modifie d’autres champs importants
  ['remise', 'port', 'acompte', 'pourcentTva'].forEach(field => {
    this.invoiceForm.get(field)?.valueChanges.subscribe(() => this.recalculerMontant());
  });

    // ⚡ déclenche un premier calcul dès le chargement
  this.recalculerMontant();
}

    // 🧩 Méthode de normalisation à placer ici
  normalizeInvoice(invoice: any): any {
    const numericFields = [
      'baseHt', 'remise', 'mtTva', 'taxRate', 
      'port', 'totalTtc', 'netAPayer', 'acompte'
    ];
    for (const field of numericFields) {
      invoice[field] = Number(invoice[field]) || 0;
    }
    return invoice;
  }
  
/** 💰 Getter utilisé dans le template HTML pour afficher le net à payer **/
get netAPayer(): number {
  return parseFloat(this.invoiceForm.get('netAPayer')?.value || 0);
}
/** 💰 Getter utilisé dans le template HTML pour afficher le total TTC **/
get totalTTC(): number {
  return parseFloat(this.invoiceForm.get('totalTtc')?.value || 0);
}
/** 💰 Getter utilisé dans le template HTML pour afficher le total TVA **/
get totalTVA(): number {
  return parseFloat(this.invoiceForm.get('mtTva')?.value || 0);
}
/** 💰 Getter utilisé dans le template HTML pour afficher le Total HT **/
get baseHT(): number {
  return parseFloat(this.invoiceForm.get('baseHt')?.value || 0);
}
/** ✅ Alias pour compatibilité avec le template (updateTotals = recalculerMontant) **/
updateTotals(): void {
  this.recalculerMontant();
}

downloadPdf(facture: Invoice): void {
  // ⚙️ Forcer le recalcul avant génération
  if (this.invoiceForm && this.invoiceForm.valid) {
    this.recalculerMontant();
  }

  const pdfData = this.normalizeInvoice({
    ...facture,
    baseHT: this.baseHT,
    mtTva: this.totalTVA,
    totalTtc: this.totalTTC,
    netAPayer: this.netAPayer,
  });

  this.pdfService.generateInvoicePdf({
     number: pdfData.number || 'FA 001',
  dateEmission: pdfData.dateEmission || new Date().toISOString().split('T')[0],
  dateEcheance: pdfData.dateEcheance || '',

  // === Infos de l’entreprise ===
  companyName: pdfData.companyName,
  companyAddress: pdfData.companyAddress,
  companyEmail: pdfData.companyEmail,
  companyPhone: pdfData.companyPhone,

  // === Infos du client ===
  clientName: pdfData.clientName,
  clientAddress: pdfData.clientAddress,
  clientEmail: pdfData.clientEmail,
  clientPhone: pdfData.clientPhone,

  // === Montants globaux ===
  baseHT: Number(this.baseHT),
  remise: Number(pdfData.remise || 0),                   // 🔹 ajout
  totalTVA: Number(this.totalTVA),
  taxRate: Number(this.invoiceForm.get('pourcentTva')?.value || 20), // 🔹 ajout
  port: Number(pdfData.port || 0),                       // 🔹 ajout
  totaux: Number(this.baseHT),                           // 🔹 ajout
  totalTTC: Number(this.totalTTC),
  acompte: Number(pdfData.acompte || 0),
  netAPayer: Number(this.netAPayer),

  // === Articles ===
  items: (pdfData.items || []).map((item: any) => ({
    referenceCode: item.referenceCode,
    label: item.label,
    quantity: Number(item.quantity),
    unitPrice: Number(item.unitPrice),
    discountRate: Number(item.discountRate),
    tvaRate: Number(item.tvaRate),
    lineTotal:
      Number(item.quantity) *
      Number(item.unitPrice) *
      (1 - Number(item.discountRate || 0) / 100),
  })),
  });
}


  initForm(): void {
    this.invoiceForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],

      // 🧮 Calculs principaux
      subTotal: [0, Validators.required],
      taxRate: [20],
      taxAmount: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      amountDue: [{ value: 0, disabled: true }],
      baseHt: [0],
      remise: [0],
      mtTva: [0],
      pourcentTva: [20],
      port: [0],
      totaux: [0],
      totalTtc: [0],
      netAPayer: [0],

      // 🧾 Informations générales
      remarque: [''],
      conditionReglement: ['Devis généré depuis le panier (MVP).'],
      bonPourAccord: [true],
      status: [InvoiceStatus.EN_ATTENTE],
      currency: ['EUR'],

      // 🔢 Nouveau : numéro de facture + acompte
      number: ['', Validators.required],
      acompte: [0],

      // 📅 Dates
      dateEmission: [new Date().toISOString().split('T')[0]],
      dateEcheance: [''],

      // 🔖 Référence / devis / paiement
      reference: [''],
      devisNumber: [''],
      paymentMode: ['Virement bancaire'],

      // 👤 Infos client
      clientId: [null, Validators.required],
      clientName: [''],
      clientEmail: [''],
      clientPhone: [''],
      clientAddress: [''],

      // 🏢 Infos société (préremplies SEN FIBEM)
      companyName: ['SEN FIBEM France'],
      companyContact: ['Mr GOMIS Gilbert'],
      companyAddress: ['51 Rue du Grévarin, 27200 Vernon'],
      companyPhone: ['+33 6 05 51 14 32'],
      companyEmail: ['senfibem.paris@outlook.com'],
      companySiret: ['445 374 937 00032'],
      companyApe: ['4332A'],
      companyTvaNumber: ['FR17378128441'],

      // 🧾 Liste des articles
      items: this.fb.array([])
    });
  }

  /** Accès rapide à la liste des articles **/
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  /** ➕ Ajouter un article **/
  addItem(): void {
    const itemGroup = this.fb.group({
      referenceCode: [''],
      label: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      discountRate: [0],
      tvaRate: [20],
      lineTotal: [{ value: 0, disabled: true }]
    });

    itemGroup.valueChanges.subscribe(() => {
      const qte = itemGroup.get('quantity')?.value || 0;
      const price = itemGroup.get('unitPrice')?.value || 0;
      const total = parseFloat((qte * price).toFixed(2));
      itemGroup.patchValue({ lineTotal: total }, { emitEvent: false });
      this.recalculerMontant();
    });

    this.items.push(itemGroup);
  }

  /** ❌ Supprimer un article **/
  removeItem(index: number): void {
    this.items.removeAt(index);
    this.recalculerMontant();
  }

  /** 🔢 Recalcul global des montants **/
  recalculerMontant(): void {
    const subTotal = this.items.controls.reduce(
      (sum, ctrl) => sum + (ctrl.get('lineTotal')?.value || 0),
      0
    );
    const taxRate = this.invoiceForm.get('taxRate')?.value || 0;
    const remise = this.invoiceForm.get('remise')?.value || 0;
    const port = this.invoiceForm.get('port')?.value || 0;
    const acompte = this.invoiceForm.get('acompte')?.value || 0;

    const taxAmount = (subTotal * taxRate) / 100;
    const total = subTotal + taxAmount;
    const netAPayer = total - remise + port - acompte;

    this.invoiceForm.patchValue(
      {
        subTotal: subTotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        total: total.toFixed(2),
        amountDue: netAPayer.toFixed(2),
        baseHt: subTotal.toFixed(2),
        mtTva: taxAmount.toFixed(2),
        totaux: subTotal.toFixed(2),
        totalTtc: total.toFixed(2),
        netAPayer: netAPayer.toFixed(2)
      },
      { emitEvent: false }
    );
  }

  /** 👤 Mise à jour des infos client automatiquement **/
  onClientChange(event: any): void {
    const selectedId = event.target.value;
    const client = this.clients.find((c) => c.id == selectedId);
    if (client) {
      this.invoiceForm.patchValue({
        clientName: client.nom,
        clientEmail: client.email,
        clientPhone: client.telephone,
        clientAddress: client.adresse
      });
    }
  }

  /** 💾 Enregistrement facture **/
  saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const invoice: Invoice = {
      ...this.invoiceForm.getRawValue()
    };

    this.loading = true;
    this.factureService.create(invoice).subscribe({
      next: () => {
        this.successMessage = '✅ Facture enregistrée avec succès !';
        this.errorMessage = '';
        this.invoiceForm.reset();
        this.items.clear();
        this.loadFactures();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || '❌ Erreur lors de la création de la facture.';
        this.loading = false;
      }
    });
  }

  /** 📜 Charger toutes les factures **/
 loadFactures(): void {
  this.factureService.getAll().subscribe({
    next: (data) => {
      console.log('📦 Factures chargées :', data);
      this.invoices = data;
    },
    error: (err) => {
      this.errorMessage = 'Erreur lors du chargement des factures.';
      console.error('Erreur loadFactures:', err);
    }
  });
}

  /** 🔍 Filtrer par statut **/
  filter(): void {
    if (!this.filtreStatut) {
      this.loadFactures();
      return;
    }
    this.factureService.filterByStatut(this.filtreStatut).subscribe({
      next: (data) => (this.invoices = data),
      error: () => (this.errorMessage = 'Erreur de filtrage.')
    });
  }

  /** ⬇️ Télécharger le PDF **/
  telechargerFacture(facture: Invoice): void {
    this.factureService.downloadPdf(facture.id!).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Facture-${facture.number || facture.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Erreur lors du téléchargement du PDF')
    });
  }

  /** 👥 Charger les clients **/
  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: () => (this.errorMessage = 'Erreur lors du chargement des clients.')
    });
  }

 

}
