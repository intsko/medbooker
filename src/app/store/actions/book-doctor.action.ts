import { Doctor } from '../../models/doctor.model';
import { BookingRequest } from './../../models/booking.model';
import { createAction, props } from '@ngrx/store';

export const getSingleDoctor = createAction(
  '[Get Doctor] Get Single Doctor',
  props<{ entityNo: number }>()
);

export const getSingleDoctorSuccess = createAction(
  '[Get Doctor] Get Single Doctor Success',
  props<{ doctor: Doctor }>()
);

export const getSingleDoctorFailure = createAction(
  '[Get Doctor] Get Single Doctor Failure'
);

export const bookDoctor = createAction(
  '[Book Doctor] Book Doctor',
  props<{ body: BookingRequest }>()
);

export const bookDoctorSuccess = createAction(
  '[Book Doctor] Book Doctor Success'
);

export const bookDoctorFailure = createAction(
  '[Book Doctor] Book Doctor Failure'
);
