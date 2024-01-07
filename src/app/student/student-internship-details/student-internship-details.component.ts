import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-internship-details',
  templateUrl: './student-internship-details.component.html',
  styleUrls: ['./student-internship-details.component.scss'],
})
export class StudentInternshipDetailsComponent {
  constructor(private router: Router) {}

  applyToInternship() {
    this.router.navigate(['/apply-to-internship']);
  }
}
