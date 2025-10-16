import { InvoiceStatus } from "../enums/invoiceStatus";

export interface Invoice {
   id: number;
  invoiceNumber?: string;
  title?: string;
  description?: string;
  currency?: string;
remise?: number;       // ✅ Ajouté
  taxRate: number;       // ✅ déjà présent mais confirmé
  port?: number;
  issueDate?: string;
  dueDate?: string;
  paymentMode?: string;
  reference?: string;
  devisNumber?: string;
  remarque?: string;
  conditionReglement?: string;
  subTotal?: number;
  taxAmount?: number;
  total?: number;
  amountDue?: number;

  status?: InvoiceStatus;

  clientName?: string;
  clientEmail?: string;
  clientAddress?: string;
  clientPhone?: string;
  clientMobile?: string;
  clientContact?: string;
  clientTvaNumber?: string;
  number?: string;
  acompte?: number;
  companyName?:string;
  companyContact?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companySiret?: string;
  companyApe?: string;
  companyTvaNumber?: string

  items?: InvoiceItem[];
}
export interface InvoiceItem {
  id?: number;
  referenceCode?: string;
  label: string;
  quantity: number;
  unitPrice: number;
  discountRate?: number;
  lineTotal: number;
  tvaRate?: number;
}