import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from '../../data-types/Internship';
import { CommunicationService } from '../../service/communication.service';

@Component({
  selector: 'app-student-internship-details',
  templateUrl: './student-internship-details.component.html',
  styleUrls: ['./student-internship-details.component.scss'],
})
export class StudentInternshipDetailsComponent {
  internship!: Internship;
  constructor(
    private router: Router,
    private communicationService: CommunicationService,
  ) {
    this.internship = this.communicationService.getDetailsCompany();
  }

  applyToInternship() {
    this.router.navigate(['/apply-to-internship']);
  }
}
