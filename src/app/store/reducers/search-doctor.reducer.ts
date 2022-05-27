import { createReducer, on } from '@ngrx/store';
import * as SearchDoctorsAction from '../actions/search-doctor.action';
import { initialDoctorSearchState } from '../states/search-doctor.state';

export const searchDoctorReducer = createReducer(
  initialDoctorSearchState,
  on(SearchDoctorsAction.loadDoctorsSuccess, (state, action) => ({
    ...state,
    doctors: action.doctors,
  })),
  on(SearchDoctorsAction.loadSingleDoctorSuccess, (state, action) => ({
    ...state,
    doctors: action.doctor,
  })),
  on(SearchDoctorsAction.loadSingleDoctorFailure, (state, action) => ({
    ...state,
    doctors: [],
  }))
);
