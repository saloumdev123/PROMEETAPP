export interface DevisItem {
  id?: number;
  referenceCode?: string;
  label?: string;
  quantity: number;
  unitPrice: number;
  discountRate: number;
  lineTotal?: number;
  tvaRate?: number;
  devisId?: number;
}