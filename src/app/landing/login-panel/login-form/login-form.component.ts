import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../service/user.service';
import { UserLoginData } from '../../../data-types/UserLoginData';
import { parseJwt } from '../../../utils/JWTParser';
import { Role } from '../../../data-types/UserRegisterData';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  hidePassword = true;
  showPasswordErrorMessage = false;
  loginUserDataFormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  resetWarnings() {
    this.showPasswordErrorMessage = false;
  }

  loginUser() {
    const valuesFromForm = this.loginUserDataFormGroup.value;

    const loginData: UserLoginData = {
      email: valuesFromForm.email!,
      password: valuesFromForm.password!,
    };

    if (!this.loginUserDataFormGroup.invalid) {
      this.userService.login(loginData).subscribe({
        next: (result: any) => {
          if (result['token'] == '') this.showPasswordErrorMessage = true;
          else {
            this.cookieService.set('Token', result['token']);
            const jwt = parseJwt(result['token']);
            if (jwt['role'] === Role.STUDENT) {
              this.router.navigate(['../student-home']); //TODO aici vine pagina principala
            } else {
              this.router.navigate(['../recruiter-home']);
            }
          }
        },
      });
    }
  }
}
