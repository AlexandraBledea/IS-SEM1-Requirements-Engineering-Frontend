import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from '../../data-types/Internship';
import { CommunicationService } from '../../service/communication.service';
import { CookieService } from 'ngx-cookie-service';
import { StudentService } from '../../service/student.service';
import { Student } from '../../data-types/Student';
import { parseJwt } from '../../utils/JWTParser';

@Component({
  selector: 'app-student-internship-details',
  templateUrl: './student-internship-details.component.html',
  styleUrls: ['./student-internship-details.component.scss'],
})
export class StudentInternshipDetailsComponent {
  internship!: Internship;
  student!: Student;

  showCreateAccountErrorMessage = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private cookieService: CookieService,
    private studentService: StudentService,
  ) {
    this.internship = this.communicationService.getDetailsCompany();
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    this.studentService.getStudent(jwt['id']).subscribe((response: any) => {
      this.student = response;
    });
  }

  applyToInternship() {
    if (this.student.studyProgram === null) {
      this.errorMessage =
        'You must complete your applicant profile in order to apply to an internship!';
      this.showCreateAccountErrorMessage = true;
      return;
    }
    this.router.navigate(['/apply-to-internship']);
  }
}
