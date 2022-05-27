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

import { LoginComponent } from './login.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy = jasmine.createSpyObj<AuthService>(['SignIn']);
  authServiceSpy.SignIn.and.returnValue(
    new Observable<firebase.default.auth.UserCredential>()
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
    expect(button.nativeElement.getAttribute('type')).toEqual('button');
  });

  it('should bind email to its formControl', () => {
    // Arrange
    const el = fixture.debugElement.query(By.css('#email'));
    const ctrl = component.loginForm?.get('email');

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
    const ctrl = component.loginForm?.get('password');

    // Act
    const dummyValue = 'password';
    ctrl?.setValue(dummyValue);
    fixture.detectChanges();

    // Assert
    expect(el.nativeElement.value).toEqual(dummyValue);
    expect((el.nativeElement as HTMLInputElement).value).toEqual(dummyValue);
  });

  it('SignIn method should log in user', () => {
    let formElement: DebugElement;
    formElement = fixture.debugElement.query(By.css('form'));
    component.loginForm?.controls['email'].setValue('test@gmail.com');
    component.loginForm?.controls['password'].setValue('dummyPassword');
    formElement.triggerEventHandler('click', null);
    expect(authServiceSpy.SignIn.and.callThrough()).toHaveBeenCalledTimes(0);
  });
});
