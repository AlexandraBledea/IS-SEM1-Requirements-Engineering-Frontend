import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPanelComponent } from 'src/app/landing/register-panel/register-panel.component';
import { RegisterFormComponent } from './landing/register-panel/register-form/register-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginPanelComponent } from './landing/login-panel/login-panel.component';
import { LoginFormComponent } from './landing/login-panel/login-form/login-form.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StudentNavBarComponent } from './student/student-nav-bar/student-nav-bar.component';
import { InternshipCardComponent } from './student/internship-card/internship-card.component';
import { ProfilePageComponent } from './student/profile-page/profile-page.component';
import { StudentInternshipDetailsComponent } from './student/student-internship-details/student-internship-details.component';
import { ApplyInternshipComponent } from './student/apply-internship/apply-internship.component';
import { AuthenticationInterceptor } from './service/authentication-interceptor.service';
import { InternshipApplicationsComponent } from './student/internship-applications/internship-applications.component';
import { ApplicationCardComponent } from './student/application-card/application-card.component';
import { ApplicationDetailsComponent } from './student/application-details/application-details.component';
import { RecruiterHomeComponent } from './recuiter/recruiter-home/recruiter-home.component';
import { RecruiterNavBarComponent } from './recuiter/recruiter-nav-bar/recruiter-nav-bar.component';
import { RecruiterApplicationDetailsComponent } from './recuiter/recruiter-application-details/recruiter-application-details.component';
import { RecruiterProfilePageComponent } from './recuiter/recruiter-profile-page/recruiter-profile-page.component';
import { RecruiterCreateAnnouncementComponent } from './recuiter/recruiter-create-announcement/recruiter-create-announcement.component';
import { RecruiterEditAnnouncementComponent } from './recuiter/recruiter-edit-announcement/recruiter-edit-announcement.component';
import { RecruiterApplicationsComponent } from './recuiter/recruiter-applications/recruiter-applications.component';
import { ConfirmationDialogBoxComponent } from './confirmation-dialog-box/confirmation-dialog-box.component';
import { RecruiterViewApplicationsComponent } from './recuiter/recruiter-view-applications/recruiter-view-applications.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPanelComponent,
    RegisterFormComponent,
    LoginPanelComponent,
    LoginFormComponent,
    StudentHomeComponent,
    StudentNavBarComponent,
    InternshipCardComponent,
    ProfilePageComponent,
    StudentInternshipDetailsComponent,
    ApplyInternshipComponent,
    RecruiterHomeComponent,
    RecruiterNavBarComponent,
    RecruiterApplicationDetailsComponent,
    ApplicationCardComponent,
    RecruiterProfilePageComponent,
    InternshipApplicationsComponent,
    ApplicationCardComponent,
    ApplicationDetailsComponent,
    RecruiterCreateAnnouncementComponent,
    RecruiterEditAnnouncementComponent,
    RecruiterApplicationsComponent,
    ConfirmationDialogBoxComponent,
    RecruiterViewApplicationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
