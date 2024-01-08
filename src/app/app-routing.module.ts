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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'apply-to-internship', component: ApplyInternshipComponent },
  {
    path: 'student-internship-announcement',
    component: StudentInternshipDetailsComponent,
  },
  { path: 'student-applications', component: InternshipApplicationsComponent },
  { path: 'student-application', component: ApplicationDetailsComponent },
  { path: 'student-profile', component: ProfilePageComponent },
  { path: 'student-home', component: StudentHomeComponent },
  { path: 'login', component: LoginPanelComponent },
  { path: 'register', component: RegisterPanelComponent },
  { path: '**', redirectTo: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
