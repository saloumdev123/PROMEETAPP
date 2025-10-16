import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({ providedIn: 'root' })
export class PdfGeneratorService {
  // Couleurs exactes de la facture
  private DARK_BLUE: [number, number, number] = [0, 51, 102]; // #003366
  private MEDIUM_BLUE: [number, number, number] = [0, 51, 153]; // #003399
  private LIGHT_GRAY: [number, number, number] = [230, 230, 230]; // En-têtes de tableau
  private ALTERNATE_GRAY: [number, number, number] = [245, 245, 245]; // Lignes alternées
  private BLACK: [number, number, number] = [0, 0, 0];

  constructor() { }

  async generateInvoicePdf(invoice: any): Promise<void> {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    // Dimensions de page
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginLeft = 40;
    const marginRight = 40;
    const totalWidth = pageWidth - marginLeft - marginRight;

    // === LOGO EN HAUT À GAUCHE ===
    const logoPath = 'assets/images/calista.png';
    try {
      doc.addImage(logoPath, 'PNG', marginLeft, 30, 80, 60);
    } catch (e) {
      console.warn('Logo non trouvé, continuons sans logo');
    }

    // === BLOC EN-TÊTE DROITE (FACTURE) ===
    const headerX = pageWidth / 2 + 40;
    const headerY = 52;
    const headerW = pageWidth - headerX - marginRight;
    const headerH = 28;

    // Rectangle titre facture
    doc.setDrawColor(...this.BLACK);
    doc.setLineWidth(1);
    doc.rect(headerX, headerY, headerW, headerH);

    // Texte complet sur une seule ligne : "Facture en EUR : N° FA 001 - 27 09 25"
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...this.BLACK);

    // Construit la ligne complète
    const invoiceNumberText = `Facture en EUR : N° ${invoice.number || 'FA 001'} - ${invoice.dateEcheance || '27 09 25'}`;

    // Écrit la ligne entière centrée horizontalement dans le rectangle
    doc.text(invoiceNumberText, headerX + 8, headerY + 15);

    // === TABLEAU DATE / CLIENT / PAGE ===
    const tableY = headerY + headerH;
    const colW = headerW / 3;
    const colH = 28;

    // Bordure externe
    doc.rect(headerX, tableY, headerW, colH);

    // Lignes verticales
    doc.line(headerX + colW, tableY, headerX + colW, tableY + colH);
    doc.line(headerX + 2 * colW, tableY, headerX + 2 * colW, tableY + colH);

    // Ligne horizontale interne
    const titleLineY = tableY + 12;
    doc.line(headerX, titleLineY, headerX + headerW, titleLineY);

