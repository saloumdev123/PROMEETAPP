export interface Avoir {
  id?: number;
  number?: string;
  dateEmission?: string;
  dateEcheance?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  clientAddress?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  companySiret?: string;
  companyApe?: string;
  companyTvaNumber?: string;
  paymentMode?: string;
  reference?: string;
  devisNumber?: string;
  remarque?: string;
  baseHt?: number;
  mtTva?: number;
  totalTtc?: number;
  acompte?: number;
  netAPayer?: number;
  items?: {
    referenceCode?: string;
    label?: string;
    quantity?: number;
    unitPrice?: number;
    discountRate?: number;
    tvaRate?: number;
  }[];

}
