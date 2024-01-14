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

    this.studentProfileFormGroup.controls['jobTitle'].setValue(
      this.internship.jobTitle,
    );
    this.studentProfileFormGroup.controls['jobPosition'].setValue(
      this.internship.position,
    );
    this.studentProfileFormGroup.controls['industry'].setValue(
      this.internship.industry,
    );
    this.studentProfileFormGroup.controls['location'].setValue(
      this.internship.location,
    );
    this.studentProfileFormGroup.controls['salary'].setValue(
      this.internship.salary.toString(),
    );
    this.studentProfileFormGroup.controls['duration'].setValue(
      this.internship.duration.toString(),
    );
    this.studentProfileFormGroup.controls['availablePositions'].setValue(
      this.internship.availablePositions.toString(),
    );
    this.studentProfileFormGroup.controls['deadline'].setValue(
      this.internship.deadline,
    );
    this.studentProfileFormGroup.controls['requirements'].setValue(
      this.internship.requirements,
    );
    this.studentProfileFormGroup.controls['schedule'].setValue(
      this.internship.schedule,
    );
    this.studentProfileFormGroup.controls['process'].setValue(
      this.internship.process,
    );
    this.studentProfileFormGroup.controls['jobDescription'].setValue(
      this.internship.jobDescription,
    );
    this.studentProfileFormGroup.controls['benefits'].setValue(
      this.internship.benefits,
    );
  }

  editInternship() {
    const values = this.studentProfileFormGroup.value;

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
