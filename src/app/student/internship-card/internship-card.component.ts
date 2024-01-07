import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent {
  @Input() companyName?: string;
  @Input() vision?: string;
  @Input() jobPosition?: string;
  @Input() industry?: string;
  @Input() location?: string;
  @Input() duration?: string;

  constructor(private router: Router) {}

  displayDetails() {
    this.router.navigate(['/student-internship-announcement']);
  }
}
