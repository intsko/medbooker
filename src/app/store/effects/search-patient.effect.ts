import { Status } from './../../models/booking.model';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from './../../services/booking.service';
import { map, switchMap, catchError, of, mergeMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchPatientsAction from '../actions/search-patient.action';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class SearchPatientsEffect {
  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private bookingService: BookingService
  ) {}

  loadAllPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPatientsAction.loadPatients),
      switchMap(() => {
        return this.patientService.getAllPatients();
      }),
      map((patients: Patient[]) => {
        return SearchPatientsAction.loadPatientsSuccess({ patients });
      }),
      catchError(() => of(SearchPatientsAction.loadPatientsFailure()))
    );
  });

  loadSinglePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPatientsAction.loadSinglePatient),
      switchMap(({ firstName, lastName }) => {
        return this.patientService.searchPatient(firstName, lastName);
      }),
      map((patient: Patient[]) => {
        return SearchPatientsAction.loadSinglePatientSuccess({ patient });
      }),
      catchError(() => of(SearchPatientsAction.loadSinglePatientFailure()))
    );
  });

  createBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchPatientsAction.createBooking),
      mergeMap(({ body }) => {
        return this.bookingService.createBooking(body).pipe(
          switchMap((booking: Booking) => {
            const updateBody = {
              bookingStatus: Status.CONFIRMED,
              comment: '',
              includeDependent: false,
            };
            return this.bookingService.updateBooking(booking.id, updateBody);
          }),
          map((booking: Booking) => {
            return SearchPatientsAction.createBookingSuccess({ booking });
          }),
          catchError(() => of(SearchPatientsAction.createBookingFailure()))
        );
      })
    );
  });
}
