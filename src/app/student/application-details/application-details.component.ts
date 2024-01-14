import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Application } from 'src/app/data-types/Application';
import { CommunicationService } from 'src/app/service/communication.service';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.scss'],
})
export class ApplicationDetailsComponent {
  application: Application;
  isStudent: boolean = true;

  constructor(
    private communicationService: CommunicationService,
    private cookieService: CookieService,
  ) {
    this.application = communicationService.getDetailsApplication();

    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);

    if (jwt['role'] == 'RECRUITER') {
      this.isStudent = false;
    }
  }
}
