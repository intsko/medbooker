/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DoctorDashboardComponent } from './doctor-dashboard.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AttendeeType, Booking, Status } from 'src/app/models/booking.model';

describe('DoctorDashboardComponent', () => {
  let component: DoctorDashboardComponent;
  let fixture: ComponentFixture<DoctorDashboardComponent>;
  let bookings$: Observable<Booking[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorDashboardComponent],
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    bookings$ = of([
      {
        attendees: [
          {
            attendeeType: AttendeeType.PROVIDER,
            entity: {
              entityNo: 1100000111,
              firstName: 'firstName',
              lastName: 'lastName',
            },
            entityNo: 1100000111,
          },
          {
            attendeeType: AttendeeType.PATIENT,
            entity: {
              entityNo: 1000000002,
              firstName: 'firstName',
              lastName: 'lastName',
            },
            entityNo: 1000000002,
          },
        ],
        description: '',
        endTime: new Date().toISOString(),
        id: 0,
        startTime: new Date().toISOString(),
        status: Status.TENTATIVE,
        statusComment: '',
        title: '',
      },
      {
        attendees: [
          {
            attendeeType: AttendeeType.PROVIDER,
            entity: {
              entityNo: 1100000111,
              firstName: 'firstName',
              lastName: 'lastName',
            },
            entityNo: 1100000111,
          },
          {
            attendeeType: AttendeeType.PATIENT,
            entity: {
              entityNo: 1000000002,
              firstName: 'firstName',
              lastName: 'lastName',
            },
            entityNo: 1000000002,
          },
        ],
        description: '',
        endTime: new Date().toISOString(),
        id: 0,
        startTime: new Date().toISOString(),
        status: Status.TENTATIVE,
        statusComment: '',
        title: '',
      },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct bookings object', () => {
    fixture.componentInstance.bookings$ = bookings$;
    fixture.detectChanges();
    expect(fixture.componentInstance.bookings$).toEqual(bookings$);
  });

  it('should create nb-card-body for each booking', () => {
    fixture.componentInstance.bookings$ = bookings$;
    fixture.detectChanges();

    const item = fixture.debugElement.queryAll(By.css('.requests-container'));
    expect(item.length).toBe(2);
  });
});
