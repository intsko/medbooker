import {
  AttendeeType,
  Booking,
  BookingRequest,
  BookingStatusUpdateRequest,
  Status,
} from './../models/booking.model';
import { Observable, of } from 'rxjs';
import { Roles } from './../models/user.model';
/* tslint:disable:no-unused-variable */

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { base_Url } from '../shared';
import { BookingService } from './booking.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Service: Booking', () => {
  let bookingService: BookingService;
  let controller: HttpTestingController;
  let bookingServiceSpy = jasmine.createSpyObj<BookingService>([
    'createBooking',
  ]);
  let body: BookingRequest;
  let updateBook: BookingStatusUpdateRequest;

  beforeEach(() => {
    body = {
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
      endDate: new Date().toISOString(),
      id: 0,
      organiser: 1000000002,
      startDate: new Date().toISOString(),
      title: '',
    };

    updateBook = {
      bookingStatus: Status.CONFIRMED,
      comment: 'comment',
      includeDependent: false,
    };

    TestBed.configureTestingModule({
      providers: [
        BookingService,
        {
          provide: base_Url,
          useValue: environment.BASE_URL,
        },
      ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    bookingService = TestBed.inject(BookingService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should inject booking service', inject(
    [BookingService],
    (service: BookingService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('get method should have correct url', () => {
    const entityNo = Roles.Patient;
    const url = `${environment.BASE_URL}/booking/attendee/${entityNo}`;

    bookingService.getBookingForEntity(entityNo).subscribe();
    controller.expectOne({ url, method: 'GET' });
    controller.verify();
  });

  it('should have create booking', () => {
    expect(bookingService.createBooking.length).toBe(1);
  });

  describe('createBooking', () => {
    it('should call post method with correct url', () => {
      bookingService.createBooking(body).subscribe();
      const req = controller.expectOne(environment.BASE_URL + '/booking/');

      expect(req.request.method).toBe('POST');
      controller.verify();
    });
  });

  describe('updateBooking', () => {
    it('should call put method with correct url', () => {
      bookingService.updateBooking(10, updateBook).subscribe();
      const req = controller.expectOne(
        environment.BASE_URL + '/booking/10/status'
      );

      expect(req.request.method).toBe('PUT');
      controller.verify();
    });
  });
});
