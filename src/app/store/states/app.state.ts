import { BookDoctorState, initialBookDoctorState } from './book-doctor.state';
import {
  initialPatientSearchState,
  PatientSeachState,
} from './search-patient.state';
import {
  DoctorSeachState,
  initialDoctorSearchState,
} from './search-doctor.state';
import {
  BookingCardState,
  initialBookingCardState,
} from './booking-card.state';

export interface AppState {
  healthPage: BookingCardState;
  doctorSearch: DoctorSeachState;
  patientSearch: PatientSeachState;
  bookDoctorPage: BookDoctorState;
}

export const initialAppState: AppState = {
  healthPage: initialBookingCardState,
  doctorSearch: initialDoctorSearchState,
  patientSearch: initialPatientSearchState,
  bookDoctorPage: initialBookDoctorState,
};
