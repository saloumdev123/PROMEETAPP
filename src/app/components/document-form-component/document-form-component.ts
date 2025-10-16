import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyInfoService } from '../../services/company-info-service';
import { ClientInfoService } from '../../services/client-info-service';
import { ClientInfo, CompanyInfo } from '../../models/document.model';



@Component({
  selector: 'app-document-form-component',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule, FormsModule],
  templateUrl: './document-form-component.html',
  styleUrls: ['./document-form-component.css']
})
export class DocumentFormComponent implements OnInit {

   documentForm!: FormGroup; 
 companies: CompanyInfo[] = [];
 clients: ClientInfo[] = [];
  form!: FormGroup;
  adding = false;
  editing = false;
  selectedCompany: CompanyInfo | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private companyService: CompanyInfoService,
    private clientService: ClientInfoService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCompanies();
    this.loadClients();
  }

    private initForm(): void {
    this.documentForm = this.fb.group({
      documentType: ['', Validators.required],
      company: ['', Validators.required],
      client: ['', Validators.required],
      documentNumber: ['', Validators.required],
      documentDate: ['', Validators.required],
      reference: [''],
      modeReglement: [''],
      echeance: [''],
      tauxEuro: [1],
      remiseGlobale: [0],
      tauxTva: [20],
      remarks: [''],
      items: this.fb.array([this.createItem()])
    });
  }
  /** 👥 Charger les clients */
  private loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('Erreur de chargement des clients', err)
    });
  }
   /** 🧩 Crée une ligne d’article/service */
  private createItem(): FormGroup {
    return this.fb.group({
      reference: [''],
      designation: ['', Validators.required],
      nb_heures: [0, Validators.min(0)],
      pu_ht: [0, Validators.min(0)],
      remise_percent: [0, Validators.min(0)],
      montant_ht: [0],
      tva: [0]
    });
  }
  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }
    /** ➕ Ajouter une ligne d’article */
  addItem(): void {
    this.items.push(this.createItem());
  }

   get items(): FormArray {
    return this.documentForm.get('items') as FormArray;
  }

   /** 🧮 Calcul du total pour chaque ligne */
  calculateItemTotal(index: number): void {
    const item = this.items.at(index);
    const { nb_heures, pu_ht, remise_percent } = item.value;

    const totalBrut = nb_heures * pu_ht;
    const remise = (remise_percent / 100) * totalBrut;
    const montant_ht = totalBrut - remise;
    const tva = montant_ht * (this.documentForm.value.tauxTva / 100);

    item.patchValue({ montant_ht, tva }, { emitEvent: false });
  }

  /** 🧾 Calcul des totaux généraux */
  calculateTotals() {
    let totalHT = 0;
    let totalTVA = 0;

    this.items.controls.forEach((item) => {
      totalHT += item.value.montant_ht || 0;
      totalTVA += item.value.tva || 0;
    });

    const totalTTC = totalHT + totalTVA;
    return { totalHT, totalTVA, totalTTC };
  }

  /** 📦 Chargement depuis le backend */
  loadCompanies(): void {
    this.loading = true;
    this.companyService.getAll().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des entreprises', err);
        this.loading = false;
      }
    });
  }

  /** ➕ Ajouter une entreprise */
  startAdding(): void {
    this.adding = true;
    this.editing = false;
    this.form.reset();
  }

  /** ✏️ Modifier une entreprise */
  startEditing(company: CompanyInfo): void {
    this.adding = false;
    this.editing = true;
    this.selectedCompany = company;
    this.form.patchValue(company);
  }

  /** 💾 Sauvegarder (création ou mise à jour) */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const company = this.form.value;

    if (this.editing && this.selectedCompany) {
      // 🔄 Mise à jour
      this.companyService.update(this.selectedCompany.id!, company).subscribe({
        next: () => {
          alert('✅ Société mise à jour avec succès !');
          this.loadCompanies();
          this.cancel();
        },
        error: (err) => console.error('Erreur lors de la mise à jour', err)
      });
    } else {
      // ➕ Création
      this.companyService.create(company).subscribe({
        next: () => {
          alert('✅ Société ajoutée avec succès !');
          this.loadCompanies();
          this.cancel();
        },
        error: (err) => console.error('Erreur lors de la création', err)
      });
    }
  }

  /** ❌ Annuler */
  cancel(): void {
    this.adding = false;
    this.editing = false;
    this.selectedCompany = null;
    this.form.reset();
  }

  /** 🗑️ Supprimer une entreprise */
  delete(id: number): void {
    if (confirm('Voulez-vous supprimer cette entreprise ?')) {
      this.companyService.delete(id).subscribe({
        next: () => {
          alert('🗑️ Société supprimée');
          this.loadCompanies();
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

   /** 💾 Enregistrer le document */
  saveDocument(): void {
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    const formData = this.documentForm.value;
    console.log('✅ Données du document :', formData);

    // Tu pourras ensuite envoyer formData vers ton backend ici
    alert('✅ Document sauvegardé avec succès !');
  }
}
