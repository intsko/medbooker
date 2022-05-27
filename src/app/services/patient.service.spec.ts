import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { base_Url } from '../shared';
import { PatientService } from './patient.service';

describe('Service: Patient', () => {
  let patientService: PatientService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PatientService,
        {
          provide: base_Url,
          useValue: environment.BASE_URL,
        },
      ],
    });

    patientService = TestBed.inject(PatientService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should ...', inject([PatientService], (service: PatientService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAllPatients', () => {
    it('should call get method with correct url', () => {
      patientService.getAllPatients().subscribe();
      const req = controller.expectOne(environment.BASE_URL + 'member/');

      expect(req.request.method).toBe('GET');
      controller.verify();
    });
  });
});
