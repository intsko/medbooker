import { Booking } from 'src/app/models/booking.model';

export interface BookingCardState {
  bookings: Booking[];
}

export const initialBookingCardState: BookingCardState = {
  bookings: [],
};
