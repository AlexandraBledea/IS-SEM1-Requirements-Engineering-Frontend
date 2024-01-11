import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.scss'],
})
export class StudentNavBarComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  homePage() {
    this.router.navigate(['/student-home']);
  }

  profilePage() {
    this.router.navigate(['/student-profile']);
  }

  logout() {
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }
  applicationsPage() {
    this.router.navigate(['/student-applications']);
  }
}
