import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/states/app.state';
import { AttendeeType, BookingRequest, Doctor, User } from 'src/app/models';
import { bookDoctor, getSingleDoctor } from 'src/app/store/actions';
import { bookDoctorSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  doctor$: Observable<Doctor | undefined> | undefined;
  docId: number = 0;
  date: Date | undefined;
  currentUserRole: number | undefined;
  currentUser: User | undefined;
  value: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.docId = Number(id);
    }

    this.store.dispatch(getSingleDoctor({ entityNo: this.docId }));
    this.doctor$ = this.store.select(bookDoctorSelector);

    this.currentUserRole = this.authService.usserRole;
    this.currentUser = this.authService.currentUser;
  }

  get currentDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  book(doctor: Doctor) {
    if (this.currentUser && doctor && this.date) {
      const startTime = new Date(this.date);
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      const body: BookingRequest = {
        attendees: [
          {
            attendeeType: AttendeeType.PATIENT,
            entity: {
              entityNo: this.currentUser.entityNo,
              firstName: this.currentUser.firstName,
              lastName: this.currentUser.lastName,
            },
            entityNo: this.currentUser.entityNo,
          },
          {
            attendeeType: AttendeeType.PROVIDER,
            entity: {
              entityNo: doctor.entityNo,
              firstName: doctor.firstName,
              lastName: doctor.lastName,
            },
            entityNo: doctor.entityNo,
          },
        ],
        description: '',
        endDate: endTime.toISOString(),
        id: 0,
        organiser: this.currentUser.entityNo,
        startDate: startTime.toISOString(),
        title: '',
      };

      this.store.dispatch(bookDoctor({ body }));
    }
  }
}
