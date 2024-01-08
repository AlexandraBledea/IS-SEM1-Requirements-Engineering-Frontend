import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { parseJwt } from '../../utils/JWTParser';
import { Student } from '../../data-types/Student';
import { StudentService } from '../../service/student.service';
import { Role, User } from '../../data-types/User';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
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

  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = '';

  student?: Student;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.loadStudent();
  }

  loadStudent() {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    this.studentService.getStudent(jwt['id']).subscribe((response: any) => {
      this.student = response;
      this.studentProfileFormGroup.patchValue(response);
      this.studentProfileFormGroup.patchValue({
        ...this.studentProfileFormGroup.value,
        forename: response.user.forename,
        surname: response.user.surname,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
      });
    });
  }

  // initializeStudentFields(){
  //   this.student = {
  //     age: parseInt(this.studentProfileFormGroup.value.age!),
  //     location: this.studentProfileFormGroup.value.location!,
  //     personalWebsite: this.studentProfileFormGroup.value.personalWebsite!,
  //     currentInstitution: this.studentProfileFormGroup.value.currentInstitution!,
  //     studyProgram: this.studentProfileFormGroup.value.studyProgram!,
  //     relevantCoursework: this.studentProfileFormGroup.value.relevantCoursework!,
  //     gpa: this.studentProfileFormGroup.value.gpa!,
  //     pastExperience: this.studentProfileFormGroup.value.pastExperience!,
  //     skills: this.studentProfileFormGroup.value.skills!,
  //     projects: this.studentProfileFormGroup.value.projects!,
  //     extracurricularActivities: this.studentProfileFormGroup.value.extracurricularActivities!,
  //     languages: this.studentProfileFormGroup.value.languages!,
  //     careerObjectives: this.studentProfileFormGroup.value.careerObjectives!,
  //     references: this.studentProfileFormGroup.value.references!,
  //     hobbies: this.studentProfileFormGroup.value.hobbies!,
  //     achievements: this.studentProfileFormGroup.value.achievements!
  //   }
  // }

  editProfile() {
    const values = this.studentProfileFormGroup.value;

    const modifiedUser: User = {
      id: this.student!.id,
      forename: values.forename!,
      surname: values.surname!,
      phoneNumber: values.phoneNumber!,
      email: values.email!,
      role: Role.STUDENT,
      companyName: undefined,
    };

    const modifiedStudent: Student = {
      id: this.student!.id,
      user: modifiedUser,
      age: parseInt(values.age!),
      location: values.location!,
      personalWebsite: values.personalWebsite!,
      currentInstitution: values.currentInstitution!,
      studyProgram: values.studyProgram!,
      relevantCoursework: values.relevantCoursework!,
      gpa: values.gpa!,
      pastExperience: values.pastExperience!,
      skills: values.skills!,
      projects: values.projects!,
      extracurricularActivities: values.extracurricularActivities!,
      languages: values.languages!,
      careerObjectives: values.careerObjectives!,
      references: values.references!,
      hobbies: values.hobbies!,
      achievements: values.achievements!,
    };

    this.studentService.editStudent(modifiedStudent).subscribe({
      next: (result: any) => {
        const response = JSON.stringify(result);

        if (response === '"Student updated successfully!"') {
          this.showCreateAccountSuccessfulMessage = true;
          this.loadStudent();
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