    // Titres
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...this.BLACK);
    doc.text('DATE', headerX + 6, tableY + 9);
    doc.text('CLIENT', headerX + colW + 6, tableY + 9);
    doc.text('PAGE', headerX + 2 * colW + 6, tableY + 9);

    // Valeurs
    doc.setFontSize(7);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.dateEcheance || '27/09/2025', headerX + 6, tableY + 22);
    doc.text(invoice.clientName || 'SEN FIBEM', headerX + colW + 6, tableY + 22);
    doc.text('1', headerX + 2 * colW + 6, tableY + 22);

    // === INFORMATIONS CLIENT (DROITE) ===
    let clientY = tableY + colH + 15;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...this.BLACK);
    doc.text(invoice.clientName || 'SEN FIBEM', headerX, clientY);

    clientY += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.clientContact || 'Mr GOMIS Gilbert', headerX, clientY);

    clientY += 12;
    doc.text(invoice.clientAddress || '51 Rue du Grévarin – 27200 Vernon', headerX, clientY);

    clientY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Tél. :', headerX, clientY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.clientPhone || '+33 6 05 51 14 32', headerX + 25, clientY);

    clientY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Port :', headerX, clientY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyMobile || '06.05.51.14.32', headerX + 25, clientY);

    clientY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Email :', headerX, clientY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyEmail || 'senfibem.paris@outlook.com', headerX + 35, clientY);

    // === INFORMATIONS ENTREPRISE (GAUCHE) ===
    let companyY = 105;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.companyName || 'SEN FIBEM', marginLeft, companyY);

    companyY += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyContact || 'Mr GOMIS Gilbert', marginLeft, companyY);

    companyY += 12;
    doc.setFontSize(9);
    doc.text(invoice.companyAddress || '51 Rue du Grévarin – 27200 Vernon', marginLeft, companyY);

    companyY += 12;
    doc.text(invoice.companyPhone || '+33 6 05 51 14 32', marginLeft, companyY);

    companyY += 12;
    doc.text(invoice.companyMobile || '06.05.51.14.32', marginLeft, companyY);

    companyY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Email :', marginLeft, companyY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyEmail || 'senfibem.paris@outlook.com', marginLeft + 35, companyY);

    companyY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('SIRET :', marginLeft, companyY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companySiret || '522 327 824 00010', marginLeft + 38, companyY);

    companyY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Code APE :', marginLeft, companyY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyApe || '4332A', marginLeft + 55, companyY);

    companyY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text("N° individuel d'identification à la TVA :", marginLeft, companyY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyTvaNumber || 'FR88522327824', marginLeft + 185, companyY);

    companyY += 12;
    doc.setTextColor(...this.BLACK);
    doc.text('Dirigeant / Responsable :', marginLeft, companyY);
    doc.setTextColor(...this.MEDIUM_BLUE);
    doc.text(invoice.companyContact || 'Mr GOMIS Gilbert', marginLeft + 115, companyY);

    // === BLOCS MODE DE RÈGLEMENT ET ÉCHÉANCE ===
    const boxStartY = companyY + 20;
    const leftBoxW = totalWidth * 0.45;
    const rightBoxW = totalWidth * 0.47;
    const gap = totalWidth - leftBoxW - rightBoxW;

    // MODE DE RÈGLEMENT
    doc.setDrawColor(...this.BLACK);
    doc.setLineWidth(1);
    doc.rect(marginLeft, boxStartY, leftBoxW, 45);
    doc.line(marginLeft, boxStartY + 20, marginLeft + leftBoxW, boxStartY + 20);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...this.BLACK);
    doc.text('MODE DE REGLEMENT', marginLeft + 8, boxStartY + 14);

    doc.setFontSize(10);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.paymentMode || 'Chèque ou virement', marginLeft + 8, boxStartY + 36);

    // ÉCHÉANCE / ID CEE
    const rightBoxX = marginLeft + leftBoxW + gap;
    doc.rect(rightBoxX, boxStartY, rightBoxW, 45);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...this.BLACK);
    doc.text('ECHEANCE', rightBoxX + 8, boxStartY + 14);
    doc.text('N/ID CEE :', rightBoxX + rightBoxW / 2 + 8, boxStartY + 14);

    const splitLineY = boxStartY + 22;
    doc.line(rightBoxX, splitLineY, rightBoxX + rightBoxW, splitLineY);
    doc.line(rightBoxX + rightBoxW / 2, splitLineY, rightBoxX + rightBoxW / 2, boxStartY + 45);

    doc.setFontSize(8);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.echeanceDate || invoice.dateEcheance || '27/09/2025', rightBoxX + 8, splitLineY + 16);

    const idCeeText = 'V/id CEE :';
    const idCeeValue = invoice.echeanceVId || 'FR 88 5223 278 24';
    doc.setTextColor(...this.BLACK);
    doc.text(idCeeText, rightBoxX + rightBoxW / 2 + 8, splitLineY + 16);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(idCeeValue, rightBoxX + rightBoxW / 2 + 45, splitLineY + 16);

    // Taux de l'Euro
    const tauxY = boxStartY + 45 + 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...this.BLACK);
    doc.text("Taux de l'Euro:", rightBoxX, tauxY);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.euroRate?.toString() || '6,55957 €', rightBoxX + 70, tauxY);

    // Références
    const refY = tauxY + 1;
    doc.setTextColor(...this.BLACK);
    doc.text('Références :', marginLeft, refY);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.reference || 'rénovation', marginLeft + 60, refY);

    doc.setTextColor(...this.BLACK);
    doc.text('Commande n° Devis SEN FIBEM N°', marginLeft, refY + 14);
    doc.setTextColor(...this.DARK_BLUE);
    doc.text(invoice.devisNumber || 'DE 0016', marginLeft + 200, refY + 14);

   // === TABLEAU PRINCIPAL ===
const tableStartY = refY + 26;

