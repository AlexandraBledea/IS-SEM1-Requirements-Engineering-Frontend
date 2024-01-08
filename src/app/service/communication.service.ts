import { Injectable } from '@angular/core';
import { Internship } from '../data-types/Internship';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  detailsInternship!: Internship;
  constructor() {}

  setDetailsCompany(internship: Internship) {
    this.detailsInternship = internship;
  }

  getDetailsCompany() {
    return this.detailsInternship;
  }
}
