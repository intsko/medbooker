import { Status } from './../../models/booking.model';
import { createAction, props } from '@ngrx/store';
import {
  Booking,
  BookingStatusUpdateRequest,
} from 'src/app/models/booking.model';

export const loadPastBookings = createAction(
  '[Load Bookings] Load Confirmed Bookings',
  props<{ entityNo: number; futureBookings: boolean; status: Status }>()
);

export const loadPastBookingsSuccess = createAction(
  '[Load Bookings] Load Confirmed Bookings (Success)',
  props<{ bookings: Booking[] }>()
);

export const loadPastBookingsFail = createAction(
  '[Load Bookings] Load Confirmed Bookings (Fail)'
);

// ***************************

export const selectPastBookings = createAction(
  '[Select Booking] Select Past Booking',
  props<{ booking: Booking }>()
);

export const clearPastBookings = createAction(
  '[Clear Booking] Clear Past Booking'
);

export const cancelPastBooking = createAction(
  '[Cancel Booking] Cancel Past Booking',
  props<{ id: number; body: BookingStatusUpdateRequest }>()
);

export const cancelPastBookingSuccess = createAction(
  '[Cancel Booking] Cancel Past Booking (Success)',
  props<{ id: number }>()
);

export const setInitialBookingState = createAction(
  '[Initial State] Set initial booking state'
);

export const changeBookingStatus = createAction(
  '[Booking Status] Change Booking Status',
  props<{ id: number; bookingUpdate: BookingStatusUpdateRequest }>()
);

export const changeBookingStatusSuccess = createAction(
  '[Booking Status] Change Booking Status (Success)',
  props<{ id: number }>()
);

export const changeBookingStatusFail = createAction(
  '[Booking Status] Change Booking Status (Fail)'
);
