import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { parseJwt } from 'src/app/utils/JWTParser';

@Component({
  selector: 'app-recruiter-create-announcement',
  templateUrl: './recruiter-create-announcement.component.html',
  styleUrls: ['./recruiter-create-announcement.component.scss'],
})
export class RecruiterCreateAnnouncementComponent implements OnInit {
  internshipAnnouncementFormGroup = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    jobPosition: ['', [Validators.required]],
    industry: ['', [Validators.required]],
    location: ['', [Validators.required]],
    salary: [
      '',
      [Validators.required, Validators.pattern(/^(?:[1-9]\d{3,5}|1000000)$/)],
    ],
    duration: [
      '',
      [Validators.required, Validators.pattern(/^(?:[1-9]\d{0,5}|1000000)$/)],
    ],
    availablePositions: [
      '',
      [Validators.required, Validators.pattern(/^(?:[1-9]\d{0,5}|1000000)$/)],
    ],
    deadline: ['', Validators.required],
    jobDescription: ['', Validators.required],
    requirements: ['', Validators.required],
    schedule: ['', Validators.required],
    process: ['', Validators.required],
    benefits: ['', Validators.required],
  });

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

  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = '';

  companyId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private recruiterService: RecruiterService,
  ) {}

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    this.recruiterService.getRecruiter(jwt['id']).subscribe((res: any) => {
      this.companyId = res['company']['id'];
    });
  }

  createInternship() {
    const values = this.internshipAnnouncementFormGroup.value;

    const internship = {
      id: null,
      companyId: this.companyId,
      jobTitle: values.jobTitle,
      jobDescription: values.jobDescription,
      position: values.jobPosition,
      requirements: values.requirements,
      duration: values.duration,
      schedule: values.schedule,
      location: values.location,
      availablePositions: values.availablePositions,
      salary: values.salary,
      process: values.process,
      deadline: values.deadline,
      benefits: values.benefits,
      industry: values.industry,
    };

    this.recruiterService.createInternship(internship).subscribe({
      next: (result: any) => {
        const response = JSON.stringify(result);

        if (response === '"Internship announcement created successfully!"') {
          this.showCreateAccountSuccessfulMessage = true;
        } else {
          this.errorMessage = response;
          this.showCreateAccountErrorMessage = true;
        }
      },
    });
  }

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
    this.showCreateAccountSuccessfulMessage = false;
  }

  cancel() {
    this.router.navigate(['/student-home']);
  }
}
