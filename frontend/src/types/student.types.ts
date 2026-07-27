export interface Student {
  id: number;
  registrationNumber: string;
  math: number | null;
  literature: number | null;
  foreignLanguage: number | null;
  physics: number | null;
  chemistry: number | null;
  biology: number | null;
  history: number | null;
  geography: number | null;
  civicEducation: number | null;
  foreignLanguageCode: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TopStudentGroupA {
  registrationNumber: string;
  math: number;
  physics: number;
  chemistry: number;
  totalScore: number;
}
