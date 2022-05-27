import { DoctorService } from './../../services/doctor.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchDoctorsAction from '../actions/search-doctor.action';
import { Doctor } from 'src/app/models/doctor.model';

@Injectable({
  providedIn: 'root',
})
export class SearchDoctorsEffect {
  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}

  loadAllDoctors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchDoctorsAction.loadDoctors),
      switchMap(() => {
        return this.doctorService.getAllDoctors();
      }),
      map((doctors: Doctor[]) => {
        return SearchDoctorsAction.loadDoctorsSuccess({ doctors });
      }),
      catchError(() => of(SearchDoctorsAction.loadDoctorsFailure()))
    );
  });

  loadSingleDoctor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchDoctorsAction.loadSingleDoctor),
      switchMap(({ firstName, lastName }) => {
        return this.doctorService.searchDoctor(firstName, lastName);
      }),
      map((doctor: Doctor[]) => {
        return SearchDoctorsAction.loadSingleDoctorSuccess({ doctor });
      }),
      catchError(() => of(SearchDoctorsAction.loadSingleDoctorFailure()))
    );
  });
}
