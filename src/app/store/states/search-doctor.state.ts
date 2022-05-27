import { Doctor } from 'src/app/models/doctor.model';

export interface DoctorSeachState {
  doctors: Doctor[] | undefined;
}

export const initialDoctorSearchState: DoctorSeachState = {
  doctors: [],
};
