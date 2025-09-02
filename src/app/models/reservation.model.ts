export interface Reservation {
  id?: number;
  clientId: number;
  offreId: number;
  dateReservation: string;
  dateService: string;
  statut: string;
  client?: any;
  offre?: any;
  createdAt?: Date;
  updatedAt?: Date;
}