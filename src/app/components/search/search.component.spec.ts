/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let doctors$: Observable<Doctor[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({})],
      declarations: [SearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    doctors$ = of([
      {
        entityNo: 11111111,
        firstName: 'firstName',
        lastName: 'lastName',
        practiceName: 'firstName lastName Associations',
        practiceNo: '1234',
      },
      {
        entityNo: 11111101,
        firstName: 'firstName',
        lastName: 'lastName',
        practiceName: 'firstName lastName Associations',
        practiceNo: '1234',
      },
    ]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject store', inject([Store], (store: Store) => {
    expect(store).toBeTruthy();
  }));

  it('should inject Router', inject([Router], (router: Router) => {
    expect(router).toBeTruthy();
  }));

  it('should have correct doctors object', () => {
    fixture.componentInstance.doctors$ = doctors$;
    fixture.detectChanges();
    expect(fixture.componentInstance.doctors$).toEqual(doctors$);
  });

  it('should create nb-list-item for each doctor', () => {
    fixture.componentInstance.doctors$ = doctors$;
    fixture.detectChanges();
    const item = fixture.debugElement.queryAll(By.css('nb-list-item'));
    expect(item.length).toBe(2);
  });
});
