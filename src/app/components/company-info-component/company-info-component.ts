import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyInfo } from '../../models/document.model';
import { CompanyInfoService } from '../../services/company-info-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-info-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './company-info-component.html',
  styleUrls: ['./company-info-component.css']
})
export class CompanyInfoComponent {

  companyInfos: CompanyInfo[] = [];
  form!: FormGroup;
  adding = false;
  editing = false;
  selectedCompany: CompanyInfo | null = null;
  loading = false;

  logoFile?: File;
  logoPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyInfoService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCompanies();
  }

  /** 📁 Sélection du logo */
  onLogoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];

      if (!['image/png', 'image/jpeg'].includes(this.logoFile.type)) {
        alert('Veuillez importer une image PNG ou JPEG uniquement.');
        this.logoFile = undefined;
        this.logoPreview = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(this.logoFile);
    }
  }

  /** 🧩 Initialisation du formulaire */
  private initForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      address: [''],
      phone1: ['', Validators.required],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      siret: ['', Validators.required],
      codeApe: [''],
      tvaNumber: [''],
      director: [''],
      logoUrl: ['']
    });
  }

  /** 📦 Charger les entreprises depuis le backend */
  loadCompanies(): void {
    this.loading = true;
    this.companyService.getAll().subscribe({
      next: (data) => {
        this.companyInfos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sociétés:', err);
        this.loading = false;
        alert('Impossible de charger les entreprises. Vérifiez la connexion au serveur.');
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

  /** 💾 Sauvegarder les données */
  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const company = this.form.value as CompanyInfo;
  console.log('➡️ Données envoyées au backend:', company);
    if (this.editing && this.selectedCompany) {
      // 🔄 Mise à jour
      this.companyService.update(this.selectedCompany.id!, company).subscribe({
        next: (updated) => {
          const index = this.companyInfos.findIndex(c => c.id === updated.id);
          if (index !== -1) this.companyInfos[index] = updated;
          this.cancel();
        },
        error: (err) => console.error('Erreur lors de la mise à jour:', err)
      });
    } else {
      // ➕ Création
      this.companyService.create(company).subscribe({
        next: (created) => {
          this.companyInfos.push(created);
          this.cancel();
        },
        error: (err) => console.error('Erreur lors de la création:', err)
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
          this.companyInfos = this.companyInfos.filter(c => c.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression:', err)
      });
    }
  }

}
