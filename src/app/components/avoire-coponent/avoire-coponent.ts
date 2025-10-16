import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InvoiceStatus } from '../../enums/invoiceStatus';
import { Client } from '../../models/client';
import { AvoirService } from '../../services/avoirService';
import { ClientService } from '../../services/client.service';
import { PdfGeneratorServiceAvoir } from '../../services/pdf-generator-service-avoir';


@Component({
  selector: 'app-avoire-coponent',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './avoire-coponent.html',
  styleUrls: ['./avoire-coponent.css']
})
export class AvoireCoponent implements OnInit {
  avoirForm!: FormGroup;
  avoirs: any[] = [];
  clients: Client[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private avoirService: AvoirService,
    private pdfGeneratoreAvoirService: PdfGeneratorServiceAvoir
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadAvoirs();
    this.loadClients();
['remise', 'port', 'acompte', 'taxRate'].forEach(field => {
    this.avoirForm.get(field)?.valueChanges.subscribe(() => this.recalculerMontant());
  });
     this.avoirForm.get('taxRate')?.valueChanges.subscribe(() => this.recalculerMontant());
  this.avoirForm.get('remise')?.valueChanges.subscribe(() => this.recalculerMontant());
  this.avoirForm.get('port')?.valueChanges.subscribe(() => this.recalculerMontant());
  }

  initForm(): void {
    this.avoirForm = this.fb.group({
      titre: ['Avoir', Validators.required],
      number: ['', Validators.required],
      referenceFacture: [''],
      description: [''],
      paymentMode: ['Remboursement (Avoir)'],
      tauxEuro: [6.55957],

      subTotal: [0],
      taxRate: [20],
      mtTva: [0],
      totalTtc: [0],
      netAPayer: [0],
      remise: [0],
      port: [0],
      remarque: [''],
      baseHt: [0],


      dateEmission: [new Date().toISOString().split('T')[0]],
      dateEcheance: [''],
  
      status: [InvoiceStatus.EN_ATTENTE],

      clientId: [null, Validators.required],
      companyName: ['CALISTA'],
      companyContact: ['Mr Albert Basse'],
      companyAddress: ['2-2 bis rue Pierre de Ronsard, 78200 Mantes-la-Jolie'],
      companyPhone: ['07.49.15.06.65'],
      companyMobile: ['07.49.15.06.65'],
      companyEmail: ['calista.basse@gmail.com'],
      companySiret: ['522 327 824 00010'],
      companyApe: ['4334Z Travaux de CARRELAGE et vitrerie'],
      companyTva: ['FR88522327824'],
      companyDirigeant: ['Mr Albert Basse'],
      companyLogo: ['assets/images/calista-logo.png'], // chemin local du logo


      items: this.fb.array([])
    });
  }

updateTotals(): void {
  this.recalculerMontant();
}

  get items(): FormArray {
    return this.avoirForm.get('items') as FormArray;
  }
addItem(): void {
  const itemGroup = this.fb.group({
    referenceCode: [''],
    label: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
    unitPrice: [0, [Validators.required, Validators.min(0)]],
    discountRate: [0],
    tvaRate: [20],
    lineTotal: [0],
  });

  // 🔁 Abonnement pour calcul automatique
  itemGroup.valueChanges.subscribe(() => {
    const quantity = itemGroup.get('quantity')?.value || 0;
    const unitPrice = itemGroup.get('unitPrice')?.value || 0;
    const discount = itemGroup.get('discountRate')?.value || 0;
    const tvaRate = itemGroup.get('tvaRate')?.value || 0;

    // 🔹 Montant HT après remise
    const ht = quantity * unitPrice * (1 - discount / 100);

    // 🔹 Montant TTC (ajout de la TVA)
    const total = ht + (ht * tvaRate / 100);

    // 🔹 Mise à jour du total de la ligne
    itemGroup.patchValue({ lineTotal: total }, { emitEvent: false });

    this.recalculerMontant();
  });

  // ✅ Ajout du nouvel article dans le FormArray
  this.items.push(itemGroup);

  // ✅ Mise à jour immédiate des montants globaux
  this.recalculerMontant();
}



  removeItem(i: number): void {
    this.items.removeAt(i);
    this.recalculerMontant();
  }

recalculerMontant(): void {
  const subTotal = this.items.controls.reduce(
    (sum, ctrl) => sum + (ctrl.get('lineTotal')?.value || 0),
    0
  );

  const taxRate = this.avoirForm.get('taxRate')?.value || 0;
  const remise = this.avoirForm.get('remise')?.value || 0;
  const port = this.avoirForm.get('port')?.value || 0;
  const acompte = this.avoirForm.get('acompte')?.value || 0;

  const taxAmount = (subTotal * taxRate) / 100;
  const total = subTotal + taxAmount;
  const netAPayer = total - remise + port - acompte;

  this.avoirForm.patchValue(
    {
      subTotal: subTotal.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      total: total.toFixed(2),
      baseHt: subTotal.toFixed(2),
      mtTva: taxAmount.toFixed(2),
      totalTtc: total.toFixed(2),
      netAPayer: netAPayer.toFixed(2),
      totaux: subTotal.toFixed(2),
    },
    { emitEvent: false }
  );
}



  onClientChange(event: any): void {
    const client = this.clients.find(c => c.id == event.target.value);
    if (client) {
      this.avoirForm.patchValue({
        clientName: client.nom,
        clientEmail: client.email,
        clientPhone: client.telephone,
        clientAddress: client.adresse
      });
    }
  }

  saveAvoir(): void {
  if (this.avoirForm.invalid) {
    this.errorMessage = 'Veuillez remplir correctement le formulaire.';
    return;
  }

  // ✅ Récupération complète avec items
  const data = this.avoirForm.getRawValue();

  if (!data.items || data.items.length === 0) {
    this.errorMessage = 'Veuillez ajouter au moins un article.';
    return;
  }

  this.loading = true;

  this.avoirService.create(data).subscribe({
    next: () => {
      this.successMessage = '✅ Avoir enregistré avec succès !';
      // ⚠️ Ne pas effacer tout de suite le formulaire si tu veux générer le PDF
      this.loadAvoirs();
      this.loading = false;
    },
    error: (err) => {
      this.errorMessage = err?.error?.message || '❌ Erreur lors de la création de l’avoir.';
      this.loading = false;
    }
  });
}

  loadAvoirs(): void {
    this.avoirService.getAll().subscribe({
      next: (data) => (this.avoirs = data),
      error: () => (this.errorMessage = 'Erreur lors du chargement des avoirs.')
    });
  }

  downloadPdf(id: number): void {
    const avoir = this.avoirs.find(a => a.id === id);
    if (avoir) this.pdfGeneratoreAvoirService.generateAvoirPdf(avoir);
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: () => (this.errorMessage = 'Erreur lors du chargement des clients.')
    });
  }
}
