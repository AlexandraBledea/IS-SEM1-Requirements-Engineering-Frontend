import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.scss'],
})
export class RegisterPanelComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
