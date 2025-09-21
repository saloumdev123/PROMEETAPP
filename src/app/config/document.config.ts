// documents.config.ts
export const DOCUMENTS_BY_CATEGORY: Record<string, string[]> = {
  PARTICULIER: [
    "Carte d’identité",
    "CV",
    "Certificat de résidence",
    "Attestation fiscale (si nécessaire)"
  ],
  ARTISAN: [
    "Carte professionnelle",
    "Portfolio ou références",
    "NINEA",
    "Carte d’identité"
  ],
  PARTENAIRE: [
    "Statuts",
    "Registre de commerce",
    "Attestation fiscale et sociale",
    "Contrat ou protocole"
  ],
  CANDIDAT: [
    "CV",
    "Diplômes",
    "Lettre de motivation",
    "Carte d’identité"
  ],
  STAGIAIRE: [
    "CV",
    "Convention de stage",
    "Carte d’étudiant",
    "Assurance"
  ],
  COMMERCIAL: [
    "Carte d’identité",
    "Contrat de collaboration",
    "Accord de confidentialité (NDA)"
  ]
};
