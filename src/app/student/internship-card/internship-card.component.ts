import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from '../../data-types/Internship';
import { CommunicationService } from '../../service/communication.service';
import { CookieService } from 'ngx-cookie-service';
import { parseJwt } from 'src/app/utils/JWTParser';
import { StudentService } from '../../service/student.service';
import { Student } from '../../data-types/Student';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent {
  @Input() internship!: Internship;

  isStudent: boolean = true;
  student?: Student;

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private cookieService: CookieService,
    private studentService: StudentService,
  ) {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);

    if (jwt['role'] != 'STUDENT') {
      this.isStudent = false;
    }
  }

  displayDetails() {
    this.communicationService.setDetailsCompany(this.internship);
    if (this.isStudent) {
      this.router.navigate(['/student-internship-announcement']);
    } else this.router.navigate(['/recruiter-internship-announcement']);
  }

  viewInternships() {
    this.communicationService.setDetailsCompany(this.internship);
    this.router.navigate(['/recruiter-view-applications']);
  }
}
