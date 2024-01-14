import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/data-types/Application';
import { CommunicationService } from 'src/app/service/communication.service';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss'],
})
export class ApplicationCardComponent {
  @Input() application!: Application;

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
  ) {}

  viewApplication() {
    this.communicationService.setDetailsApplication(this.application);
    this.router.navigate(['student-application']);
  }
}
