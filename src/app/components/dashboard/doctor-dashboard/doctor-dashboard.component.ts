import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AuthService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import { Booking, EventModel, Status } from 'src/app/models';
import {
  changeBookingStatus,
  loadPastBookings,
  setInitialBookingState,
} from 'src/app/store/actions';
import { bookingsSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorDashboardComponent implements OnInit, OnDestroy {
  bookings$: Observable<Booking[]> | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  ngOnDestroy(): void {
    this.store.dispatch(setInitialBookingState());
  }

  loadBookings() {
    if (this.authService.currentUser) {
      const entityNo = this.authService.currentUser.entityNo;
      const upcomingBookings = this.router.url.includes('dashboard');
      const status = Status.TENTATIVE;
      this.store.dispatch(
        loadPastBookings({ entityNo, futureBookings: upcomingBookings, status })
      );
      this.bookings$ = this.store.select(bookingsSelector).pipe(
        map((bookings: Booking[]) => {
          return bookings.slice(0, 5);
        })
      );
    }
  }

  statusChangeHandler(data: EventModel) {
    const bookingUpdate = {
      bookingStatus: data.status,
      comment: '',
      includeDependent: false,
    };

    this.store.dispatch(changeBookingStatus({ id: data.id, bookingUpdate }));
  }
}