const items = (invoice.items || []).map((it: any) => [
  it.referenceCode || '',
  it.label || '', // ✅ texte complet de la désignation
  it.quantity || '',
  it.unitPrice ? `${it.unitPrice.toFixed(2)} €` : '',
  it.discountRate != null ? `${it.discountRate}%` : '',
  it.remiseAmount != null ? `${it.remiseAmount.toFixed(2)} €` : '',
  it.lineTotal != null ? `${it.lineTotal.toFixed(2)} €` : '',
  it.tvaRate != null ? `${it.tvaRate}` : '',
]);

const tableFooter = [
  [
    {
      content: `TOTAL H.T Travaux OUVRAGES : ${(invoice.baseHT || 0).toFixed(2)} €`,
      colSpan: 8,
      styles: {
        halign: 'right' as const,
        fontStyle: 'bold' as const,
        textColor: this.BLACK,
        fillColor: [230, 230, 230] as [number, number, number],
        fontSize: 9,
      },
    },
  ],
];

autoTable(doc, {
  startY: tableStartY,
  head: [['RÉFÉRENCE', 'DÉSIGNATION', 'Nb heures', 'P.U. HT', '% REM', 'REMISE HT', 'MONTANT HT', 'TVA']],
  body: items.length ? items : [['', '', '', '', '', '', '', '']],
  foot: tableFooter,
  theme: 'grid',

  headStyles: {
    fillColor: this.LIGHT_GRAY,
    textColor: this.BLACK,
    fontStyle: 'bold' as const,
    halign: 'center' as const,
    fontSize: 8,
  },

  bodyStyles: {
    fontSize: 8,
    halign: 'center' as const,
    valign: 'top' as const,
    textColor: this.BLACK,
    cellWidth: 'wrap',
  },

columnStyles: {
    0: { cellWidth: 55 }, // Référence
    1: { cellWidth: 155, halign: 'left', valign: 'top', textColor: [0, 0, 255] }, // 🔵 Désignation en bleu + plus large
    2: { cellWidth: 55 , textColor: [0, 0, 255]},
    3: { cellWidth: 50 , textColor: [0, 0, 255]},
    4: { cellWidth: 55 , textColor: [0, 0, 255]},
    5: { cellWidth: 50 , textColor: [0, 0, 255]},
    6: { cellWidth: 50 , textColor: [0, 0, 255]},
    7: { cellWidth: 50 , textColor: [0, 0, 255]},
  },

  styles: {
    lineColor: this.BLACK,
    lineWidth: 0.5,
    overflow: 'linebreak' as const, // ✅ retour à la ligne automatique
  },

  alternateRowStyles: { fillColor: this.ALTERNATE_GRAY },
  footStyles: { fillColor: [255, 255, 255], fontSize: 9 },
  margin: { left: marginLeft, right: marginRight },
});

    const afterTableY = (doc as any).lastAutoTable.finalY;

    // === REMARQUE ET TAUX TVA ===
    const remarkY = afterTableY + 15;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...this.BLACK);

    // "Remarque :" à gauche
    doc.text('Remarque :', marginLeft, remarkY);

    // Bloc "Taux de TVA" à droite
    const tvaX = pageWidth - marginRight - 120; // ajuste 120 selon ta mise en pag
    let currentY = remarkY;

    // Première ligne du bloc TVA
    doc.text('Taux de TVA : 1=20%', tvaX + 25, currentY);
    currentY += 8;

    // Deuxième ligne
    doc.text('2=10%', tvaX + 91, currentY);
    currentY += 8;

    // Troisième ligne
    doc.text('3=5,5%', tvaX + 89, currentY);
    currentY += 8;

    // Quatrième ligne alignée sous "Remarque :"
    doc.text('4=0% pas de TVA sur la facture et mention « autoliquidation » apposée', marginLeft + 200, currentY);


    // === TABLEAU DES TOTAUX ==
    const totalsY = remarkY + 35;
    const totalsH = 55;

    const labels = ['BASE HT', 'REMISE', 'MT de TVA', '% TVA', 'PORT', 'TOTAUX', 'TOTAL TTC', 'NET A PAYER'];
 // ✅ correspondance correcte avec les champs de FactureComponent
