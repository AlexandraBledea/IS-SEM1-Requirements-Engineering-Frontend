import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Application } from 'src/app/data-types/Application';
import { Internship } from 'src/app/data-types/Internship';
import { CommunicationService } from 'src/app/service/communication.service';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
  selector: 'app-recruiter-view-applications',
  templateUrl: './recruiter-view-applications.component.html',
  styleUrls: ['./recruiter-view-applications.component.scss'],
})
export class RecruiterViewApplicationsComponent {
  applications: Application[] = [];

  internship?: Internship;

  constructor(
    private recruiterService: RecruiterService,
    private cookieService: CookieService,
    private communicationService: CommunicationService,
  ) {
    this.internship = communicationService.getDetailsCompany();

    this.recruiterService.getAllApplications().subscribe({
      next: (result: any) => {
        this.applications = result.filter(
          (obj: any) => obj.internship.id == this.internship!.id,
        );
      },
    });
  }
}
