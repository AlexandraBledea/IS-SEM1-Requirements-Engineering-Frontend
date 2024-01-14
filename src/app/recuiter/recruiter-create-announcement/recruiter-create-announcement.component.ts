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
  studentProfileFormGroup = this.formBuilder.group({
    jobTitle: ['', Validators.required],
    jobPosition: ['', Validators.required],
    industry: ['', [Validators.required]],
    location: ['', [Validators.required]],
    salary: ['', Validators.required],
    duration: ['', Validators.required],
    availablePositions: ['', Validators.required],
    deadline: ['', Validators.required],
    jobDescription: ['', Validators.required],
    requirements: ['', Validators.required],
    schedule: ['', Validators.required],
    process: ['', Validators.required],
    benefits: ['', Validators.required],
  });

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
    const values = this.studentProfileFormGroup.value;

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
          this.router.navigate(['recruiter-home']);
        } else {
          this.errorMessage = response;
          this.showCreateAccountErrorMessage = true;
        }
      },
    });

    // const modifiedUser: User = {
    //   id: this.student!.id,
    //   forename: values.forename!,
    //   surname: values.surname!,
    //   phoneNumber: values.phoneNumber!,
    //   email: values.email!,
    //   role: Role.STUDENT,
    //   companyName: undefined,
    // };

    // const modifiedStudent: Student = {
    //   id: this.student!.id,
    //   user: modifiedUser,
    //   age: parseInt(values.age!),
    //   location: values.location!,
    //   personalWebsite: values.personalWebsite!,
    //   currentInstitution: values.currentInstitution!,
    //   studyProgram: values.studyProgram!,
    //   relevantCoursework: values.relevantCoursework!,
    //   gpa: values.gpa!,
    //   pastExperience: values.pastExperience!,
    //   skills: values.skills!,
    //   projects: values.projects!,
    //   extracurricularActivities: values.extracurricularActivities!,
    //   languages: values.languages!,
    //   careerObjectives: values.careerObjectives!,
    //   references: values.references!,
    //   hobbies: values.hobbies!,
    //   achievements: values.achievements!,
    // };

    // this.studentService.editStudent(modifiedStudent).subscribe({
    //   next: (result: any) => {
    //     const response = JSON.stringify(result);

    //     if (response === '"Student updated successfully!"') {
    //       this.showCreateAccountSuccessfulMessage = true;
    //       this.loadStudent();
    //     } else {
    //       this.errorMessage = response;
    //       this.showCreateAccountErrorMessage = true;
    //     }
    //   },
    // });
  }

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
    this.showCreateAccountSuccessfulMessage = false;
  }

  cancel() {
    this.router.navigate(['/student-home']);
  }
}
