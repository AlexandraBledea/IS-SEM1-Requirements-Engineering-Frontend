import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { parseJwt } from '../utils/JWTParser';
import { Role } from '../data-types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthguardRecruiterService implements CanActivate {
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
    const jwt = parseJwt(token);
    if (jwt['role'] === Role.RECRUITER) {
      return true;
    } else if (jwt['role'] === Role.STUDENT) {
      this.router.navigate(['../student-home']);
    }

    return false;
  }
}
