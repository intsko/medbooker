import { createAction, props } from '@ngrx/store';
import { Doctor } from 'src/app/models/doctor.model';

export const loadDoctors = createAction('[Doctors] Load All Doctors');

export const loadDoctorsSuccess = createAction(
  '[Load Doctors] Load All Doctors Success',
  props<{ doctors: Doctor[] }>()
);

export const loadDoctorsFailure = createAction(
  '[Load Doctors] Load All Doctors Failure'
);

export const loadSingleDoctor = createAction(
  '[Load Doctor] Load Single Doctor',
  props<{ firstName: string; lastName: string }>()
);

export const loadSingleDoctorSuccess = createAction(
  '[Load Doctor] Load Single Doctor Success',
  props<{ doctor: Doctor[] }>()
);

export const loadSingleDoctorFailure = createAction(
  '[Load Doctor] Load Single Doctor Failure'
);
