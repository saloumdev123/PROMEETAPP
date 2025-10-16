import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Devis } from '../models/devise';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorServiceDevis {
  clientSignature?: string;
  companySignature?: string;
  // Couleurs exactes de la facture
  private DARK_BLUE: [number, number, number] = [0, 51, 102]; // #003366
  private MEDIUM_BLUE: [number, number, number] = [0, 51, 153]; // #003399
  private LIGHT_GRAY: [number, number, number] = [230, 230, 230]; // En-têtes de tableau
  private ALTERNATE_GRAY: [number, number, number] = [245, 245, 245]; // Lignes alternées
  private BLACK: [number, number, number] = [0, 0, 0];
  private BLUE: [number, number, number] = [0, 102, 204];


  constructor() {}

  generateDevisPDF(devis: Devis, travaux: any[], totalHT: number,  clientSignature?: string, companySignature?: string): void {
const doc = new jsPDF({ unit: 'pt', format: 'a4' });

// === Prérequis : doc déjà créé en amont ===
// const doc = new jsPDF({ unit: 'pt', format: 'a4' });

/* Couleurs (tuple pour pouvoir utiliser spread) */
const BLACK: [number, number, number] = [0, 0, 0];
const BLUE: [number, number, number] = [0, 80, 160];
const DARK_BLUE: [number, number, number] = [0, 50, 130];

/* Marges et largeur utile */
const marginLeft = 40;
const marginRight = 40;
const pageWidth = doc.internal.pageSize.getWidth();
const usableWidth = pageWidth - marginLeft - marginRight;

/* --- LOGO + ENTETE GAUCHE (infos entreprise) --- */
const logoPath = 'assets/images/logofibem.png';
try {
  doc.addImage(logoPath, 'PNG', marginLeft, 30, 90, 70);
} catch (err) {
  // ignore if missing
}

/* Titre entreprise */
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...DARK_BLUE);
doc.text('SEN FIBEM France', marginLeft, 120);

/* Détails entreprise (labels en noir, valeurs en bleu) */
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);

let y = 135; // position initiale des lignes (sous le titre)
const leftColX = marginLeft;
const rightColX = marginLeft + 170; // colonne des valeurs (alignée)

/* Paire label/valeur — adapte les valeurs dynamique si besoin */
const companyRows: Array<[string, string]> = [
  ['Mr GOMIS Gilbert', ''],
  ['51 Rue du Grévarin –', '27200 Vernon'],
  ['Tél. :', '+33 6 05 51 14 32'],
  ['Port :', '06.05.51.14.32'],
  ['Email :', 'senfibem.paris@outlook.com'],
  ['SIRET :', '445 374 937 00032'],
  ['Code APE :', '4332A'],
  ["N° individuel d'identification à la TVA :", 'FR00 445 374 937'],
  ['Dirigeant / Responsable :', 'Mr GOMIS Gilbert'],
  ['INDICE :', 'Particulier'],
  ['N° LOT :', 'TRAVAUX Projet MACONNERIE'],
  ['Références :', 'TRAVAUX MACONNERIE'],
  ['Affaire N° :', 'AFF-630']
];

companyRows.forEach(([label, value]) => {
  doc.setTextColor(...BLACK);
  doc.text(label, leftColX, y);

  if (value && value.trim().length > 0) {
    doc.setTextColor(...BLUE);

    // Mesurer la largeur exacte du label pour placer la valeur juste après
    const labelWidth = doc.getTextWidth(label);
    const smallGap = 6; // petit espace entre label et valeur
    const valueX = leftColX + labelWidth + smallGap;

    // largeur restante utilisable
    const remainingWidth = usableWidth / 2 - (valueX - marginLeft);

    // Découpe la valeur si elle est trop longue
    const split = doc.splitTextToSize(value, remainingWidth > 50 ? remainingWidth : 100);
    doc.text(split, valueX, y);
  }

  // Décale la ligne suivante (plus si la valeur a été splittée sur plusieurs lignes)
  const lineHeight = Array.isArray(value) && value.length > 1 ? value.length * 13 : 13;
  y += lineHeight;
});



