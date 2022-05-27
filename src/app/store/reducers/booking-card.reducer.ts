import { BookingCardState } from './../states/booking-card.state';
import { createReducer, on } from '@ngrx/store';
import * as BookingCardActions from '../actions/booking-card.action';
import { initialBookingCardState } from '../states/booking-card.state';

export const bookigCardReducer = createReducer(
  initialBookingCardState,
  on(
    BookingCardActions.loadPastBookingsSuccess,
    (state, action): BookingCardState => {
      return {
        ...state,
        bookings: action.bookings,
      };
    }
  ),
  on(
    BookingCardActions.loadPastBookingsFail,
    (state, action): BookingCardState => {
      return {
        ...state,
        bookings: [],
      };
    }
  ),
  on(
    BookingCardActions.cancelPastBookingSuccess,
    (state, action): BookingCardState => {
      const updatedBookings = state.bookings.filter(
        (booking) => booking.id !== action.id
      );

      return {
        ...state,
        bookings: updatedBookings,
      };
    }
  ),
  on(
    BookingCardActions.setInitialBookingState,
    (state, action): BookingCardState => {
      return {
        ...state,
        ...initialBookingCardState,
      };
    }
  ),
  on(
    BookingCardActions.changeBookingStatusSuccess,
    (state, action): BookingCardState => {
      const updatedBookings = state.bookings.filter(
        (booking) => booking.id !== action.id
      );

      return {
        ...state,
        bookings: updatedBookings,
      };
    }
  )
);
