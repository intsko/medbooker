import { Booking, AttendeeType, Status } from './../../../models/booking.model';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RequestCardComponent } from './request-card.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { CredentialsPipe } from '../../pipes/credentials.pipe';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;
  let booking: Booking;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [RequestCardComponent, CredentialsPipe],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    booking = {
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
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct booking object', () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();
    expect(fixture.componentInstance.booking).toEqual(booking);
  });

  it("should have render person's first name and last name in h3 tag", () => {
    fixture.componentInstance.booking = booking;
    fixture.detectChanges();

    const deH = fixture.debugElement.query(By.css('h3'));
    expect(deH.nativeElement.textContent).toContain('firstName lastName');
  });
});
