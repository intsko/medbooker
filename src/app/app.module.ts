import { base_Url } from './shared/utils/customTokens';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ShellModule } from './shell/shell.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthModule } from './auth/auth.module';
import { HomepageComponent, MainComponent } from './pages';
import { HttpClientModule } from '@angular/common/http';
import {
  BookingComponent,
  ConsultaitonRequestsComponent,
  DashboardComponent,
  DoctorDashboardComponent,
  HealthRecordsComponent,
  PatientDashboardComponent,
  PatientsComponent,
  SearchComponent,
  UpcomingConsultationsComponent,
} from './components';

import { SharedModule } from './shared/shared.module';
import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbSidebarModule,
  NbThemeModule,
  NbTimepickerModule,
  NbUserModule,
} from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModuleState } from './store/store.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MainComponent,
    DashboardComponent,
    PatientDashboardComponent,
    DoctorDashboardComponent,
    UpcomingConsultationsComponent,
    SearchComponent,
    BookingComponent,
    HealthRecordsComponent,
    ConsultaitonRequestsComponent,
    PatientsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    NbEvaIconsModule,
    FormsModule,
    RouterModule.forRoot([]),

    NbSidebarModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
    NbThemeModule,
    NbSidebarModule,
    NbLayoutModule,
    NbButtonModule,
    NbCardModule,
    ShellModule,
    AuthModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedModule,
    NbListModule,
    NbUserModule,
    NbInputModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),

    // StoreModule.forRoot({}, {}),
    // EffectsModule.forRoot([]),

    StoreModuleState,

    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: base_Url,
      useValue: environment.BASE_URL,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
