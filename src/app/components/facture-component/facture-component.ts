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
import { InvoiceService } from '../../services/invoice-service';

@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './facture-component.html',
  styleUrls: ['./facture-component.css'] // ✅ corrigé (styleUrls au lieu de styleUrl)
})

export class FactureComponent implements OnInit {

  invoiceForm!: FormGroup;
  factures: Invoice[] = [];
  clients: Client[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  filtreStatut = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private factureService: FactureService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFactures();
    this.loadClients();

    // 🔄 Recalculer automatiquement les montants
    this.invoiceForm.get('taxRate')?.valueChanges.subscribe(() => this.recalculerMontant());
  }

  /** 🧾 Initialisation du formulaire */
  initForm(): void {
    this.invoiceForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      subTotal: [0, Validators.required],
      taxRate: [18],
      taxAmount: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }],
      amountDue: [{ value: 0, disabled: true }],

      clientId: [null, Validators.required],
      nomClient: [''],
      emailClient: [''],
      telephoneClient: [''],
      adresseClient: [''],

      // 💼 Informations facture
      dateEmission: [new Date().toISOString().split('T')[0]],
      dateEcheance: [''],
      reference: [''],
      devisNumber: [''],
      paymentMode: ['Virement bancaire'],

      // 🏢 Informations société (pré-remplies FIBEM)
      companyName: ['SEN FIBEM France'],
      companyContact: ['Mr GOMIS Gilbert'],
      companyAddress: ['51 Rue du Grévarin, 27200 Vernon'],
      companyPhone: ['+33 6 05 51 14 32'],
      companyEmail: ['senfibem.paris@outlook.com'],
      companySiret: ['445 374 937 00032'],
      companyApe: ['4332A'],
      companyTvaNumber: ['FR00 445 374 937'],

      // 🧾 Liste d'articles
      items: this.fb.array([])
    });
  }

  /** Getter pratique */
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  /** ➕ Ajouter un article */
  addItem(): void {
    const itemGroup = this.fb.group({
      referenceCode: [''],
      label: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      discountRate: [0],
      tvaRate: [18],
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

  /** ❌ Supprimer un article */
  removeItem(index: number): void {
    this.items.removeAt(index);
    this.recalculerMontant();
  }

  /** 🧮 Recalcul automatique des montants */
  recalculerMontant(): void {
    const subTotal = this.items.controls.reduce((sum, ctrl) => {
      const total = ctrl.get('lineTotal')?.value || 0;
      return sum + total;
    }, 0);

    const taxRate = this.invoiceForm.get('taxRate')?.value || 0;
    const taxAmount = (subTotal * taxRate) / 100;
    const total = subTotal + taxAmount;

    this.invoiceForm.patchValue(
      {
        subTotal: parseFloat(subTotal.toFixed(2)),
        taxAmount: parseFloat(taxAmount.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        amountDue: parseFloat(total.toFixed(2))
      },
      { emitEvent: false }
    );
  }

  /** 👤 Sélection client */
  onClientChange(event: any): void {
    const selectedId = event.target.value;
    const client = this.clients.find(c => c.id == selectedId);
    if (client) {
      this.invoiceForm.patchValue({
        nomClient: client.nom,
        emailClient: client.email,
        telephoneClient: client.telephone,
        adresseClient: client.adresse
      });
    }
  }

  /** 💾 Enregistrer la facture */
  saveInvoice(): void {
    if (this.invoiceForm.invalid) {
      this.errorMessage = 'Veuillez remplir correctement le formulaire.';
      return;
    }

    const invoice: Invoice = {
      title: this.invoiceForm.value.titre,
      description: this.invoiceForm.value.description,
      subTotal: this.invoiceForm.getRawValue().subTotal,
      taxAmount: this.invoiceForm.getRawValue().taxAmount,
      total: this.invoiceForm.getRawValue().total,
      amountDue: this.invoiceForm.getRawValue().amountDue,
      dueDate: this.invoiceForm.value.dateEcheance,
      issueDate: this.invoiceForm.value.dateEmission,
      currency: 'XOF',
      paymentMode: this.invoiceForm.value.paymentMode,
      reference: this.invoiceForm.value.reference,
      devisNumber: this.invoiceForm.value.devisNumber,
      status: InvoiceStatus.EN_ATTENTE,
      clientName: this.invoiceForm.value.nomClient,
      clientEmail: this.invoiceForm.value.emailClient,
      clientAddress: this.invoiceForm.value.adresseClient,
      clientPhone: this.invoiceForm.value.telephoneClient,
      companyName: this.invoiceForm.value.companyName,
      companyContact: this.invoiceForm.value.companyContact,
      companyAddress: this.invoiceForm.value.companyAddress,
      companyPhone: this.invoiceForm.value.companyPhone,
      companyEmail: this.invoiceForm.value.companyEmail,
      companySiret: this.invoiceForm.value.companySiret,
      companyApe: this.invoiceForm.value.companyApe,
      companyTvaNumber: this.invoiceForm.value.companyTvaNumber,
      items: this.invoiceForm.getRawValue().items
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
        this.errorMessage = err?.error?.message || '❌ Erreur lors de la création de la facture.';
        this.loading = false;
      }
    });
  }

  /** 📦 Charger les factures */
  loadFactures(): void {
    this.factureService.getAll().subscribe({
      next: (data) => (this.factures = data),
      error: () => (this.errorMessage = 'Erreur lors du chargement des factures.')
    });
  }

  /** 🔍 Filtrer */
  filter(): void {
    if (!this.filtreStatut) {
      this.loadFactures();
      return;
    }
    this.factureService.filterByStatut(this.filtreStatut).subscribe({
      next: (data) => (this.factures = data),
      error: () => (this.errorMessage = 'Erreur de filtrage.')
    });
  }

  /** ⬇️ Télécharger le PDF */
  telechargerFacture(facture: Invoice): void {
    this.factureService.downloadPdf(facture.id!).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Facture-${facture.title}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => alert('Erreur lors du téléchargement du PDF')
    });
  }

  /** 🔁 Charger les clients */
  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => {
        console.error('❌ Erreur lors du chargement des clients :', err);
        this.errorMessage = 'Erreur lors du chargement des clients.';
      }
    });
  }
}
