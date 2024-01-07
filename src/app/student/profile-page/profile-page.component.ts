import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  studentProfileFormGroup = this.formBuilder.group({
    surname: ['', Validators.required],
    forename: ['', Validators.required],
    phoneNumber: [
      '',
      [Validators.required, Validators.pattern(/^\+40[2-9][0-9]{8}$/)],
    ],
    email: ['', [Validators.required, Validators.email]],
    age: ['', Validators.required],
    location: [''],
    personalWebsite: [''],
    currentInstitution: ['', Validators.required],
    studyProgram: ['', Validators.required],
    relevantCoursework: ['', Validators.required],
    gpa: [''],
    pastExperience: [''],
    achievements: [''],
    skills: [''],
    projects: [''],
    extracurricularActivities: [''],
    languages: [''],
    careerObjectives: [''],
    references: [''],
    hobbies: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}

  editProfile() {}

  resetWarnings() {}

  cancel() {}
}
