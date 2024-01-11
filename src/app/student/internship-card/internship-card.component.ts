import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from '../../data-types/Internship';
import { CommunicationService } from '../../service/communication.service';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent {
  @Input() internship!: Internship;

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
  ) {}

  displayDetails() {
    this.communicationService.setDetailsCompany(this.internship);
    this.router.navigate(['/student-internship-announcement']);
  }
}
