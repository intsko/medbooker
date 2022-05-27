import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
/* tslint:disable:no-unused-variable */
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy = jasmine.createSpyObj<AuthService>(['SignUp']);
  authServiceSpy.SignUp.and.returnValue(new Observable<void | undefined>());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        // { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
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

  it('should inject FormBuilder', inject(
    [FormBuilder],
    (formBuilder: FormBuilder) => {
      expect(formBuilder).toBeTruthy();
    }
  ));

  it('should inject Router', inject([Router], (router: Router) => {
    expect(router).toBeTruthy();
  }));

  it('should have submit button', () => {
    const button = fixture.debugElement.query(By.css('.register-btn'));
    expect(button).toBeTruthy();
  });

  it('should bind email to its formControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('#email'));
    const ctrl = component.registerForm?.get('email');

    // Act
    const dummyValue = 'user@example.com';
    ctrl?.setValue(dummyValue);
    fixture.detectChanges();

    // Assert
    expect(el.nativeElement.value).toEqual(dummyValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dummyValue);
  });

  it('should bind password to its formControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('#password'));
    const ctrl = component.registerForm?.get('passwordGroup.password');

    // Act
    const dummyValue = 'password';
    ctrl?.setValue(dummyValue);
    fixture.detectChanges();

    // Assert
    expect(el.nativeElement.value).toEqual(dummyValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dummyValue);
  });

  it('SignUp method should register user', () => {
    let formElement: DebugElement;
    formElement = fixture.debugElement.query(By.css('form'));
    component.registerForm?.controls['firstName'].setValue('first name');
    component.registerForm?.controls['lastName'].setValue('last name');
    formElement.triggerEventHandler('click', component.registerUser());
    expect(authServiceSpy.SignUp.and.callThrough()).toHaveBeenCalledTimes(1);
  });
});
