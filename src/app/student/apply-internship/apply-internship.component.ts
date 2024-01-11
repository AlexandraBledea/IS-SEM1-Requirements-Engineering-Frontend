import { Component } from '@angular/core';

@Component({
  selector: 'app-apply-internship',
  templateUrl: './apply-internship.component.html',
  styleUrls: ['./apply-internship.component.scss'],
})
export class ApplyInternshipComponent {
  file1: string = '';
  file2: string = '';

  constructor() {}

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
      console.log(file);
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

  apply() {}

  cancel() {}
}
