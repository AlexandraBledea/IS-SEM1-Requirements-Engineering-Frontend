export enum Role {
  STUDENT = 'STUDENT',
  RECRUITER = 'RECRUITER',
}

export interface UserRegisterData {
  email: string;
  password: string;
  forename: string;
  surname: string;
  phoneNumber: string;
  role: Role;
  companyName: string;
}
