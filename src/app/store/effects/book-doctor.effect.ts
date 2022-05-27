import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { map, switchMap, catchError, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BookDoctorAction from '../actions/book-doctor.action';
import { Doctor } from 'src/app/models/doctor.model';
import { BookingService } from 'src/app/services';

@Injectable({
  providedIn: 'root',
})
export class BookDoctorEffect {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  getSingleDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookDoctorAction.getSingleDoctor),
      switchMap(({ entityNo }) => {
        return this.doctorService.getSingleDoctor(entityNo);
      }),
      map((doctor: Doctor) => {
        return BookDoctorAction.getSingleDoctorSuccess({ doctor });
      }),
      catchError(() => of(BookDoctorAction.getSingleDoctorFailure()))
    );
  });

  createBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookDoctorAction.bookDoctor),
      switchMap(({ body }) => {
        return this.bookingService.createBooking(body);
      }),
      map(() => {
        return BookDoctorAction.bookDoctorSuccess();
      }),
      tap(() => {
        this.router.navigate(['/upcoming-consultations']);
      }),
      catchError(() => of(BookDoctorAction.bookDoctorFailure()))
    );
  });
}
