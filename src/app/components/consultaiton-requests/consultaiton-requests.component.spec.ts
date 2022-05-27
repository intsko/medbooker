/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsultaitonRequestsComponent } from './consultaiton-requests.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AttendeeType, Booking, Status } from 'src/app/models/booking.model';

describe('ConsultaitonRequestsComponent', () => {
  let component: ConsultaitonRequestsComponent;
  let fixture: ComponentFixture<ConsultaitonRequestsComponent>;
  let bookings$: Observable<Booking[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [ConsultaitonRequestsComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaitonRequestsComponent);
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

  it('should inject authService', inject(
    [AuthService],
    (service: AuthService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should inject Activated Route', inject(
    [ActivatedRoute],
    (route: ActivatedRoute) => {
      expect(route).toBeTruthy();
    }
  ));

  it('should inject store', inject([Store], (store: Store) => {
    expect(store).toBeTruthy();
  }));

  it('should have correct bookings object', () => {
    fixture.componentInstance.bookings$ = bookings$;
    fixture.detectChanges();
    expect(fixture.componentInstance.bookings$).toEqual(bookings$);
  });

  it('should create nb-card-body for each booking', () => {
    fixture.componentInstance.bookings$ = bookings$;
    fixture.detectChanges();

    const item = fixture.debugElement.queryAll(By.css('nb-card-body'));
    expect(item.length).toBe(2);
  });
});
