import { reservations } from '../data/mockData';
import { Reservation } from '../types/guestflow.types';

export function getAllReservations(): Reservation[] {
  return [...reservations];
}