/* --- ENTETE DEVIS (cadre à droite) --- */
const headerX = pageWidth / 2 + 25;
const headerW = pageWidth - headerX - marginRight;
const headerY = 50;
const headerH = 25;

/* Cadre du titre */
doc.setDrawColor(...BLACK);
doc.setLineWidth(0.8);
doc.rect(headerX, headerY, headerW, headerH);

/* Texte du titre (gauche noir, référence N° en bleu alignée à droite) */
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...BLACK);
doc.text('Devis en EURO', headerX + 10, headerY + 17);

doc.setTextColor(...BLUE);
doc.text(`N° ${devis.number || 'DE 0031'}`, headerX + headerW - 10, headerY + 17, { align: 'right' });

/* --- Petit tableau DATE / CLIENT / PAGE (sous le cadre) --- */
const tableY = headerY + headerH;
const colW = headerW / 3;
const colH = 30;

doc.rect(headerX, tableY, headerW, colH);
doc.line(headerX + colW, tableY, headerX + colW, tableY + colH);
doc.line(headerX + 2 * colW, tableY, headerX + 2 * colW, tableY + colH);
doc.line(headerX, tableY + 12, headerX + headerW, tableY + 12);

/* En-têtes du mini-tableau */
doc.setFont('helvetica', 'bold');
doc.setFontSize(8);
doc.setTextColor(...BLACK);
doc.text('DATE', headerX + 6, tableY + 9);
doc.text('CLIENT', headerX + colW + 6, tableY + 9);
doc.text('PAGE', headerX + 2 * colW + 6, tableY + 9);

/* Valeurs — en bleu */
doc.setFont('helvetica', 'normal');
doc.setTextColor(...BLUE);
doc.text(devis.dateEmission ? devis.dateEmission : '04/10/2025', headerX + 6, tableY + 24);
doc.text(devis.clientName ? devis.clientName : 'Sté 0CARO RENO', headerX + colW + 6, tableY + 24);
doc.text('1/2', headerX + 2 * colW + 6, tableY + 24);

/* --- INFORMATIONS CLIENT (sous le petit tableau) --- */
let clientY = tableY + colH + 20;
doc.setFontSize(9);

/* liste label/valeur client (labels noir, valeurs bleu) */
const clientInfo: Array<[string, string]> = [
  [devis.clientName || 'Sté 0CARO RENO', ''],
  [devis.clientPhone || 'Mme Caroline SANCHEZ - Gérante', ''],
  ['6 GRANDE RUE', ''],
  ['10500 EPAGNE', ''],
  ['Tél. :', devis.clientPhone || '0x'],
  ['Port :', '+33 (0)6 95 10 89 54'],
  ['Email :', devis.clientEmail || 'caro.reno.btptest@gmail.com']
];

/* --- CLIENT (droite) --- */
clientInfo.forEach(([label, value]) => {
  doc.setTextColor(...BLACK);
  doc.text(label, headerX, clientY);

  if (value && String(value).trim().length > 0) {
    doc.setTextColor(...BLUE);

    // largeur du label pour coller la valeur juste après
    const labelWidth = doc.getTextWidth(label);
    const gap = 6;
    const valX = headerX + labelWidth + gap;

    const remainingW = usableWidth / 2 - (valX - marginLeft);
    const splitVal = doc.splitTextToSize(String(value), remainingW > 50 ? remainingW : 100);

    doc.text(splitVal, valX, clientY);
  }

  const lineHeight = Array.isArray(value) && value.length > 1 ? value.length * 13 : 13;
  clientY += lineHeight;
});

/* --- RÉFÉRENCES ET CONTACTS (3 colonnes alignées) --- */
const refStartY = clientY + 20;
const col1X = marginLeft;
const col2X = marginLeft + 220;
const col3X = marginLeft + 420;
const refLineSpacing = 14;

