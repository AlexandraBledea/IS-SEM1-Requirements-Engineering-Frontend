export enum Role {
  STUDENT = 'STUDENT',
  RECRUITER = 'RECRUITER',
}

export interface User {
  id: number;
  email: string;
  forename: string;
  surname: string;
  phoneNumber: string;
  role: Role;
  companyName?: string;
}
