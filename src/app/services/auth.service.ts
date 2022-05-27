import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from, tap } from 'rxjs';
import { User, Roles, FireUser } from '../models/user.model';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser: firebase.User | undefined;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      this._currentUser = user as firebase.User;
    });
  }

  get usserRole() {
    if (this.currentUser) return this.currentUser.entityNo;
  }

  get currentUser() {
    if (this._currentUser) {
      return this._currentUser
        ? JSON.parse(this._currentUser.displayName as string)
        : '';
    }
  }

  get currentUserState() {
    return this.afAuth.authState;
  }

  SignIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  SignUp(email: string, password: string, data: User) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then((u) =>
        u.user?.updateProfile({
          displayName: JSON.stringify(data),
        })
      )
    ).pipe(tap(() => this.router.navigate(['dashboard'])));
  }

  SignOut() {
    return from(this.afAuth.signOut()).pipe(
      tap(() => this.router.navigate(['']))
    );
  }
}