doc.setFontSize(9);

/* organise les paires par ligne pour éviter chevauchement */
const refsRows: Array<[{label:string, val:string},{label:string,val:string},{label:string,val:string}]>
  = [
    [
      { label: '', val: '' },
      { label: 'Lieu :', val: 'Espagne' },
      { label: 'Contact B.E. :', val: 'Mme Caroline SANCH' }
    ],
    [
      { label: '', val: '' },
      { label: ' ', val: 'Mme Caroline SANCH' },
      { label: 'DÉPT :', val: '10' }
    ],
    [
      { label: '', val: '' },
      { label: '', val: '' },
      { label: '', val: '' }
    ]
  ];

refsRows.forEach((row, rowIndex) => {
  const yPos = refStartY + rowIndex * refLineSpacing;

  // --- Colonne 1 ---
  if (row[0].label) {
    doc.setTextColor(...BLACK);
    doc.text(row[0].label, col1X, yPos);

    if (row[0].val && row[0].val.trim().length > 0) {
      doc.setTextColor(...BLUE);
      const labelW = doc.getTextWidth(row[0].label);
      const gap = 6; // petit espace uniforme
      const valX = col1X + labelW + gap;

      const remainingW = col2X - valX - 10;
      const split = doc.splitTextToSize(row[0].val, remainingW > 50 ? remainingW : 80);
      doc.text(split, valX, yPos);
    }
  }

  // --- Colonne 2 ---
  if (row[1].label) {
    doc.setTextColor(...BLACK);
    doc.text(row[1].label, col2X, yPos);

    if (row[1].val && row[1].val.trim().length > 0) {
      doc.setTextColor(...BLUE);
      const labelW = doc.getTextWidth(row[1].label);
      const gap = 6;
      const valX = col2X + labelW + gap;

      const remainingW = col3X - valX - 10;
      const split = doc.splitTextToSize(row[1].val, remainingW > 50 ? remainingW : 80);
      doc.text(split, valX, yPos);
    }
  }

  // --- Colonne 3 ---
  if (row[2].label) {
    doc.setTextColor(...BLACK);
    doc.text(row[2].label, col3X, yPos);

    if (row[2].val && row[2].val.trim().length > 0) {
      doc.setTextColor(...BLUE);
      const labelW = doc.getTextWidth(row[2].label);
      const gap = 6;
      const valX = col3X + labelW + gap;

      const remainingW = usableWidth - (valX - marginLeft);
      const split = doc.splitTextToSize(row[2].val, remainingW > 50 ? remainingW : 80);
      doc.text(split, valX, yPos);
    }
  }
});


// === SECTION : DÉTAILS DU POSTE À POURVOIR ===  
let posteY = refStartY + 60;

// === 1️⃣ Ligne du haut : "Détails: POSTE À POURVOIR" (noir) + titre du poste (bleu) ===
const blackPart = 'Détails: POSTE À POURVOIR : ';
const bluePart = devis.posteTitle ? devis.posteTitle : '';

autoTable(doc, {
  startY: posteY,
  body: [[
    {
      content: '', // On laisse vide car on dessine manuellement le texte ci-dessous
      styles: { minCellHeight: 30, cellPadding: 10 }
    }
  ]],
  theme: 'plain',
  styles: {
    font: 'helvetica',
    lineColor: this.BLACK,
    lineWidth: 1,
    cellPadding: 10,
    valign: 'middle',
  },
  columnStyles: {
    0: { cellWidth: pageWidth - marginLeft - marginRight },
  },
  didDrawCell: (data) => {
    const textX = data.cell.x + 8;
    const textY = data.cell.y + data.cell.height / 2 + 3;

    // 🟢 Noir pour "Détails: POSTE À POURVOIR :"
    doc.setTextColor(...this.BLACK);
    doc.text(blackPart, textX, textY);

    // 🟦 Bleu pour le titre du poste
    const blackWidth = doc.getTextWidth(blackPart);
    doc.setTextColor(...this.BLUE);
    doc.text(bluePart, textX + blackWidth + 2, textY);
  }
});


