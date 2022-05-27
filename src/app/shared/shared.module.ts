import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NbCardModule,
  NbButtonModule,
  NbLayoutModule,
  NbSidebarModule,
  NbUserModule,
} from '@nebular/theme';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  RequestCardComponent,
  BookingCardComponent,
  GoogleMapComponent,
  LoaderComponent,
} from './components';
import { CredentialsPipe } from './pipes/credentials.pipe';
import { GetTitlePipe } from './pipes/getTitle.pipe';

@NgModule({
  declarations: [
    RequestCardComponent,
    BookingCardComponent,
    GoogleMapComponent,
    LoaderComponent,
    CredentialsPipe,
    GetTitlePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    FontAwesomeModule,
    NbSidebarModule,
    NbLayoutModule,
    NbUserModule,
  ],
  exports: [
    RequestCardComponent,
    BookingCardComponent,
    GoogleMapComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
