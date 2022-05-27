import { Roles } from 'src/app/models/user.model';
import { expand, Observable } from 'rxjs';
/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Output } from '@angular/core';

import { BookingComponent } from './booking.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services';
import { Doctor } from 'src/app/models/doctor.model';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let doctorSeviceSpy = jasmine.createSpyObj<DoctorService>([
    'getSingleDoctor',
  ]);
  doctorSeviceSpy.getSingleDoctor.and.returnValue(new Observable<Doctor>());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingComponent],
      imports: [RouterModule.forRoot([]), StoreModule.forRoot({})],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should inject store', inject([Store], (store: AuthService) => {
    expect(store).toBeTruthy();
  }));

  it('should return doctor', () => {
    doctorSeviceSpy.getSingleDoctor(Roles.Doctor).subscribe((data) => {
      expect(data).toBeTruthy();
    });
  });
});
