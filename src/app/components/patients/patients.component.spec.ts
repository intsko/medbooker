import { Observable, of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientsComponent } from './patients.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Patient } from 'src/app/models/patient.model';

describe('PatientsComponent', () => {
  let component: PatientsComponent;
  let fixture: ComponentFixture<PatientsComponent>;
  let patients$: Observable<Patient[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [PatientsComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    patients$ = of([
      {
        entityNo: 12121212,
        firstName: 'firstName',
        lastName: 'lastName',
      },
      {
        entityNo: 12121212,
        firstName: 'firstName',
        lastName: 'lastName',
      },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct patients object', () => {
    fixture.componentInstance.patients$ = patients$;
    fixture.detectChanges();
    expect(fixture.componentInstance.patients$).toEqual(patients$);
  });

  it('should create nb-list-item for each doctor', () => {
    fixture.componentInstance.patients$ = patients$;
    fixture.detectChanges();
    const item = fixture.debugElement.queryAll(By.css('.patients-container'));
    expect(item.length).toBe(2);
  });
});
