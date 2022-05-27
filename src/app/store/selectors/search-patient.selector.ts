import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const patientSearchSelector = (state: AppState) => state.patientSearch;

export const searchPatientSelector = createSelector(
  patientSearchSelector,
  (state) => state.patients
);

export const displayInfo = createSelector(
  patientSearchSelector,
  (state) => state.detailsInfo
);
