import { getSingleDoctorReducer } from './book-doctor.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { bookigCardReducer } from './booking-card.reducer';
import { searchDoctorReducer } from './search-doctor.reducer';
import { searchPatientsReducer } from './search-patient.reducer';

export const reducers: ActionReducerMap<AppState> = {
  healthPage: bookigCardReducer,
  doctorSearch: searchDoctorReducer,
  patientSearch: searchPatientsReducer,
  bookDoctorPage: getSingleDoctorReducer,
};