const values = [
  `${Number(invoice.baseHT || invoice.baseHt || 0).toFixed(2)} €`,
  `${Number(invoice.remise || 0).toFixed(2)} €`,
  `${Number(invoice.totalTVA || invoice.mtTva || 0).toFixed(2)} €`,
  `${Number(invoice.taxRate || invoice.pourcentTva || 20).toFixed(2)} %`,
  `${Number(invoice.port || 0).toFixed(2)} €`,
  `${Number(invoice.total || invoice.totaux || 0).toFixed(2)} €`,
  `${Number(invoice.totalTTC || invoice.totalTtc || 0).toFixed(2)} €`,
  `${Number(invoice.netAPayer || 0).toFixed(2)} €`
];

    const colCount = labels.length;
    const colWidth = totalWidth / colCount;

    // Bordure extérieure
    doc.setDrawColor(...this.BLACK);
    doc.setLineWidth(1);
    doc.rect(marginLeft, totalsY, totalWidth, totalsH);

    // Ligne horizontale du milieu
    const midY = totalsY + totalsH / 2;
    doc.line(marginLeft, midY, marginLeft + totalWidth, midY);

    // Lignes verticales
    for (let i = 1; i < colCount; i++) {
      doc.line(
        marginLeft + i * colWidth,
        totalsY,
        marginLeft + i * colWidth,
        totalsY + totalsH
      );
    }

    // Labels (première ligne)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...this.BLACK);
    labels.forEach((label, i) => {
      const x = marginLeft + i * colWidth + 6;
      const y = totalsY + 18;
      doc.text(label, x, y);
    });

    // Valeurs (deuxième ligne)
    doc.setFontSize(9);
    doc.setTextColor(...this.DARK_BLUE);
    values.forEach((value, i) => {
      const x = marginLeft + i * colWidth + 6;
      const y = midY + 20;
      doc.text(value, x, y);
    });

    // === PIED DE PAGE ===
    const footerY = pageHeight -50;

    // Texte du pied de page
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);

    const footerParts = [
      { text: 'SEN FIBEM · 51 Rue du Grévarin – 27200 Vernon · ', color: this.DARK_BLUE },
      { text: 'Portable', color: [20, 20, 20] as [number, number, number] },
      { text: ` : ${invoice.companyMobile || '06.05.51.14.32'} · `, color: this.DARK_BLUE },
      { text: 'Email', color: [20, 20, 20] as [number, number, number] },
      { text: ` : ${invoice.companyEmail || 'senfibem.paris@outlook.com'} · `, color: this.DARK_BLUE },
      { text: 'SIRET', color: [20, 20, 20] as [number, number, number] },
      { text: ` : ${invoice.companySiret || '522 327 824 00010'}`, color: this.DARK_BLUE },
    ];

    let footerWidth = 0;
    footerParts.forEach(p => footerWidth += doc.getTextWidth(p.text));

    let currentX = (pageWidth - footerWidth) / 2;
    footerParts.forEach(p => {
      doc.setTextColor(...p.color);
      doc.text(p.text, currentX, footerY);
      currentX += doc.getTextWidth(p.text);
    });


    // === 🔢 NUMÉROTATION AUTOMATIQUE DES PAGES ===

// Récupère le nombre total de pages générées
const totalPages = (doc as any).internal.getNumberOfPages();

// Parcourt chaque page pour y écrire le numéro
for (let i = 1; i <= totalPages; i++) {
  (doc as any).setPage(i); // Aller à la page i

  const pageWidth = (doc as any).internal.pageSize.getWidth();
  const pageHeight = (doc as any).internal.pageSize.getHeight();

  // === Numérotation des pages ===
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  const pageText = `Page ${i} / ${totalPages}`;

  // Position : en bas à droite, juste au-dessus du footer noir
  doc.text(pageText, pageWidth - 65, pageHeight - 5);
}
// === 🔢 NUMÉROTATION AUTOMATIQUE DES PAGES ===



// Parcourt chaque page pour y écrire le numéro
for (let i = 1; i <= totalPages; i++) {
  (doc as any).setPage(i); // Aller à la page i

  const pageWidth = (doc as any).internal.pageSize.getWidth();
  const pageHeight = (doc as any).internal.pageSize.getHeight();

  // === Numérotation des pages ===
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  const pageText = `Page ${i} / ${totalPages}`;

  // Position : en bas à droite, juste au-dessus du footer noir
  doc.text(pageText, pageWidth - 65, pageHeight - 5);
}


    // Sauvegarde
    doc.save(`Facture_${invoice.number || 'sans_numero'}.pdf`);
  }
}
