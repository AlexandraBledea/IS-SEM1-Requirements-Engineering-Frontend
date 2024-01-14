import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Application } from 'src/app/data-types/Application';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-recruiter-applications',
  templateUrl: './recruiter-applications.component.html',
  styleUrls: ['./recruiter-applications.component.scss'],
})
export class RecruiterApplicationsComponent {
  applications: Application[] = [];

  constructor(
    private recruiterService: RecruiterService,
    private cookieService: CookieService,
  ) {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);

    this.recruiterService.getRecruiter(jwt['id']).subscribe((rec: any) => {
      this.recruiterService.getAllApplications().subscribe({
        next: (result: any) => {
          this.applications = result.filter(
            (obj: any) => obj.internship.company.id == rec.company.id,
          );
        },
      });
    });
  }
}
