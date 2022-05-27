import { Roles } from 'src/app/models/user.model';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Booking } from 'src/app/models/booking.model';

export function getType(target: boolean) {
  if (target) {
    return 'text';
  }
  return 'password';
}

export function getInputStatus(form: FormGroup, property: string): string {
  if (
    (form?.get(property)?.touched || form?.get(property)?.dirty) &&
    !form.get(property)?.valid
  )
    return 'danger';

  return '';
}

export function hasError(form: FormGroup, property: string): boolean {
  if (form?.get(property)?.errors?.['required'] && form?.get(property)?.touched)
    return true;

  return false;
}

export function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  if (passwordControl?.value === confirmControl?.value) return null;
  return { match: true };
}

const errorMessagesFns = {
  required: (name: string) => `${name} is required`,
  minLength: (name: string, minLength: number) =>
    `${name} must be more then ${minLength} characters`,
  maxLength: (name: string, maxLength: number) =>
    `${name} must be less then ${maxLength} characters`,
};

const errorMessages: Record<string, Record<string, string>> = {
  email: {
    required: errorMessagesFns.required('Email'),
    email: 'Please provide a valid email',
  },
  password: {
    required: errorMessagesFns.required('Password'),
    minlength: errorMessagesFns.minLength('Password', 5),
  },
  firstName: {
    required: errorMessagesFns.required('First name'),
    minlength: errorMessagesFns.minLength('First Name', 2),
  },
  lastName: {
    required: errorMessagesFns.required('Last name'),
    maxlength: errorMessagesFns.maxLength('First Name', 50),
  },
  'passwordGroup.password': {
    required: errorMessagesFns.required('Password'),
    minlength: errorMessagesFns.minLength('Password', 5),
  },
  'passwordGroup.confirmPassword': {
    required: errorMessagesFns.required('Confirm password'),
  },
};

export function errMsg(controlName: string, form: FormGroup) {
  const control = form?.get(controlName);
  if (control && control?.untouched && !control?.errors) return '';

  const errorKeys = [];
  for (const key in control?.errors) {
    errorKeys.push(key);
  }

  if (control && control?.touched && control?.errors) {
    return errorMessages[controlName][errorKeys[0]];
  }

  return '';
}

export function getCredetntials(booking: Booking, role: Roles) {
  const oppositeRole = booking.attendees.find(
    (atendee) => atendee.entityNo !== role
  )?.entity;

  return `${oppositeRole?.firstName} ${oppositeRole?.lastName}`;
}

export function objectKeysFormatter(bookings: Record<string, Booking[]>) {
  return Object.keys(bookings)
    .reverse()
    .map((key) => {
      return bookings[key];
    })
    .flat();
}
