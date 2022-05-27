import { AttendeeType, Booking, Status } from './../models/booking.model';
import { Roles } from './../models/user.model';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataFormatService } from './data-format.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { base_Url } from '../shared';
import { environment } from 'src/environments/environment';
import { BookingService } from './booking.service';
import { Observable, of } from 'rxjs';

describe('Service: DataFormat', () => {
  let dataFormatService: DataFormatService;
  let bookings$: Observable<Booking[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataFormatService,
        {
          provide: base_Url,
          useValue: environment.BASE_URL,
        },
      ],
    });
    dataFormatService = TestBed.inject(DataFormatService);
    spyOn(DataFormatService.prototype, 'loadBookings');
  });

  it('should ...', inject([DataFormatService], (service: DataFormatService) => {
    expect(service).toBeTruthy();
  }));

  describe('loadBookings', () => {
    it('should call getBookingForEntity', () => {
      const status = Status.CONFIRMED;
      const entityNo = Roles.Doctor;
      dataFormatService.loadBookings(status, entityNo);

      expect(DataFormatService.prototype.loadBookings).toHaveBeenCalledWith(
        status,
        entityNo
      );
    });
  });
});
