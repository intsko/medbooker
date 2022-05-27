import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('Service: Auth', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: AngularFireAuth, useClass: AngularFireAuthStunt },
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    spyOn(AuthService.prototype, 'SignIn');
    spyOn(AuthService.prototype, 'SignUp');
    spyOn(AuthService.prototype, 'SignOut');
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('login', () => {
    it('should call login with correct data', () => {
      const email = 'test@gmail.com';
      const password = '1234';

      service.SignIn(email, password);
      expect(AuthService.prototype.SignIn).toHaveBeenCalledWith(
        email,
        password
      );
    });
  });

  describe('register', () => {
    it('should call register with correct data', () => {
      const email = 'test@gmail.com';
      const password = '1234';
      const data = {
        firstName: 'firstName',
        lastName: 'lastName',
        entityNo: 121212,
      };

      service.SignUp(email, password, data);
      expect(AuthService.prototype.SignUp).toHaveBeenCalledWith(
        email,
        password,
        data
      );
    });
  });

  describe('log out', () => {
    it('should call log out', () => {
      service.SignOut();
      expect(AuthService.prototype.SignOut).toHaveBeenCalled();
    });
  });
});

class AngularFireAuthStunt {
  authState: Observable<firebase.default.UserInfo | null> = of({
    displayName: 'mock',
    email: 'test@gmail.com',
    phoneNumber: null,
    photoURL: null,
    providerId: '111',
    uid: 'ffff',
  });
  signInWithEmailAndPassword = () => of();
}
