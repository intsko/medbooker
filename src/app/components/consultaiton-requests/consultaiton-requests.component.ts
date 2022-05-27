import { Router } from '@angular/router';
import {
  loadPastBookings,
  changeBookingStatus,
  setInitialBookingState,
} from './../../store/actions/booking-card.action';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import { Booking, EventModel, Status } from 'src/app/models';
import { bookingsSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-consultaiton-requests',
  templateUrl: './consultaiton-requests.component.html',
  styleUrls: ['./consultaiton-requests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaitonRequestsComponent implements OnInit, OnDestroy {
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
      const futureBookings = this.router.url.includes('consultation-requests');
      const entityNo = this.authService.currentUser.entityNo;
      const status = Status.TENTATIVE;

      this.store.dispatch(
        loadPastBookings({ entityNo, futureBookings, status })
      );
      this.bookings$ = this.store.select(bookingsSelector);
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
