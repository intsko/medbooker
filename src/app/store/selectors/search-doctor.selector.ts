import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const searchPageSelector = (state: AppState) => state.doctorSearch;

export const searchDoctorSelector = createSelector(
  searchPageSelector,
  (state) => state.doctors
);
