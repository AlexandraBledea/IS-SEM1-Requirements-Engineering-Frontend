import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss'],
})
export class ApplicationCardComponent {
  constructor(private router: Router) {}

  viewApplication() {
    this.router.navigate(['student-application']);
  }
}
