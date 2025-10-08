export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // numéro de page en cours
  size: number;   // taille de la page
}
