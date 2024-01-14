import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-recruiter-nav-bar',
  templateUrl: './recruiter-nav-bar.component.html',
  styleUrls: ['./recruiter-nav-bar.component.scss'],
})
export class RecruiterNavBarComponent {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  homePage() {
    this.router.navigate(['/recruiter-home']);
  }

  createAnnouncementPage() {
    this.router.navigate(['/recruiter-create-announcement']);
  }

  logout() {
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }
  applicationsPage() {
    this.router.navigate(['/recruiter-applications']);
  }
}
