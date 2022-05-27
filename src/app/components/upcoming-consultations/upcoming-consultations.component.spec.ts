/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingConsultationsComponent } from './upcoming-consultations.component';

describe('UpcomingConsultationsComponent', () => {
  let component: UpcomingConsultationsComponent;
  let fixture: ComponentFixture<UpcomingConsultationsComponent>;
  let property: string = 'Confirmed';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingConsultationsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct status property', () => {
    expect(fixture.componentInstance.status).toEqual(property);
  });
});
