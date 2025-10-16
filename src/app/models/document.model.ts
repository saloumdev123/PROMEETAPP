export type DocumentType = 'facture' | 'avoir' | 'devis';
export interface CompanyInfo {
   id?: number;
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

export interface DocumentInfo {
  id?: number;
  documentType: string;
  company: number; // ou CompanyInfo si tu veux l'objet complet
  client: number;
  documentNumber: string;
  documentDate: string;
  reference?: string;
  modeReglement?: string;
  echeance?: string;
  nIdCee?: string;
  tauxEuro?: number;
  remiseGlobale?: number;
  tauxTva?: number;
  remarks?: string;
  items?: any[];
}
export interface ClientInfo {
  id?: number;
  company: string;
  manager: string;
  address: string;
  phone: string;
  mobile?: string;
  email: string;
}

export interface ServiceItem {
  designation: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  time?: string;
}

export interface DevisData {
  number: string;
  date: string;
  reference: string;
  affaire: string;
  lieu: string;
  department: string;
  company: CompanyInfo;
  client: ClientInfo;
  services: ServiceItem[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  paymentConditions: {
    deposit: number;
    balance: number;
  };
}

export interface FactureData {
  number: string;
  date: string;
  reference: string;
  devisNumber: string;
  paymentMode: string;
  acompte: number;
  company: CompanyInfo;
  client: ClientInfo;
  services: ServiceItem[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  netToPay: number;
  bankInfo: {
    bank: string;
    iban: string;
    orderName: string;
    address: string;
  };
}

export interface AvoirData {
  number: string;
  date: string;
  reference: string;
  factureNumber: string;
  factureDate: string;
  paymentMode: string;
  company: CompanyInfo;
  client: ClientInfo;
  services: ServiceItem[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  netToRefund: number;
  description: string;
  originalDevis: string;
  refundBank: {
    bank: string;
    iban: string;
    address: string;
  };
}