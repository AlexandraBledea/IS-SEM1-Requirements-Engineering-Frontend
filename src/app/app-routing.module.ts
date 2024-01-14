import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPanelComponent } from './landing/register-panel/register-panel.component';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { ProfilePageComponent } from './student/profile-page/profile-page.component';
import { StudentInternshipDetailsComponent } from './student/student-internship-details/student-internship-details.component';
import { ApplyInternshipComponent } from './student/apply-internship/apply-internship.component';
import { InternshipApplicationsComponent } from './student/internship-applications/internship-applications.component';
import { ApplicationDetailsComponent } from './student/application-details/application-details.component';
import { RecruiterHomeComponent } from './recuiter/recruiter-home/recruiter-home.component';
import { RecruiterProfilePageComponent } from './recuiter/recruiter-profile-page/recruiter-profile-page.component';
import { AuthguardStudentService } from './authguards/authguard-student.service';
import { AuthguardService } from './authguards/authguard.service';
import { RecruiterApplicationDetailsComponent } from './recuiter/recruiter-application-details/recruiter-application-details.component';
import { RecruiterCreateAnnouncementComponent } from './recuiter/recruiter-create-announcement/recruiter-create-announcement.component';
import { RecruiterEditAnnouncementComponent } from './recuiter/recruiter-edit-announcement/recruiter-edit-announcement.component';
import { RecruiterApplicationsComponent } from './recuiter/recruiter-applications/recruiter-applications.component';
import { AuthguardLoginService } from './authguards/authguard-login.service';
import { AuthguardRecruiterService } from './authguards/authguard-recruiter.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'apply-to-internship',
    component: ApplyInternshipComponent,
    canActivate: [AuthguardService, AuthguardStudentService],
  },
  {
    path: 'student-internship-announcement',
    component: StudentInternshipDetailsComponent,
    canActivate: [AuthguardService, AuthguardStudentService],
  },
  {
    path: 'recruiter-internship-announcement',
    component: RecruiterApplicationDetailsComponent,
    canActivate: [AuthguardRecruiterService],
  },
  {
    path: 'recruiter-create-announcement',
    component: RecruiterCreateAnnouncementComponent,
    canActivate: [AuthguardRecruiterService],
  },
  {
    path: 'recruiter-edit-announcement',
    component: RecruiterEditAnnouncementComponent,
    canActivate: [AuthguardRecruiterService],
  },
  {
    path: 'recruiter-applications',
    component: RecruiterApplicationsComponent,
    canActivate: [AuthguardRecruiterService],
  },
  {
    path: 'student-applications',
    component: InternshipApplicationsComponent,
    canActivate: [AuthguardService, AuthguardStudentService],
  },
  {
    path: 'student-application',
    component: ApplicationDetailsComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'student-profile',
    component: ProfilePageComponent,
    canActivate: [AuthguardService, AuthguardStudentService],
  },
  {
    path: 'student-home',
    component: StudentHomeComponent,
    canActivate: [AuthguardService, AuthguardStudentService],
  },
  {
    path: 'recruiter-home',
    component: RecruiterHomeComponent,
    canActivate: [AuthguardRecruiterService],
  },
  {
    path: 'recruiter-profile',
    component: RecruiterProfilePageComponent,
    canActivate: [AuthguardRecruiterService],
  },
  // { path: 'login', component: LoginPanelComponent },
  // { path: 'register', component: RegisterPanelComponent },
  {
    path: 'login',
    component: LoginPanelComponent,
    canActivate: [AuthguardLoginService],
  },
  {
    path: 'register',
    component: RegisterPanelComponent,
    canActivate: [AuthguardLoginService],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
