import { Doctor } from '../../models/doctor.model';

export interface BookDoctorState {
  doctor: Doctor | undefined;
}

export const initialBookDoctorState: BookDoctorState = {
  doctor: undefined,
};
