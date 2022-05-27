import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { BookingCardEffect } from './effects/booking-card.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { SearchDoctorsEffect } from './effects/search-doctor.effect';
import { SearchPatientsEffect } from './effects/search-patient.effect';
import { BookDoctorEffect } from './effects/book-doctor.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      BookingCardEffect,
      SearchDoctorsEffect,
      SearchPatientsEffect,
      BookDoctorEffect,
    ]),
    StoreDevtoolsModule.instrument({
      name: 'medBooker',
      logOnly: environment.production,
    }),
  ],
  declarations: [],
})
export class StoreModuleState {}
