import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from '../../data-types/Internship';
import { CommunicationService } from '../../service/communication.service';
import { CookieService } from 'ngx-cookie-service';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent {
  @Input() internship!: Internship;

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private cookieService: CookieService,
  ) {}

  displayDetails() {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    console.log(jwt);

    this.communicationService.setDetailsCompany(this.internship);
    if (jwt['role'] == 'STUDENT')
      this.router.navigate(['/student-internship-announcement']);
    else this.router.navigate(['/recruiter-internship-announcement']);
  }
}
