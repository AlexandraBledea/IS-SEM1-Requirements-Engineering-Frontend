import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/data-types/Internship';
import { CommunicationService } from 'src/app/service/communication.service';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
  selector: 'app-recruiter-application-details',
  templateUrl: './recruiter-application-details.component.html',
  styleUrls: ['./recruiter-application-details.component.scss'],
})
export class RecruiterApplicationDetailsComponent {
  internship!: Internship;
  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private recruiterService: RecruiterService,
  ) {
    this.internship = this.communicationService.getDetailsCompany();
  }

  deleteInternship() {
    this.recruiterService.deleteInternship(this.internship).subscribe({
      next: (result: any) => {
        console.log(result);
        this.router.navigate(['./recruiter-home']);
      },
    });
  }

  editInternship() {
    this.router.navigate(['./recruiter-edit-announcement']);
  }
}
