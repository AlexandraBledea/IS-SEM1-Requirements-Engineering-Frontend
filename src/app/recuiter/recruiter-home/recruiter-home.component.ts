import { Component } from '@angular/core';
import { DurationFilter } from 'src/app/data-types/DurationFilter';
import { Filter } from 'src/app/data-types/Filter';
import { SalaryFilter } from 'src/app/data-types/SalaryFilter';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.scss'],
})
export class RecruiterHomeComponent {
  industries: string[] = [
    'Information Technology',
    'Marketing and Advertising',
    'Data Science and Analytics',
    'Customer Relationship Management',
    'Human Resources and Management',
    'Finance and Investment',
    'Healthcare and Pharmaceuticals',
    'Education and E-learning',
    'Retail and E-commerce',
    'Telecommunications',
    'Media and Entertainment',
    'Automotive and Transportation',
    'Real Estate and Property Management',
    'Hospitality and Tourism',
    'Manufacturing and Engineering',
    'Energy and Utilities',
    'Environmental Services',
    'Agriculture and Farming',
    'Fashion and Apparel',
    'Sports and Recreation',
  ];

  locations: string[] = [
    'Bucuresti',
    'Cluj-Napoca',
    'Timișoara',
    'Iași',
    'Constanța',
    'Craiova',
    'Brașov',
    'Galați',
    'Ploiești',
    'Oradea',
    'Brăila',
    'Arad',
    'Pitești',
    'Sibiu',
    'Bacău',
  ];

  salaries: SalaryFilter[] = [
    { lowerBound: 1000, upperBound: 2000, text: '1000-2000' },
    { lowerBound: 2000, upperBound: 3000, text: '2000-3000' },
    { lowerBound: 3000, upperBound: 4000, text: '3000-4000' },
    { lowerBound: 4000, upperBound: 999999999, text: 'greater than 4000' },
  ];

  durations: DurationFilter[] = [
    { lowerBound: 2, upperBound: 4, text: '2-4 weeks' },
    { lowerBound: 4, upperBound: 8, text: '4-8 weeks' },
    { lowerBound: 8, upperBound: 12, text: '8-12 weeks' },
    { lowerBound: 12, upperBound: 999, text: 'more than 12 weeks' },
  ];

  internshipAnnouncements = [];
  selectedDuration?: DurationFilter;
  selectedIndustry?: string;
  selectedLocation?: string;
  selectedSalary?: SalaryFilter;
  searchValue?: string;

  constructor(private studentService: StudentService) {
    this.fetchInternshipAnnouncements();
  }

  fetchInternshipAnnouncements() {
    this.studentService
      .getInternshipAnnouncements()
      .subscribe((response: any) => {
        this.internshipAnnouncements = response;
      });
  }

  fetchFilteredInternshipAnnouncements() {
    this.searchValue = undefined;

    const filterOptions: Filter = {
      industry: this.selectedIndustry,
      location: this.selectedLocation,
      salaryLower: this.selectedSalary?.lowerBound,
      salaryUpper:
        this.selectedSalary?.upperBound === 999999999
          ? undefined
          : this.selectedSalary?.upperBound,
      durationLower: this.selectedDuration?.lowerBound,
      durationUpper:
        this.selectedDuration?.upperBound === 999
          ? undefined
          : this.selectedDuration?.upperBound,
    };

    this.studentService
      .getFilteredInternshipAnnouncements(filterOptions)
      .subscribe((response: any) => {
        this.internshipAnnouncements = response;
      });
  }

  fetchSearchedInternshipAnnouncements() {
    this.selectedSalary = undefined;
    this.selectedIndustry = undefined;
    this.selectedLocation = undefined;
    this.selectedDuration = undefined;

    if (this.searchValue == undefined) {
      this.searchValue = '';
    }

    this.studentService
      .getSearchedInternshipAnnouncements(this.searchValue)
      .subscribe((response: any) => {
        this.internshipAnnouncements = response;
      });
  }
}
