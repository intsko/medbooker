import { createReducer, on } from '@ngrx/store';
import * as SearchPatientsAction from '../actions/search-patient.action';
import { initialPatientSearchState } from '../states/search-patient.state';

export const searchPatientsReducer = createReducer(
  initialPatientSearchState,
  on(SearchPatientsAction.loadPatientsSuccess, (state, action) => ({
    ...state,
    patients: action.patients,
  })),
  on(SearchPatientsAction.loadSinglePatientSuccess, (state, action) => ({
    ...state,
    patients: action.patient,
  })),
  on(SearchPatientsAction.loadSinglePatientFailure, (state, action) => ({
    ...state,
    patients: [],
  })),

  on(SearchPatientsAction.createBookingSuccess, (state, action) => {
    return {
      ...state,
      detailsInfo: undefined,
      booking: action.booking,
    };
  }),
  on(SearchPatientsAction.loadSinglePatientFailure, (state, action) => ({
    ...state,
    booking: [],
  })),

  on(SearchPatientsAction.updateBookingSuccess, (state, action) => ({
    ...state,
    booking: action.booking,
  })),
  on(SearchPatientsAction.updateBookingFailure, (state, action) => ({
    ...state,
    booking: [],
  })),

  on(SearchPatientsAction.displayDetailsInfo, (state, action) => ({
    ...state,
    detailsInfo: action.patient,
  })),
  on(SearchPatientsAction.setDetailsInfoInitialState, (state, action) => ({
    ...state,
    detailsInfo: undefined,
  }))
);
