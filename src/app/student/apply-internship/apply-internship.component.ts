import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Application } from 'src/app/data-types/Application';
import { Internship } from 'src/app/data-types/Internship';
import { Student } from 'src/app/data-types/Student';
import { parseJwt } from '../../utils/JWTParser';
import { StudentService } from 'src/app/service/student.service';
import { CookieService } from 'ngx-cookie-service';
import { CommunicationService } from 'src/app/service/communication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-internship',
  templateUrl: './apply-internship.component.html',
  styleUrls: ['./apply-internship.component.scss'],
})
export class ApplyInternshipComponent implements OnInit {
  file1: string = '';
  file2: string = '';
  student: Student | undefined;
  internship: Internship | undefined;

  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = '';

  coverLetterFormGroup = this.formBuilder.group({
    coverLetter: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private communicationService: CommunicationService,
    private studentService: StudentService,
    private router: Router,
  ) {}

  ngOnInit() {
    const token = this.cookieService.get('Token');
    const jwt = parseJwt(token);
    this.studentService.getStudent(jwt['id']).subscribe((response: any) => {
      this.student = response;
    });
    this.internship = this.communicationService.getDetailsCompany();
  }

  onFile1Selected(event: Event) {
    const tg = event.currentTarget as HTMLInputElement;

    if (!tg.files) {
      return;
    }

    const file: File = tg.files[0];

    const myReader: FileReader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    myReader.onloadend = (e) => {
      this.file1 = myReader.result!.toString();
    };
    myReader.readAsDataURL(file);
  }

  onFile2Selected(event: Event) {
    const tg = event.currentTarget as HTMLInputElement;

    if (!tg.files) {
      return;
    }

    const file: File = tg.files[0];

    const myReader: FileReader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    myReader.onloadend = (e) => {
      this.file2 = myReader.result!.toString();
    };
    myReader.readAsDataURL(file);
  }

  apply() {
    const application: Application = {
      id: Math.floor(Math.random() * 100000),
      coverLetter: this.coverLetterFormGroup.value.coverLetter!,
      cv: this.file1,
      others: this.file2,
      student: this.student!,
      internship: this.internship!,
    };

    this.studentService.createApplication(application).subscribe({
      next: (result: any) => {
        const response = JSON.stringify(result);

        if (response === '"Application created successfully!"') {
          this.showCreateAccountSuccessfulMessage = true;
        } else if (response === '"The application already exists!"') {
          this.errorMessage = 'The application already exists!';
          this.showCreateAccountErrorMessage = true;
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

  isEnabled() {
    return !!(this.coverLetterFormGroup.valid && this.file1);
  }
}
