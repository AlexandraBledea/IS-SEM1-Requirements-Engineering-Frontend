import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Internship } from 'src/app/data-types/Internship';
import { CommunicationService } from 'src/app/service/communication.service';
import { RecruiterService } from 'src/app/service/recruiter.service';

@Component({
  selector: 'app-recruiter-edit-announcement',
  templateUrl: './recruiter-edit-announcement.component.html',
  styleUrls: ['./recruiter-edit-announcement.component.scss'],
})
export class RecruiterEditAnnouncementComponent implements OnInit {
  internshipAnnouncementFormGroup = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    jobPosition: ['', Validators.required],
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

  internship?: Internship;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private recruiterService: RecruiterService,
    private communitationService: CommunicationService,
  ) {}

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    this.internship = this.communitationService.getDetailsCompany();

    this.internshipAnnouncementFormGroup.controls['jobTitle'].setValue(
      this.internship.jobTitle,
    );
    this.internshipAnnouncementFormGroup.controls['jobPosition'].setValue(
      this.internship.position,
    );
    this.internshipAnnouncementFormGroup.controls['industry'].setValue(
      this.internship.industry,
    );
    this.internshipAnnouncementFormGroup.controls['location'].setValue(
      this.internship.location,
    );
    this.internshipAnnouncementFormGroup.controls['salary'].setValue(
      this.internship.salary.toString(),
    );
    this.internshipAnnouncementFormGroup.controls['duration'].setValue(
      this.internship.duration.toString(),
    );
    this.internshipAnnouncementFormGroup.controls[
      'availablePositions'
    ].setValue(this.internship.availablePositions.toString());
    this.internshipAnnouncementFormGroup.controls['deadline'].setValue(
      this.internship.deadline,
    );
    this.internshipAnnouncementFormGroup.controls['requirements'].setValue(
      this.internship.requirements,
    );
    this.internshipAnnouncementFormGroup.controls['schedule'].setValue(
      this.internship.schedule,
    );
    this.internshipAnnouncementFormGroup.controls['process'].setValue(
      this.internship.process,
    );
    this.internshipAnnouncementFormGroup.controls['jobDescription'].setValue(
      this.internship.jobDescription,
    );
    this.internshipAnnouncementFormGroup.controls['benefits'].setValue(
      this.internship.benefits,
    );
  }

  editInternship() {
    const values = this.internshipAnnouncementFormGroup.value;

    const internship = {
      id: this.internship?.id,
      companyId: this.internship?.company.id,
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

    this.recruiterService.updateInternship(internship).subscribe({
      next: (result: any) => {
        const response = JSON.stringify(result);

        if (response === '"Internship announcement updated successfully!"') {
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
    this.router.navigate(['/recruiter-home']);
  }
}
