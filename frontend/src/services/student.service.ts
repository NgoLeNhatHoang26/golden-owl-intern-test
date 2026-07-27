import { api } from './api';
import type { Student, TopStudentGroupA } from '../types/student.types';

export const getStudentByRegistrationNumber = (registrationNumber: string) =>
  api
    .get<Student | null>(`/students/${registrationNumber}`)
    .then((res) => res.data);

export const getTopStudents = () =>
  api.get<TopStudentGroupA[]>('/students/top-students').then((res) => res.data);
