import { AuthService } from 'src/app/services/auth.service';
import { Booking, DoctorBooking } from 'src/app/models/booking.model';
import { Pipe, PipeTransform } from '@angular/core';
import { Roles } from '../../models/user.model';

@Pipe({
  name: 'getTitle',
})
export class GetTitlePipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(booking: Booking | DoctorBooking) {
    if (
      'practiceName' in booking &&
      this.authService.usserRole === Roles.Patient
    ) {
      return booking.practiceName;
    }

    return '';
  }
}
