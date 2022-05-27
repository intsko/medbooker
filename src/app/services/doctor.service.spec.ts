import { base_Url } from './../shared/utils/customTokens';
import { HttpClientModule, HttpParams } from '@angular/common/http';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoctorService } from './doctor.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Service: Doctor', () => {
  let doctorService: DoctorService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DoctorService,
        {
          provide: base_Url,
          useValue: environment.BASE_URL,
        },
      ],
    });

    doctorService = TestBed.inject(DoctorService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([DoctorService], (service: DoctorService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllDoctors', () => {
    it('should call get method with correct url', () => {
      doctorService.getAllDoctors().subscribe();
      const req = controller.expectOne(environment.BASE_URL + '/practitioner/');

      expect(req.request.method).toBe('GET');
      controller.verify();
    });
  });

  describe('getSingleDoctor', () => {
    it('should call get method with correct url', () => {
      doctorService.getSingleDoctor(11001100).subscribe();
      const req = controller.expectOne(
        environment.BASE_URL + '/practitioner/11001100'
      );

      expect(req.request.method).toBe('GET');
      controller.verify();
    });
  });
});
