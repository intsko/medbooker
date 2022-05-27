import { Patient } from './../../models/patient.model';

export interface PatientSeachState {
  patients: Patient[] | undefined;
  detailsInfo: Patient | undefined;
}

export const initialPatientSearchState: PatientSeachState = {
  patients: [],
  detailsInfo: undefined,
};
