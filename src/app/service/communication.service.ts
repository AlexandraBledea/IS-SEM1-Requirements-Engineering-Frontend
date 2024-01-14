import { Injectable } from '@angular/core';
import { Internship } from '../data-types/Internship';
import { Application } from '../data-types/Application';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  detailsInternship!: Internship;
  detailsApplication!: Application;

  constructor() {}

  setDetailsCompany(internship: Internship) {
    this.detailsInternship = internship;
  }

  getDetailsCompany() {
    return this.detailsInternship;
  }

  setDetailsApplication(application: Application) {
    this.detailsApplication = application;
  }

  getDetailsApplication() {
    return this.detailsApplication;
  }
}
