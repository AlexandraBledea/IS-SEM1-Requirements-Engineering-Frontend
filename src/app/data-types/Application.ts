import { Internship } from './Internship';
import { Student } from './Student';

export interface Application {
  id: number;
  coverLetter: string;
  cv: string;
  others: string;
  student: Student;
  internship: Internship;
}
