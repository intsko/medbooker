import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services';
import { AppState } from 'src/app/store/states/app.state';
import { AttendeeType, BookingRequest, Patient, User } from 'src/app/models';
import {
  createBooking,
  displayDetailsInfo,
  loadPatients,
  loadSinglePatient,
  setDetailsInfoInitialState,
} from 'src/app/store/actions';
import { displayInfo, searchPatientSelector } from 'src/app/store/selectors';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  firstName: string = '';
  lastName: string = '';
  patients$: Observable<Patient[] | undefined> | undefined;
  patientName: string | undefined;
  detailsInfo: boolean = false;
  patient$: Observable<Patient | undefined> | undefined;
  dateValue: string | undefined;
  date: string | undefined;
  currentUser: User | undefined;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {
    this.store.dispatch(setDetailsInfoInitialState());
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.store.dispatch(loadPatients());
    this.patients$ = this.store.select(searchPatientSelector);
    this.patient$ = this.store.select(displayInfo);
  }

  get currentDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }

  searchPatient() {
    if (!this.firstName && !this.lastName) {
      return;
    }

    this.store.dispatch(
      loadSinglePatient({ firstName: this.firstName, lastName: this.lastName })
    );

    this.firstName = '';
    this.lastName = '';
  }

  createAppointment(patient: Patient) {
    this.store.dispatch(displayDetailsInfo({ patient }));
  }

  createBooking(patient: Patient) {
    console.log(patient);
    if (patient && this.currentUser && this.dateValue) {
      const startTime = new Date(this.dateValue);
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      const body: BookingRequest = {
        attendees: [
          {
            attendeeType: AttendeeType.PATIENT,
            entity: {
              entityNo: patient.entityNo,
              firstName: patient.firstName,
              lastName: patient.lastName,
            },
            entityNo: patient.entityNo,
          },
          {
            attendeeType: AttendeeType.PROVIDER,
            entity: {
              entityNo: this.authService.usserRole,
              firstName: this.currentUser.firstName,
              lastName: this.currentUser.lastName,
            },
            entityNo: this.authService.usserRole,
          },
        ],
        description: 'string',
        endDate: endTime.toISOString(),
        id: 0,
        organiser: this.authService.usserRole,
        startDate: startTime.toISOString(),
        title: 'string',
      };

      this.store.dispatch(createBooking({ body }));
    }
  }
}
