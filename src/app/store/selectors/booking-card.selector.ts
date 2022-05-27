import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

const healthPageSelector = (state: AppState) => state.healthPage;

export const bookingsSelector = createSelector(
  healthPageSelector,
  (state) => state.bookings
);
