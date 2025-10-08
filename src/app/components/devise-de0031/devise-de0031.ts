import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DevisDe0031 } from '../../models/deviseDe0031';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DevisDe0031Service } from '../../services/deviseDe0031.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { Entreprise } from '../../models/entreprise';
import { LigneDevisDe0031 } from '../../models/ligneDeviseDe0031';
import { take } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-devise-de0031',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './devise-de0031.html',
  styleUrl: './devise-de0031.css'
})
export class DeviseDe0031 implements OnInit {
@ViewChild('previewArea', { static: false }) previewArea!: ElementRef<HTMLDivElement>;

  devisForm!: FormGroup;
  clients: Client[] = [];
  isLoading = true;
  isSaving = false;

  logoPath = '/assets/images/logofibem.png'; // chemin par défaut
get clientGroup(): FormGroup {
  return this.devisForm.get('client') as FormGroup;
}

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private devisService: DevisDe0031Service,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.loadDevis(id);
    } else {
      this.patchDefaultValues();
      this.isLoading = false;
    }

    // recalculer totaux automatiquement
    this.devisForm.valueChanges.subscribe(() => this.updateTotals());
  }

  private initForm(): void {
    this.devisForm = this.fb.group({
      id: [null],
      numero: ['DE 0031', Validators.required],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      devise: ['EUR'],
      entreprise: this.fb.group({
        id: [null],
        nom: ['SEN FIBEM France', Validators.required],
        responsable: ['Mr GOMIS Gilbert'],
        adresse: ['51 Rue du Grévarin'],
        codePostalVille: ['27200 Vernon'],
        telephone: ['+33 6 05 51 14 32'],
        email: ['senfibem.paris@outlook.com'],
        siret: ['445374937000032'],
        codeApe: ['4332A'],
        tvaIntracom: ['FR00 445 374 937'],
        logoUrl: [this.logoPath]
      }),
      client: this.fb.group({
        id: [null],
        nom: ['', Validators.required],
        gerant: [''],
        adresse: [''],
        codePostalVille: [''],
        telephone: [''],
        email: [''],
        departement: ['']
      }),
      descriptionPoste: [''],
      conditionsPaiement: ['- 20,00 % à la signature du devis\n- 80,00 % à la Solde à la fin des travaux'],
      tvaPourcentage: [20, [Validators.required, Validators.min(0)]],
      lignes: this.fb.array([]),
      totalHt: [0],
      tva: [0],
      totalTtc: [0],
      totalHeures: [0]
    });
  }

  private patchDefaultValues(): void {
    this.addLigne({
      designation: "Installation de chantier : Bâches de protection, Échafaudage...",
      unite: "Ens",
      prixUnitaireHt: 180,
      quantite: 1,
      temps: 2
    });
    this.addLigne({
      designation: "Dépose & Nettoyage Revêtements pour Ponçage Parquet",
      unite: "Ens",
      prixUnitaireHt: 280,
      quantite: 1,
      temps: 4
    });
    this.addLigne({
      designation: "Préparation pour Ponçage Parquet",
      unite: "Ens",
      prixUnitaireHt: 300,
      quantite: 1,
      temps: 5
    });
    this.addLigne({
      designation: "Finitions 2 couches pour Ponçage Parquet",
      unite: "Ens",
      prixUnitaireHt: 370,
      quantite: 1,
      temps: 3
    });
    this.addLigne({
      designation: "Assistance technique MAÇONNERIE & Mise à disposition",
      unite: "Ens",
      prixUnitaireHt: 450,
      quantite: 1,
      temps: 2
    });

    this.updateTotals();
  }

  // ----------------- FormArray lignes -----------------
  get lignes(): FormArray {
    return this.devisForm.get('lignes') as FormArray;
  }

  addLigne(data?: Partial<LigneDevisDe0031>) {
    const grp = this.fb.group({
      id: [data?.id ?? null],
      designation: [data?.designation ?? '', Validators.required],
      unite: [data?.unite ?? 'Ens'],
      prixUnitaireHt: [data?.prixUnitaireHt ?? 0, Validators.required],
      quantite: [data?.quantite ?? 1, Validators.required],
      montantHt: [{ value: parseFloat(((data?.prixUnitaireHt ?? 0) * (data?.quantite ?? 1)).toFixed(2)), disabled: false }],
      temps: [data?.temps ?? 0],
      ordre: [data?.ordre ?? (this.lignes.length + 1)]
    });

    grp.get('prixUnitaireHt')!.valueChanges.subscribe(() => this.recalcLine(grp));
    grp.get('quantite')!.valueChanges.subscribe(() => this.recalcLine(grp));
    this.lignes.push(grp);
    this.updateTotals();
  }

  removeLigne(index: number) {
    this.lignes.removeAt(index);
    this.updateTotals();
  }

  private recalcLine(grp: any) {
    const prix = Number(grp.get('prixUnitaireHt')!.value) || 0;
    const qte = Number(grp.get('quantite')!.value) || 0;
    grp.get('montantHt')!.setValue(parseFloat((prix * qte).toFixed(2)), { emitEvent: false });
    this.updateTotals();
  }

  // Méthode appelée depuis le template quand on change une valeur de ligne (quantité / prix)
  onLineInputChange(index: number) {
    const ligneGroup = this.lignes.at(index) as FormGroup;
    const quantite = Number(ligneGroup.get('quantite')?.value) || 0;
    const prixUnitaireHt = Number(ligneGroup.get('prixUnitaireHt')?.value) || 0;
    ligneGroup.get('montantHt')?.setValue(parseFloat((quantite * prixUnitaireHt).toFixed(2)), { emitEvent: false });
    this.updateTotals();
  }

  // ----------------- Clients -----------------
  loadClients() {
    this.clientService.getAll().pipe(take(1)).subscribe({
      next: (list) => this.clients = list || [],
      error: (err) => {
        console.error('Erreur chargement clients', err);
        this.clients = [];
      }
    });
  }

  onClientChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const clientId = select.value;
    if (!clientId) return;
    const sel = this.clients.find(c => String(c.id) === String(clientId));
    if (sel) {
      this.devisForm.patchValue({ client: sel });
    }
  }

  // ----------------- CRUD -----------------
  loadDevis(id: number) {
    this.isLoading = true;
    this.devisService.getById(id).pipe(take(1)).subscribe({
      next: (d) => {
        const model = this.mapBackendToFormModel(d);
        this.devisForm.patchValue(model, {emitEvent: false});
        this.lignes.clear();
        (model.lignes || []).forEach((ln: any) => this.addLigne(ln));
        this.updateTotals();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur load devis', err);
        this.isLoading = false;
      }
    });
  }

  private mapBackendToFormModel(d: any) {
    const copy: any = { ...d };
    if (!copy.lignes && copy.fournitures) {
      copy.lignes = copy.fournitures.map((f: any, i: number) => ({
        designation: f.designation,
        unite: f.unite || 'Ens',
        prixUnitaireHt: f.prixUnitaire || f.prixUnitaireHt || 0,
        quantite: f.quantite || 1,
        montantHt: (f.prixUnitaire || f.prixUnitaireHt || 0) * (f.quantite || 1),
        temps: f.temps || 0,
        ordre: f.ordre || (i + 1)
      }));
    }
    return copy;
  }

  saveDevis() {
    if (this.devisForm.invalid) {
      this.devisForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    this.updateTotals();
    const payload = this.buildPayload();
    const id = payload.id;
    if (id) {
      this.devisService.update(id, payload).pipe(take(1)).subscribe({
        next: (res) => {
          this.isSaving = false;
          alert('Devis mis à jour');
          this.devisForm.patchValue(this.mapBackendToFormModel(res));
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
          alert('Erreur mise à jour');
        }
      });
    } else {
      this.devisService.create(payload).pipe(take(1)).subscribe({
        next: (res) => {
          this.isSaving = false;
          alert('Devis créé');
          this.devisForm.patchValue(this.mapBackendToFormModel(res));
          if ((res as any).id) this.devisForm.get('id')!.setValue((res as any).id);
        },
        error: (err) => {
          console.error(err);
          this.isSaving = false;
          alert('Erreur création');
        }
      });
    }
  }

  private buildPayload() {
    const raw = this.devisForm.getRawValue();
    raw.lignes = (raw.lignes || []).map((l: any, i: number) => ({
      id: l.id,
      designation: l.designation,
      unite: l.unite,
      prixUnitaireHt: Number(l.prixUnitaireHt),
      quantite: Number(l.quantite),
      montantHt: Number((l.montantHt ?? (l.prixUnitaireHt * l.quantite)).toFixed(2)),
      temps: Number(l.temps ?? 0),
      ordre: l.ordre ?? (i + 1)
    }));
    raw.totalHt = Number(raw.totalHt);
    raw.tva = Number(raw.tva);
    raw.totalTtc = Number(raw.totalTtc);
    raw.totalHeures = Number(raw.totalHeures);
    return raw;
  }

  // ----------------- Totaux -----------------
  updateTotals() {
    const lines = this.lignes.controls.map(ctrl => ({
      prix: Number(ctrl.get('prixUnitaireHt')!.value) || 0,
      qte: Number(ctrl.get('quantite')!.value) || 0,
      montant: Number(ctrl.get('montantHt')!.value) || 0,
      temps: Number(ctrl.get('temps')!.value) || 0
    }));

    const totalHt = lines.reduce((s, l) => s + (l.montant || (l.prix * l.qte)), 0);
    const tvaPct = Number(this.devisForm.get('tvaPourcentage')!.value) || 0;
    const tva = Number((totalHt * tvaPct / 100).toFixed(2));
    const totalTtc = Number((totalHt + tva).toFixed(2));
    const totalHeures = lines.reduce((s, l) => s + l.temps, 0);

    this.devisForm.patchValue({
      totalHt: Number(totalHt.toFixed(2)),
      tva: tva,
      totalTtc: totalTtc,
      totalHeures: totalHeures
    }, { emitEvent: false });
  }

  // ----------------- PDF generation -----------------
  async previewPdf() {
    this.updateTotals();
    const pdf = this.buildPdf();
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  }

  async downloadPdf() {
    this.updateTotals();
    const pdf = this.buildPdf();
    const filename = `Devis_${this.devisForm.value.numero || 'devis'}.pdf`;
    pdf.save(filename);
  }

  private buildPdf(): jsPDF {
    const doc = new jsPDF('p', 'mm', 'a4');
    const f = this.devisForm.getRawValue();

    // logo (droite) - mise en try/catch
    try {
      const img = new Image();
      img.src = f.entreprise.logoUrl || this.logoPath;
      // draw synchronously may fail, but jsPDF accepts HTMLImageElement
      doc.addImage(img, 'PNG', 150, 8, 45, 20);
    } catch (e) { /* ignore */ }

    // entête texte entreprise (gauche, couleur bleu)
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(f.entreprise.nom || 'SEN FIBEM France', 14, 18);

    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.setFont('helvetica', 'normal');
    const leftStart = 14;
    let y = 24;
    const lines = [
      f.entreprise.responsable || '',
      f.entreprise.adresse || '',
      f.entreprise.codePostalVille || '',
      `Tél. : ${f.entreprise.telephone || ''}`,
      `Email : ${f.entreprise.email || ''}`,
      `SIRET : ${f.entreprise.siret || ''}`,
      `Code APE : ${f.entreprise.codeApe || ''}`,
      `TVA Intracom : ${f.entreprise.tvaIntracom || ''}`
    ];
    lines.forEach(txt => { if (txt) { doc.text(txt, leftStart, y); y += 5; } });

    // cadre "DEVIS EN EURO" (droite)
    doc.setDrawColor(0);
    doc.setLineWidth(0.4);
    doc.rect(140, 28, 55, 18);
    doc.setFontSize(11);
    doc.setFont('helvetica','bold');
    doc.text('Devis en EURO', 144, 36);
    doc.setFontSize(9);
    doc.setFont('helvetica','normal');
    doc.text(`N° ${f.numero || ''}`, 144, 42);

    // mini-table date / client / page
    autoTable(doc, {
      startY: 48,
      margin: { left: 140 },
      tableWidth: 55,
      head: [['DATE','CLIENT','PAGE']],
      body: [[ f.date || '', (f.client?.nom || ''), '1']],
      styles: { fontSize: 8, halign: 'center' },
      headStyles: { fillColor: [220,220,220], textColor: 0, fontStyle: 'bold' }
    });

    // infos client détaillées (sous le mini-table, style maquette)
    const clientStartX = 140;
    const clientStartY = 64;
    doc.setFontSize(9);
    doc.setFont('helvetica','bold');
    doc.text('Client:', clientStartX, clientStartY);
    doc.setFont('helvetica','normal');
    const clientLines = [
      f.client?.nom || '',
      f.client?.gerant ? `Gérant: ${f.client.gerant}` : '',
      f.client?.adresse || '',
      f.client?.codePostalVille || '',
      f.client?.departement ? `Dépt: ${f.client.departement}` : '',
      f.client?.telephone ? `Tél: ${f.client.telephone}` : '',
      f.client?.email ? `Email: ${f.client.email}` : ''
    ];
    let cy = clientStartY + 4;
    clientLines.forEach(txt => { if (txt) { doc.text(txt, clientStartX, cy); cy += 4; } });

    // description Détails
    const descStartY = Math.max(y + 2, 90);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Détails :', 14, descStartY);
    doc.setFont('helvetica', 'normal');
    const description = f.descriptionPoste || '';
    doc.setFontSize(9);
    doc.splitTextToSize(description, 120).forEach((ln: string, idx: number) => {
      doc.text(ln, 14, descStartY + 6 + idx*4);
    });

    // TABLEAU principal (lignes)
    const startY = Math.max(descStartY + 20, 110);
    const tableBody = (f.lignes || []).map((l: any, i: number) => [
      (l.temps ? (l.temps + 'h') : ''),
      l.designation || '',
      l.unite || '',
      (Number(l.prixUnitaireHt) || 0).toFixed(2),
      (Number(l.quantite) || 0).toFixed(2),
      (Number(l.montantHt) || (Number(l.prixUnitaireHt||0) * Number(l.quantite||0))).toFixed(2),
      (l.temps || '')
    ]);

    autoTable(doc, {
      startY,
      head: [['Temps','Désignations d\'Ouvrages','U','Prix unit. HT','Qté','Montant Total H.T','Tps Total']],
      body: tableBody,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2, halign: 'center', valign: 'middle' },
      headStyles: { fillColor: [210, 230, 255], textColor: 0, fontStyle: 'bold' },
      columnStyles: {
        0: { cellWidth: 18 },
        1: { cellWidth: 80, halign: 'left' },
        2: { cellWidth: 12 },
        3: { cellWidth: 24 },
        4: { cellWidth: 18 },
        5: { cellWidth: 28 },
        6: { cellWidth: 18 }
      },
      margin: { left: 14, right: 14 }
    });

    const afterTableY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 6 : startY + 80;

    // Totaux (à droite)
    autoTable(doc, {
      startY: afterTableY,
      margin: { left: 120 },
      head: [['Montant Total H.T :', 'TVA (' + (f.tvaPourcentage || 0) + '%) :', 'Montant Total T.T.C :']],
      body: [[
        (Number(f.totalHt) || 0).toFixed(2),
        (Number(f.tva) || 0).toFixed(2),
        (Number(f.totalTtc) || 0).toFixed(2)
      ]],
      theme: 'grid',
      styles: { fontSize: 9, halign: 'center' },
      headStyles: { fillColor: [255,255,255], textColor: 0, fontStyle: 'bold' }
    });

    // Conditions & accord
    const condY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 12 : afterTableY + 20;
    doc.setFontSize(9);
    doc.text('Conditions de règlement :', 14, condY);
    const condLines = (f.conditionsPaiement || '').split('\n');
    condLines.forEach((ln: string, idx: number) => doc.text(ln, 14, condY + 5 + idx*4));

    // Accord client box
    doc.setDrawColor(0);
    doc.rect(14, condY + 20, 70, 22);
    doc.setFont('helvetica', 'bold');
    doc.text('BON POUR ACCORD', 18, condY + 34);

    // footer
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('SEN FIBEM France · 51 Rue du Grévarin – 27200 Vernon · Email : senfibem.paris@outlook.com', 14, pageHeight - 8);

    return doc;
  }
}


