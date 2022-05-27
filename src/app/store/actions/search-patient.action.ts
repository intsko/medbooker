import { Patient } from './../../models/patient.model';
import { createAction, props } from '@ngrx/store';
import {
  Booking,
  BookingRequest,
  BookingStatusUpdateRequest,
} from 'src/app/models/booking.model';

export const loadPatients = createAction('[Patients] Load All Patients');

export const loadPatientsSuccess = createAction(
  '[Load Patients] Load All Patients Success',
  props<{ patients: Patient[] }>()
);

export const loadPatientsFailure = createAction(
  '[Load Patients] Load All Patients Failure'
);

export const loadSinglePatient = createAction(
  '[Load Patient] Load Single Patient',
  props<{ firstName: string; lastName: string }>()
);

export const loadSinglePatientSuccess = createAction(
  '[Load Patient] Load Single Patient Success',
  props<{ patient: Patient[] }>()
);

export const loadSinglePatientFailure = createAction(
  '[Load Patient] Load Single Patient Failure'
);

// ********************************************

export const createBooking = createAction(
  '[Create Booking] Create Booking For Doctor',
  props<{ body: BookingRequest }>()
);

export const createBookingSuccess = createAction(
  '[Create Booking] Create Booking For Doctor Success',
  props<{ booking: Booking }>()
);

export const createBookingFailure = createAction(
  '[Create Booking] Create Booking For Doctor Failure'
);

// ********************************************

export const updateBooking = createAction(
  '[Update Booking] Update booking',
  props<{ bookingId: number; body: BookingStatusUpdateRequest }>()
);

export const updateBookingSuccess = createAction(
  '[Update Booking] Update booking Success',
  props<{ booking: Booking }>()
);

export const updateBookingFailure = createAction(
  '[Update Booking] Update booking Failure'
);

export const displayDetailsInfo = createAction(
  '[Details] display details info',
  props<{ patient: Patient }>()
);

export const setDetailsInfoInitialState = createAction(
  '[Details] Set details initial state'
);
