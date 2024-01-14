import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Application } from 'src/app/data-types/Application';
import { StudentService } from 'src/app/service/student.service';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-internship-applications',
  templateUrl: './internship-applications.component.html',
  styleUrls: ['./internship-applications.component.scss'],
})
export class InternshipApplicationsComponent {
  applications: Application[] = [];

  constructor(
    private studentService: StudentService,
    private cookieService: CookieService,
  ) {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    this.studentService
      .getApplications(jwt['id'])
      .subscribe((data: Application[]) => {
        this.applications = data;
        console.log(data);
      });
  }
}
