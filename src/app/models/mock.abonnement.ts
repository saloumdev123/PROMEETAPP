import { Abonnement } from "./abonnement";


export const ABONNEMENTS_MOCK: Abonnement[] = [
  {
    id: 1,
    type: 'Mensuel',
    dateDebut: '2025-01-01',
    dateFin: '2025-01-31',
    actif: true,
    candidatId: 101
  },
  {
    id: 2,
    type: 'Trimestriel',
    dateDebut: '2025-02-01',
    dateFin: '2025-04-30',
    actif: true,
    candidatId: 102
  },
  {
    id: 3,
    type: 'Annuel',
    dateDebut: '2025-01-01',
    dateFin: '2025-12-31',
    actif: false,
    candidatId: 103
  }
];
