import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Booking, BookingResponse, Status } from '../models/booking.model';
import { objectKeysFormatter } from '../shared';
import { BookingService } from './booking.service';

@Injectable({
  providedIn: 'root',
})
export class DataFormatService {
  constructor(private bookingService: BookingService) {}

  loadBookings(
    status: Status,
    entityNo: number,
    startDate?: string,
    endDate?: string
  ) {
    return this.bookingService
      .getBookingForEntity(entityNo, startDate, endDate)
      .pipe(
        map((bookings: BookingResponse) => {
          return bookings.bookingMap;
        }),
        map((bookings: Record<string, Booking[]>) => {
          return objectKeysFormatter(bookings);
        }),
        map((bookings: Booking[]) => {
          return bookings.filter((booking) => {
            return booking.status === status;
          });
        })
      );
  }
}
