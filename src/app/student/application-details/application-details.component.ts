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
  showCreateAccountErrorMessage = false;
  errorMessage = '';

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

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
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
    if (this.application.others === '') {
      this.errorMessage = 'There is no PDF uploaded in Others field';
      this.showCreateAccountErrorMessage = true;
      setTimeout(() => {
        this.showCreateAccountErrorMessage = false;
      }, 2000);
      return;
    }

    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.application.others);
    link.setAttribute('download', `others.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
