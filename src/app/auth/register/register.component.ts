import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { NbComponentStatus } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import {
  errMsg,
  getInputStatus,
  getType,
  hasError,
  passwordMatcher,
  signUpErrorMessage,
} from 'src/app/shared';
import { Roles, User } from 'src/app/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  status: NbComponentStatus = 'success';
  registerForm: FormGroup | undefined;
  errorMsg: string | undefined;
  isError: boolean = false;

  options = [
    { value: Roles.Doctor, label: 'Doctor', formControlName: 'doctor' },
    { value: Roles.Patient, label: 'Patient', formControlName: 'patient' },
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerFormCreator();
    this.formValueChanges();
  }

  registerFormCreator() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatcher }
      ),
      role: ['', [Validators.required]],
    });
  }

  formValueChanges() {
    if (this.registerForm) {
      this.registerForm
        .get('email')
        ?.valueChanges.subscribe((email) => (this.email = email));
      this.registerForm
        .get('passwordGroup.password')
        ?.valueChanges.subscribe((password) => (this.password = password));
    }
  }

  getStatus(property: string): string {
    return this.registerForm ? getInputStatus(this.registerForm, property) : '';
  }

  hasErrorMessage(property: string): boolean {
    return this.registerForm ? hasError(this.registerForm, property) : false;
  }

  getErrorMessage(controlName: string): string {
    return this.registerForm ? errMsg(controlName, this.registerForm) : '';
  }

  registerUser() {
    if (this.registerForm) {
      const data: User = {
        firstName: this.registerForm.get('firstName')?.value,
        lastName: this.registerForm.get('lastName')?.value,
        entityNo: this.registerForm.get('role')?.value,
      };

      this.authService.SignUp(this.email, this.password, data).subscribe({
        next: () => this.router.navigate(['login']),
        error: (error) => {
          this.isError = true;
          this.errorMsg = this.formatErrorMessage(error.message);
        },
      });
    }
  }

  formatErrorMessage(message: string): string {
    return signUpErrorMessage(message);
  }

  getInputType() {
    return getType(this.showPassword);
  }

  getConfrimPasswordType() {
    return getType(this.showConfirmPassword);
  }

  toggleShowPassword(e: Event) {
    e.preventDefault();
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(e: Event) {
    e.preventDefault();
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
