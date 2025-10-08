import { Document } from './document';

export const DOCUMENTS_MOCK: Document[] = [
  {
    id: 1,
    nomFichier: 'cv_papa.pdf',
    type: 'CV',
    candidatId: 101
  },
  {
    id: 2,
    nomFichier: 'lettre_motivation.pdf',
    type: 'Lettre de motivation',
    candidatId: 101
  },
  {
    id: 3,
    nomFichier: 'portfolio.pdf',
    type: 'Portfolio',
    candidatId: 102
  }
];