// === 2️⃣ Ligne suivante : 3 colonnes ===
const tableStartY = (doc as any).lastAutoTable.finalY;
const tableWidth = pageWidth - marginLeft - marginRight;
const colWidths = [tableWidth * 0.4, tableWidth * 0.3, tableWidth * 0.3];

// On sépare le texte noir ("VOIR Détails : Description du poste") du texte bleu (la description)
const blackIntro = 'VOIR Détails : Description du poste\n';
const blueDescription = devis.descriptionPoste ? devis.descriptionPoste : '';

autoTable(doc, {
  startY: tableStartY,
  body: [[
    {
      content: '', // Vide — on dessine le contenu manuellement pour les couleurs
      styles: {
        minCellHeight: 80,
        cellPadding: 6,
        valign: 'top'
      }
    },
    {
      content: devis.assistanceTechnique
        ? devis.assistanceTechnique
        : 'Assistance technique: Maçon – carreleur confirmé.\nDémarrage rapide, secteur Coulommiers (77120)',
      styles: {
        textColor: this.BLUE,
        fontSize: 9,
        valign: 'top',
        cellPadding: 6,
        minCellHeight: 80
      }
    },
    {
      content: devis.profil
        ? devis.profil
        : 'Profil: Autonomie, rigueur, sens du service –\nExpérience 3–5 ans souhaitée',
      styles: {
        textColor: this.BLUE,
        fontSize: 9,
        valign: 'top',
        cellPadding: 6,
        minCellHeight: 80
      }
    }
  ]],
  theme: 'plain',
  styles: {
    font: 'helvetica',
    lineColor: this.BLACK,
    lineWidth: 1,
    fontSize: 9,
  },
  columnStyles: {
    0: { cellWidth: colWidths[0] },
    1: { cellWidth: colWidths[1] },
    2: { cellWidth: colWidths[2] },
  },
  didDrawCell: (data) => {
    if (data.column.index === 0) {
      const textX = data.cell.x + 6;
      const textY = data.cell.y + 10;
      const lineHeight = 4;

      // 🟣 Partie noire (intro)
      doc.setTextColor(...this.BLACK);
      const blackLines = doc.splitTextToSize(blackIntro, colWidths[0] - 12);
      doc.text(blackLines, textX, textY);

      // 🟦 Partie bleue (description)
      doc.setTextColor(...this.BLUE);
      const blueLines = doc.splitTextToSize(blueDescription, colWidths[0] - 12);
      doc.text(blueLines, textX, textY + blackLines.length * lineHeight);
    }
  }
});


// === 3️⃣ Tableau des travaux (identique à ta capture) ===
let startY = (doc as any).lastAutoTable?.finalY + 10 || 100;

autoTable(doc, {
  startY,
  head: [['Total Heures', 'RÉCAPITULATIF Total Travaux OUVRAGES Phase 1', 'Total H.T.']],
  body: travaux.map(t => ['', t.description, `${t.montant.toFixed(2)} €`]),
  foot: [['0,00h', 'TOTAL € HT Travaux OUVRAGES Phase 1', `${totalHT.toFixed(2)} €`]],

  theme: 'grid',
  styles: {
    fontSize: 9,
    textColor: [0, 51, 153],
    lineColor: [0, 0, 0],
    lineWidth: 0.8,
    cellPadding: 4,
  },

  headStyles: { 
    fillColor: [230, 230, 230],
    textColor: [0, 0, 0],
    halign: 'center',
    fontStyle: 'bold',
    lineColor: [0, 0, 0],
    lineWidth: 0.8
  },

  footStyles: { 
    fillColor: [230, 230, 230],
    textColor: [0, 0, 0],
    fontStyle: 'bold',
    halign: 'right',
    lineColor: [0, 0, 0],
    lineWidth: 0.8
  },

  columnStyles: {
    0: { halign: 'center', cellWidth: tableWidth * 0.2 },   // Total Heures
    1: { cellWidth: tableWidth * 0.55 },                    // Description
    2: { halign: 'right', cellWidth: tableWidth * 0.25 },   // Montant
  },

  didDrawCell: (data) => {
    doc.setDrawColor(0, 0, 0);
  }
});

