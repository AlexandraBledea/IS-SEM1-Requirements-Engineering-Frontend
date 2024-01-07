import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginPanelComponent {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
