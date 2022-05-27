import { Roles } from './../../models/user.model';
import { AttendeeType, Booking } from './../../models/booking.model';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap, forkJoin } from 'rxjs';
import { Status } from 'src/app/models/booking.model';
import {
  BookingService,
  DataFormatService,
  DoctorService,
} from 'src/app/services';
import * as BookingCardActions from '../actions/booking-card.action';

@Injectable({ providedIn: 'root' })
export class BookingCardEffect {
  constructor(
    private actions$: Actions,
    private dataFormatService: DataFormatService,
    private bookingService: BookingService,
    private doctorService: DoctorService
  ) {}

  loadPastBookings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingCardActions.loadPastBookings),
      mergeMap(({ entityNo, futureBookings, status }) => {
        const startDate = futureBookings ? new Date().toISOString() : '';
        const endDate = !futureBookings ? new Date().toISOString() : '';

        return this.dataFormatService
          .loadBookings(status, entityNo, startDate, endDate)
          .pipe(
            switchMap((bookings: Booking[]) => {
              if (bookings.length) {
                return forkJoin(
                  bookings.map((booking) => {
                    const entityNo = booking.attendees.find(
                      (booking) =>
                        booking.attendeeType === AttendeeType.PROVIDER
                    )?.entityNo;

                    if (entityNo && entityNo === Roles.Doctor) {
                      return this.doctorService.getSingleDoctor(entityNo).pipe(
                        map((doctor) => {
                          return {
                            ...booking,
                            practiceName: doctor.practiceName,
                          };
                        })
                      );
                    }

                    return of(booking);
                  })
                );
              }
              return of(bookings);
            }),
            map((bookings: Booking[]) => {
              return BookingCardActions.loadPastBookingsSuccess({ bookings });
            }),
            catchError(() => of(BookingCardActions.loadPastBookingsFail()))
          );
      })
    );
  });

  cancelPastBooking$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingCardActions.cancelPastBooking),
      switchMap(({ id, body }) => {
        return this.bookingService.updateBooking(id, body).pipe(
          map((booking: Booking) => {
            return BookingCardActions.cancelPastBookingSuccess({
              id: booking.id,
            });
          }),
          catchError(() => of(BookingCardActions.loadPastBookingsFail()))
        );
      })
    );
  });

  changeBookingStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookingCardActions.changeBookingStatus),
      switchMap(({ id, bookingUpdate }) => {
        return this.bookingService.updateBooking(id, bookingUpdate).pipe(
          map((booking: Booking) => {
            return BookingCardActions.changeBookingStatusSuccess({
              id: booking.id,
            });
          }),
          catchError(() => of(BookingCardActions.changeBookingStatusFail()))
        );
      })
    );
  });
}
