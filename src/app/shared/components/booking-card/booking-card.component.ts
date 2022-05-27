import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import { Booking, DoctorBooking, Roles, Status } from 'src/app/models';
import {
  cancelPastBooking,
  loadPastBookings,
  setInitialBookingState,
} from 'src/app/store/actions';
import { bookingsSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent implements OnInit, OnDestroy {
  role = Roles;
  roleNumber = this.authService.currentUser
    ? this.authService.currentUser.entityNo
    : 0;
  bookings$: Observable<Booking[] | DoctorBooking[]> | undefined;
  @Input() showButton: boolean = true;
  @Input() status: string | undefined;
  bookingStatus: Status | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  ngOnDestroy() {
    this.store.dispatch(setInitialBookingState());
  }

  loadBookings() {
    if (this.authService) {
      const futureBookings = this.router.url.includes('upcoming-consultations');
      const entityNo = this.authService.usserRole;
      const status = Status.CONFIRMED;

      this.store.dispatch(
        loadPastBookings({ entityNo, futureBookings, status })
      );
      this.bookings$ = this.store.select(bookingsSelector);
    }
  }

  cancelBooking(id: number) {
    const body = {
      bookingStatus: Status.CANCELLED,
      comment: '',
      includeDependent: false,
    };

    this.store.dispatch(cancelPastBooking({ id, body }));
  }
}
