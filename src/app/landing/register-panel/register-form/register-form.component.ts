import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Role, UserRegisterData } from '../../../data-types/UserRegisterData';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  hidePassword1 = true;
  hidePassword2 = true;

  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = '';

  registerFormGroup = this.formBuilder.group({
    surname: ['', Validators.required],
    forename: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^\+40[2-9][0-9]{8}$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password1: ['', Validators.required],
    password2: ['', Validators.required],
    companyName: ['', Validators.required],
  });

  recruiterChecked: boolean = false;
  studentChecked: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  createAccount() {
    const valuesFromForm = this.registerFormGroup.value;

    const passwordDoNotMatch =
      valuesFromForm.password1 != valuesFromForm.password2;
    const anyFieldIsEmpty =
      valuesFromForm.password1 === '' ||
      valuesFromForm.password2 === '' ||
      valuesFromForm.email === '' ||
      valuesFromForm.surname === '' ||
      valuesFromForm.forename === '' ||
      valuesFromForm.phoneNumber === '';

    if (!this.studentChecked && !this.recruiterChecked) {
      this.errorMessage = 'Please fill out all fields.';
      this.showCreateAccountErrorMessage = true;
      return;
    } else if (anyFieldIsEmpty) {
      this.errorMessage = 'Please fill out all fields.';
      this.showCreateAccountErrorMessage = true;
      return;
    } else if (passwordDoNotMatch) {
      this.errorMessage = 'Passwords must match.';
      this.showCreateAccountErrorMessage = true;
      return;
    } else if (this.recruiterChecked && valuesFromForm.companyName === '') {
      this.errorMessage = 'Please fill out all fields.';
      this.showCreateAccountErrorMessage = true;
      return;
    }

    let registerData: UserRegisterData;
    if (this.studentChecked) {
      registerData = {
        surname: valuesFromForm.surname!,
        forename: valuesFromForm.forename!,
        phoneNumber: valuesFromForm.phoneNumber!,
        role: Role.STUDENT,
        email: valuesFromForm.email!,
        password: valuesFromForm.password2!,
        companyName: '',
      };
    } else {
      registerData = {
        surname: valuesFromForm.surname!,
        forename: valuesFromForm.forename!,
        phoneNumber: valuesFromForm.phoneNumber!,
        role: Role.STUDENT,
        email: valuesFromForm.email!,
        password: valuesFromForm.password2!,
        companyName: valuesFromForm.companyName!,
      };
    }

    this.userService.register(registerData).subscribe({
      next: (result: any) => {
        const response = JSON.stringify(result);

        if (
          response === '"There already exists an user with the given email!"'
        ) {
          this.errorMessage =
            'There already exists an user with the given email!';
          this.showCreateAccountErrorMessage = true;
        } else {
          this.showCreateAccountSuccessfulMessage = true;
        }
      },
    });
  }

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
    this.showCreateAccountSuccessfulMessage = false;
  }

  onChange($event: MatCheckboxChange, selected: string) {
    if (selected == 'student') {
      if (this.studentChecked) {
        this.studentChecked = $event.checked;
      } else {
        this.studentChecked = $event.checked;
        this.recruiterChecked = !$event.checked;
      }
    } else {
      if (this.recruiterChecked) {
        this.recruiterChecked = $event.checked;
      } else {
        this.recruiterChecked = $event.checked;
        this.studentChecked = !$event.checked;
      }
    }
  }
}
