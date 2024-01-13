import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { parseJwt } from '../utils/JWTParser';
import { Role } from '../data-types/UserRegisterData';

@Injectable({
  providedIn: 'root',
})
export class AuthguardLoginService implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.cookieService.get('Token');
    if (!token) {
      return true;
    } else {
      const jwt = parseJwt(token);
      if (jwt['role'] == Role.STUDENT) {
        this.router.navigate(['../student-home']);
      } else if (jwt['role'] == Role.RECRUITER) {
        this.router.navigate(['../recruiter-home']);
      }
    }
    return false;
  }
}
