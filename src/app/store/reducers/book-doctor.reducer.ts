import { initialBookDoctorState } from '../states/book-doctor.state';
import { createReducer, on } from '@ngrx/store';
import * as BookDoctorAction from '../actions/book-doctor.action';

export const getSingleDoctorReducer = createReducer(
  initialBookDoctorState,
  on(BookDoctorAction.getSingleDoctorSuccess, (state, action) => {
    return {
      ...state,
      doctor: action.doctor,
    };
  }),
  on(BookDoctorAction.bookDoctorSuccess, (state, action) => {
    return {
      ...state,
    };
  })
);
