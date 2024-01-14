import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
    private domSanitizer: DomSanitizer,
  ) {
    this.application = communicationService.getDetailsApplication();

    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);

    if (jwt['role'] == 'RECRUITER') {
      this.isStudent = false;
    }
  }

  downloadCV() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.application.cv);
    link.setAttribute('download', `cv.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  downloadOthers() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.application.others);
    link.setAttribute('download', `others.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
