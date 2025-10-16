export type DocumentType = 'facture' | 'avoir' | 'devis';

export interface Company {
  id?: string;
  name: string;
  address: string;
  phone1?: string;
  phone2?: string;
  email?: string;
  siret?: string;
  codeApe?: string;
  tvaNumber?: string;
  director?: string;
  logoUrl?: string;
}

export interface Client {
  id?: string;
  name: string;
  address?: string;
  phone?: string;
  mobile?: string;
  email?: string;
}

export interface Document {
  id?: string;
  documentType: DocumentType;
  documentNumber: string;
  documentDate: string;
  companyId?: string;
  clientId?: string;
  reference?: string;
  modeReglement?: string;
  echeance?: string;
  nIdCee?: string;
  tauxEuro?: number;
  remiseGlobale?: number;
  tauxTva?: number;
  remarks?: string;
}

export interface DocumentItem {
  id?: string;
  documentId?: string;
  reference?: string;
  designation: string;
  nbHeures?: number;
  puHt: number;
  remisePercent?: number;
  remiseHt?: number;
  montantHt: number;
  tva?: number;
  orderIndex?: number;
}