import { Booking } from './../../models/booking.model';
import { TestBed, inject } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './../../services/auth.service';
import { CredentialsPipe } from './credentials.pipe';
import { getCredetntials } from '../utils/utils.fn';
// /* tslint:disable:no-unused-variable */

// import { TestBed, async } from '@angular/core/testing';
// import { CredentialsPipe } from './credentials.pipe';

// // describe('Pipe: Credentialse', () => {
// //   it('create an instance', () => {
// //     let pipe = new CredentialsPipe();
// //     expect(pipe).toBeTruthy();
// //   });
// // });

// describe('Pipe: Credentials', () => {
//   let pipe = new CredentialsPipe();

//   it('create an instance', () => {
//     expect(pipe).toBeTruthy();
//   });
// });

// describe('Credentials Pipe', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         CredentialsPipe,
//         AuthService,
//         { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
//       ],
//     });
//   });

//   it('should...', inject(
//     [CredentialsPipe, AuthService],
//     (pipe: CredentialsPipe, service: AuthService) => {
//       expect(pipe).toBeTruthy();
//       expect(service).toBeTruthy();
//     }
//   ));

//   it('should return doctor credentials', () => {
//     const pipe = new CredentialsPipe(
//       new AuthService(AngularFirestore, AngularFireAuth, Router)
//     );
//   });
// });
