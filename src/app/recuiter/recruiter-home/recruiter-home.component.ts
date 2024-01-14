import { Component } from '@angular/core';
import { RecruiterService } from '../../service/recruiter.service';
import { CookieService } from 'ngx-cookie-service';
import { parseJwt } from '../../utils/JWTParser';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.scss'],
})
export class RecruiterHomeComponent {
  internshipAnnouncements = [];

  constructor(
    private recruiterService: RecruiterService,
    private cookieService: CookieService,
  ) {
    this.fetchInternshipAnnouncements();
  }

  fetchInternshipAnnouncements() {
    const jwtToken = this.cookieService.get('Token');
    const jwt = parseJwt(jwtToken);
    this.recruiterService
      .getInternshipAnnouncements(jwt['id'])
      .subscribe((response: any) => {
        this.internshipAnnouncements = response;
      });
  }
}
