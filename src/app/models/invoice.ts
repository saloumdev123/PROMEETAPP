import { InvoiceStatus } from "../enums/invoiceStatus";

export interface Invoice {
   id?: number;
  invoiceNumber?: string;
  title?: string;
  description?: string;
  currency?: string;

  issueDate?: string;
  dueDate?: string;
  paymentMode?: string;
  reference?: string;
  devisNumber?: string;

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

  companyName?: string;
  companyContact?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  companySiret?: string;
  companyApe?: string;
  companyTvaNumber?: string;

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