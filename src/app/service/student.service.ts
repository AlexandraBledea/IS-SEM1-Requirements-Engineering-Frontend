import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Internship } from '../data-types/Internship';
import { Filter } from '../data-types/Filter';
import { Student } from '../data-types/Student';

const URL_BASE = 'http://localhost:8090/student';
const GET_INTERNSHIP_ANNOUNCEMENTS =
  URL_BASE + '/list-internship-announcements';
const FILTER_INTERNSHIP_ANNOUNCEMENTS =
  URL_BASE + '/filter-internship-announcements';
const SEARCH_INTERNSHIP_ANNOUNCEMENTS =
  URL_BASE + '/search-internship-announcements';
const GET_USER = URL_BASE + '/get-student';
const EDIT_STUDENT = URL_BASE + '/edit-student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private httpClient: HttpClient) {}

  public getInternshipAnnouncements(): Observable<Internship[]> {
    return this.httpClient.get<Internship[]>(GET_INTERNSHIP_ANNOUNCEMENTS);
  }

  public getFilteredInternshipAnnouncements(
    dto: Filter,
  ): Observable<Internship[]> {
    if (dto.location == undefined) {
      dto.location = '';
    }
    if (dto.industry == undefined) {
      dto.industry = '';
    }
    if (dto.durationUpper == undefined) {
      dto.durationUpper = '';
    }
    if (dto.durationLower == undefined) {
      dto.durationLower = '';
    }
    if (dto.salaryUpper == undefined) {
      dto.salaryUpper = '';
    }
    if (dto.salaryLower == undefined) {
      dto.salaryLower = '';
    }

    return this.httpClient.get<
      Internship[]
    >(`${FILTER_INTERNSHIP_ANNOUNCEMENTS}?salaryLowerBound=${dto.salaryLower}&salaryUpperBound=${dto.salaryUpper}&durationLowerBound=${dto.durationLower}
    &durationUpperBound=${dto.durationUpper}&industry=${dto.industry}&location=${dto.location}`);
  }

  public getSearchedInternshipAnnouncements(
    query: string,
  ): Observable<Internship[]> {
    return this.httpClient.get<Internship[]>(
      `${SEARCH_INTERNSHIP_ANNOUNCEMENTS}?query=${query}`,
    );
  }

  public getStudent(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${GET_USER}?id=${id}`);
  }

  public editStudent(student: Student): any {
    return this.httpClient.put(EDIT_STUDENT, student, { responseType: 'text' });
  }
}
