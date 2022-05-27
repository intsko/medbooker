import { AuthService } from 'src/app/services/auth.service';
import { Booking } from 'src/app/models/booking.model';
import { Pipe, PipeTransform } from '@angular/core';
import { getCredetntials } from '..';

@Pipe({
  name: 'credentials',
})
export class CredentialsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(booking: Booking): string {
    return getCredetntials(booking, this.authService.usserRole);
  }
}
