import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineItem } from '../../models/lineItem';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { InvoiceService } from '../../services/invoice-service';
import { Devis } from '../../models/devise';

@Component({
  selector: 'app-invoice-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
  templateUrl: './invoice-component.html',
  styleUrl: './invoice-component.css'
})
export class InvoiceComponent implements OnInit {
  devis?: Devis;
  header: any;
  client: any;
  items: any[] = [];
  totalHT = 0;
  tva = 0;
  totalTTC = 0;

  // === Configuration des graphiques ===
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'right' } }
  };
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Répartition des coûts (€)' }]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: { x: {}, y: { beginAtZero: true } }
  };
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Montant HT par ligne (€)' }]
  };

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadDevis();
  }

  // === Récupération dynamique du devis ===
  loadDevis(): void {
    this.invoiceService.getAll().subscribe({
      next: (data: Devis[]) => {
        if (data && data.length > 0) {
          this.devis = data[0];

          // En-tête dynamique
          this.header = {
            companyLogo: 'assets/logo.png', // logo local dans assets/
            companyName: 'SEN FIBEM France',
            address: '51 Rue de Grévarin, 27200 Vernon, France',
            phone: '+33 6 05 51 14 32',
            email: 'senfibem.paris@outlook.com',
            siret: '445 374 937 00032',
            codeAPE: '4332A',
            tva: 'FR00 445 374 937',
            devisNumber: this.devis.numero,
            date: this.devis.date
          };

          // Client dynamique
          this.client = {
            nom: this.devis.clientNom,
            adresse: this.devis.clientAdresse,
            telephone: this.devis.clientTel,
            email: this.devis.email
          };

          this.items = this.devis.lignes || [];
          this.totalHT = this.devis.totalHT || 0;
          this.tva = this.devis.tva || 0;
          this.totalTTC = this.devis.totalTTC || 0;

          this.initCharts();
        }
      },
      error: (err) => console.error('Erreur lors du chargement du devis:', err)
    });
  }

  // === Génération dynamique des données graphiques ===
  private initCharts(): void {
    const labels = this.items.map(i => i.libelle);
    const values = this.items.map(i => i.montantTotal);

    this.pieChartData = {
      labels,
      datasets: [
        {
          data: values,
          label: 'Répartition des coûts (€)',
          backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545', '#17a2b8']
        }
      ]
    };

    this.barChartData = {
      labels,
      datasets: [
        {
          data: values,
          label: 'Montant HT par ligne (€)',
          backgroundColor: '#007bff'
        }
      ]
    };
  }

  // === Export PDF avec en-tête et pied de page ===
  exportAsPDF() {
    import('html2canvas').then(html2canvas => {
      import('jspdf').then(jsPDFModule => {
        const jsPDF = jsPDFModule.default;
        html2canvas.default(document.getElementById('invoice') as HTMLElement, { scale: 2 })
          .then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // === En-tête PDF ===
            pdf.setFontSize(12);
            pdf.text(this.header.companyName, 10, 10);
            pdf.text(`Devis N° ${this.header.devisNumber}`, 150, 10);

            // === Contenu principal ===
            pdf.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);

            // === Pied de page ===
            const pageHeight = pdf.internal.pageSize.getHeight();
            pdf.setFontSize(10);
            pdf.text('SEN FIBEM France – SIRET: 445 374 937 00032 – TVA: FR00 445 374 937', 10, pageHeight - 15);
            pdf.text('Email: senfibem.paris@outlook.com | Tél: +33 6 05 51 14 32', 10, pageHeight - 10);

            pdf.save(`devis_${this.header.devisNumber}.pdf`);
          });
      });
    });
  }
}