// 💰 Calculs automatiques
const tva = totalHT * 0.20;
const totalTtc = totalHT + tva;

// Position du petit tableau à droite du tableau principal
const recapX = marginLeft + tableWidth * 0.55 + tableWidth * 0.25 - 67; // Aligné à droite
const recapY = (doc as any).lastAutoTable.finalY + 5; // Juste en dessous

autoTable(doc, {
  startY: recapY,
  margin: { left: recapX },
  body: [
    ['Montant Total HT', `${totalHT.toFixed(2)} €`],
    ['TVA (20%)', `${tva.toFixed(2)} €`],
    ['Montant Total TTC', `${totalTtc.toFixed(2)} €`],
  ],
  theme: 'grid',
  styles: {
    fontSize: 9,
    textColor: [0, 0, 0],
    lineColor: [0, 0, 0],
    lineWidth: 0.8,
    cellPadding: 4,
  },
  columnStyles: {
    0: { cellWidth: 110, halign: 'right', fontStyle: 'bold' },
    1: { cellWidth: 60, halign: 'right', textColor: [0, 51, 153] },
  },
  didParseCell: (data) => {
    // 🎨 Colorer uniquement les cellules de gauche (colonne 0)
    if (data.section === 'body' && data.column.index === 0) {
      data.cell.styles.fillColor = [200, 200, 200]; // Gris clair
      data.cell.styles.textColor = [0, 0, 0];       // Texte noir
      data.cell.styles.fontStyle = 'bold';
    } else {
      // ✅ Les cellules de droite restent blanches
      data.cell.styles.fillColor = [255, 255, 255];
    }
  },
  didDrawCell: (data) => {
    doc.setDrawColor(0, 0, 0); // Bordures nettes
  }
});


 
// === Bloc Conditions de règlement à gauche ===
const leftBlockX = marginLeft;
const leftBlockY = (doc as any).lastAutoTable.finalY + 25; // plus d'espace

doc.setFontSize(11);
doc.setFont("helvetica", "bold");
doc.text("Conditions de règlement :", leftBlockX, leftBlockY);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
doc.setTextColor(0, 0, 0);

const lines = [
  "Acompte de :",
  "- 20,00 % à la signature du devis",
  "- 80,00 % à la Solde à la fin des travaux",
  "",
  "Accord client"
];

// Espacement régulier
let lineY = leftBlockY + 10;
for (const line of lines) {
  doc.text(line, leftBlockX, lineY);
  lineY += 12;
}

// === Encadré BON POUR ACCORD ===
const boxY = lineY + 3;
doc.rect(leftBlockX, boxY, 160, 25); // boîte plus large
doc.setFont("helvetica", "bold");
doc.text("BON POUR ACCORD", leftBlockX + 10, boxY + 17);
lineY = boxY + 25;
/* === SIGNATURES (IMAGES UNIQUEMENT) === */
const signatureY = boxY + 35; // juste sous le rectangle "BON POUR ACCORD"
const signatureHeight = 45; // hauteur des signatures
const signatureWidth = 110; // largeur des signatures
const spaceBetween = 25;    // espace entre les deux images

// === Position des signatures ===
const clientX = leftBlockX + 20; // signature client à gauche
const companyX = clientX + signatureWidth + spaceBetween; // signature entreprise à droite

// === Affichage des signatures ===
if (clientSignature) {
  try {
    doc.addImage(clientSignature, 'PNG', clientX, signatureY, signatureWidth, signatureHeight);
  } catch (err) {
    console.warn('⚠️ Erreur affichage signature client:', err);
  }
}

