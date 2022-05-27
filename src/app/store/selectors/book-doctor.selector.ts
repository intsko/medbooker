import { AppState } from '../states/app.state';
import { createSelector } from '@ngrx/store';

const bookDoctorPage = (state: AppState) => state.bookDoctorPage;

export const bookDoctorSelector = createSelector(
  bookDoctorPage,
  (state) => state.doctor
);
