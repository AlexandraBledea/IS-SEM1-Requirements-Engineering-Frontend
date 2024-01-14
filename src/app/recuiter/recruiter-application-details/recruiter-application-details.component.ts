import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Internship } from 'src/app/data-types/Internship';
import { CommunicationService } from 'src/app/service/communication.service';
import { RecruiterService } from 'src/app/service/recruiter.service';
import { ConfirmationDialogBoxComponent } from '../../confirmation-dialog-box/confirmation-dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-recruiter-application-details',
  templateUrl: './recruiter-application-details.component.html',
  styleUrls: ['./recruiter-application-details.component.scss'],
})
export class RecruiterApplicationDetailsComponent {
  internship!: Internship;
  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private communicationService: CommunicationService,
    private recruiterService: RecruiterService,
    public dialog: MatDialog,
  ) {
    this.internship = this.communicationService.getDetailsCompany();
  }

  deleteInternship() {
    const dialogRef = this.dialog.open(ConfirmationDialogBoxComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this internship ?',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.recruiterService.deleteInternship(this.internship).subscribe({
          next: (result: any) => {
            const response = JSON.stringify(result);

            if (
              response === '"Internship announcement deleted successfully!"'
            ) {
              this.showCreateAccountSuccessfulMessage = true;
              setTimeout(() => {
                this.router.navigate(['/recruiter-home']);
              }, 500);
            } else if (
              response === '"Internship was not deleted! It has applications!"'
            ) {
              this.errorMessage =
                'Internship was not deleted! It has active applications!';
              this.showCreateAccountErrorMessage = true;
              return;
            } else {
              this.errorMessage = response;
              this.showCreateAccountErrorMessage = true;
              return;
            }
          },
        });
      }
    });
  }

  editInternship() {
    this.router.navigate(['./recruiter-edit-announcement']);
  }
}