if (companySignature) {
  try {
    doc.addImage(companySignature, 'PNG', companyX, signatureY, signatureWidth, signatureHeight);
  } catch (err) {
    console.warn('⚠️ Erreur affichage signature entreprise:', err);
  }
}


// === PIED DE PAGE ===

// ✅ Définir les dimensions de la page

const pageHeight = doc.internal.pageSize.getHeight();

// Position du pied de page
const footerY = pageHeight - 20; // Ajuste selon ton design (ex : -320 était trop haut)

// Texte du pied de page
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);

// ✅ Correction du footerParts + typo dans clientEmail
const footerParts = [
  { text: 'SEN FIBEM · 51 Rue du Grévarin – 27200 Vernon · ', color: this.DARK_BLUE },
  { text: 'Portable', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.clientPhone || '06.05.51.14.32'} · `, color: this.DARK_BLUE },
  { text: 'Email', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.clientEmail || 'senfibem.paris@outlook.com'} · `, color: this.DARK_BLUE },
  { text: 'SIRET', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.siret || '522 327 824 00010'}`, color: this.DARK_BLUE },
];

// === 🔹 Ligne de séparation noire épaisse ===
doc.setDrawColor(0, 0, 0);   // noir pur
doc.setLineWidth(2);        // épaisseur très visible
doc.line(40, footerY - 15, pageWidth - 40, footerY - 15);
// Calcul de la largeur totale du texte
let footerWidth = 0;
footerParts.forEach(p => (footerWidth += doc.getTextWidth(p.text)));

// Centrage horizontal du pied de page
let currentX = (pageWidth - footerWidth) / 2;

// Dessin du texte avec couleurs distinctes
footerParts.forEach(p => {
  doc.setTextColor(...p.color);
  doc.text(p.text, currentX, footerY);
  currentX += doc.getTextWidth(p.text);
});

// === ⬇️ Créer une nouvelle page avant le dernier tableau
doc.addPage();

// === TABLEAU PRINCIPAL : Détails des Travaux ===
autoTable(doc, {
  startY: 100, // ou la position où tu veux commencer
  head: [
    [
      'Temps M.O.',
      'Désignations d’Ouvrages',
      'U',
      'Prix unit. HT',
      'Qté',
      'Montant Total H.T.',
      'Tps Total'
    ]
  ],
  body: [
    ['', 'DEVIS Fourniture et Pose Ponçage Parquet à Paris: Séjour, 5.60x3.15 & Entre, 2.77x1.33, Nettoyage & Enlèvement des gravois', '', '', '', '', ''],
    ['2,00h', 'Travaux D’INSTALLATIONS CHANTIER', 'Ens', '180,00 €', '1,00', '180,00 €', '2,00h'],
    ['', 'Installation de chantier, comprenant : Bâches de protection, Échafaudage ou Échelle 3 Bandes, etc.', '', '', '', '', ''],
    ['', 'Sous-total Travaux D’INSTALLATIONS CHANTIER', '', '', '', '', '3,00h'],
    ['', 'Travaux Dépose Revêtements pour Ponçage Parquet à Paris: Séjour, 5.60x3.15 & Entre, 2.77x1.33', '', '', '', '', ''],
    ['4,00h', 'Dépose & Nettoyage Revêtements pour Ponçage Parquet à Paris: Séjour, 5.60x3.15 & Entre, 2.77x1.33', 'Ens', '280,00 €', '1,00', '280,00 €', '4,00h'],
    ['', 'Sous-total Travaux Dépose Revêtements pour Ponçage Parquet à Paris', '', '', '', '', '4,00h'],
    ['', 'Travaux Revêtement Préparation pour Ponçage Parquet à Paris', '', '', '', '', ''],
    ['3,00h', 'Fourniture et Pose Rénovation de Préparation Revêtement pour Ponçage Parquet à Paris', 'Ens', '300,00 €', '1,00', '300,00 €', '3,00h'],
    ['', 'Sous-total Travaux Revêtement d’Impression Préparation pour Ponçage Parquet à Paris', '', '', '', '', '5,00h'],
    ['', 'Travaux Finitions pour Ponçage Parquet à Paris', '', '', '', '', ''],
    ['2,00h', 'Fourniture et Pose Finitions 2 couches pour Ponçage Parquet à Paris', 'Ens', '370,00 €', '1,00', '370,00 €', '2,00h'],
    ['', 'Sous-total Travaux Finitions 2 couches pour Ponçage Parquet à Paris', '', '', '', '', '3,00h'],
    ['', 'Prestation 11 : Travaux Assistance technique MAÇONNERIE & Mise à disposition, 1 Technicien Mr Macire Dembélé', '', '', '', '', ''],
    ['2,00h', 'Travaux Assistance technique MAÇONNERIE & Mise à disposition, 1 Technicien Mr Macire Dembélé (Sans Outillages portatif) durée Mini 3 Mois avant Tembauche', 'Ens', '450,00 €', '1,00', '450,00 €', '2,00h']
  ],

  theme: 'grid',
  styles: {
    fontSize: 9,
    textColor: [0, 51, 153],
    lineColor: [0, 0, 0],
    lineWidth: 0.4,
    cellPadding: 3,
  },
  headStyles: {
    fillColor: [230, 230, 230],
    textColor: [0, 0, 0],
    halign: 'center',
    fontStyle: 'bold',
  },

  // ✅ Marges identiques au tableau récapitulatif (centrage parfait)
  margin: { top: 60, left: 40, right: 20 },
  tableWidth: 'wrap', // équilibre automatique entre les marges

  // ✅ Largeurs équilibrées proportionnellement à la page
  columnStyles: {
    0: { cellWidth: 55, halign: 'center' },  // Temps M.O.
    1: { cellWidth: 220 },                   // Désignation
    2: { cellWidth: 30, halign: 'center' },  // U
    3: { cellWidth: 60, halign: 'right' },   // Prix unit. HT
    4: { cellWidth: 35, halign: 'center' },  // Qté
    5: { cellWidth: 65, halign: 'right' },   // Montant HT
    6: { cellWidth: 45, halign: 'center' },  // Tps Total
  }
});


// === PIED DE PAGE CENTRÉ ===

// Configuration du texte
doc.setFont('helvetica', 'bold');
doc.setFontSize(7.5);

const footerContent = [
  { text: 'SEN FIBEM · 51 Rue du Grévarin – 27200 Vernon · ', color: this.DARK_BLUE },
  { text: 'Portable', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.clientPhone || '06.05.51.14.32'} · `, color: this.DARK_BLUE },
  { text: 'Email', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.clientEmail || 'senfibem.paris@outlook.com'} · `, color: this.DARK_BLUE },
  { text: 'SIRET', color: [20, 20, 20] as [number, number, number] },
  { text: ` : ${devis.siret || '522 327 824 00010'}`, color: this.DARK_BLUE },
];

// === 🔹 Ligne de séparation noire épaisse ===
doc.setDrawColor(0, 0, 0);   // noir pur
doc.setLineWidth(2);        // épaisseur très visible
doc.line(40, footerY - 15, pageWidth - 40, footerY - 15);

// 🔹 Calcul de la largeur totale pour centrage
let totalFooterWidth = 0;
footerContent.forEach(p => {
  totalFooterWidth += doc.getTextWidth(p.text);
});

// Point de départ pour centrer le texte
let footerStartX = (pageWidth - totalFooterWidth) / 2;

// 🔹 Dessin du texte coloré et centré
footerContent.forEach(p => {
  doc.setTextColor(...p.color);
  doc.text(p.text, footerStartX, footerY);
  footerStartX += doc.getTextWidth(p.text);
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



doc.save(`Devis_${devis.number || 'DE_0031'}.pdf`);

  }


}
