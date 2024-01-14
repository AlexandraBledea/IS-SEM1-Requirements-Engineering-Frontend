import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Internship } from '../data-types/Internship';

const URL_BASE = 'http://localhost:8090/company';
const GET_RECRUITER = URL_BASE + '/get-recruiter';
const GET_ALL_APPLICATIONS = URL_BASE + '/list-all-applications';
const CREATE_INTERNSHIP = URL_BASE + '/create-internship-announcement';
const UPDATE_INTERNSHIP = URL_BASE + '/edit-internship-announcement';
const DELETE_INTERNSHIP = URL_BASE + '/delete-internship-announcement';
const GET_INTERNSHIPS = URL_BASE + '/list-internship-announcements';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  constructor(private httpClient: HttpClient) {}

  public getRecruiter(recruiterId: number) {
    return this.httpClient.get(`${GET_RECRUITER}?recruiterId=${recruiterId}`);
  }

  public getAllApplications() {
    return this.httpClient.get(GET_ALL_APPLICATIONS);
  }

  public createInternship(internship: any) {
    return this.httpClient.post(CREATE_INTERNSHIP, internship, {
      responseType: 'text',
    });
  }

  public updateInternship(internship: any) {
    return this.httpClient.post(UPDATE_INTERNSHIP, internship, {
      responseType: 'text',
    });
  }

  public deleteInternship(internship: Internship) {
    return this.httpClient.delete(
      `${DELETE_INTERNSHIP}?internshipId=${internship.id}`,
      { responseType: 'text' },
    );
  }

  public getInternshipAnnouncements(id: number) {
    return this.httpClient.get(`${GET_INTERNSHIPS}?recruiterId=${id}`);
  }
}
