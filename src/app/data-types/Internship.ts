import { Company } from './Company';

export interface Internship {
  id: number;
  company: Company;
  jobTitle: string;
  jobDescription: string;
  position: string;
  requirements: string;
  duration: number;
  schedule: string;
  location: string;
  availablePositions: string;
  salary: number;
  process: string;
  deadline: string;
  benefits: string;
  industry: string;
}

export interface InternshipCreateUpdate {
  id: number;
  companyId: number;
  jobTitle: string;
  jobDescription: string;
  position: string;
  requirements: string;
  duration: number;
  schedule: string;
  location: string;
  availablePositions: string;
  salary: number;
  process: string;
  deadline: string;
  benefits: string;
  industry: string;
}
