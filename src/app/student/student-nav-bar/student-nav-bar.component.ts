import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-nav-bar',
  templateUrl: './student-nav-bar.component.html',
  styleUrls: ['./student-nav-bar.component.scss'],
})
export class StudentNavBarComponent {
  constructor(private router: Router) {}

  homePage() {
    this.router.navigate(['/student-home']);
  }

  profilePage() {
    this.router.navigate(['/student-profile']);
  }
}
