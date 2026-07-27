import { api } from './api';
import type { SubjectStatistic } from '../types/statistic.types';

export const getSubjectReportByLevel = () =>
  api
    .get<SubjectStatistic[]>('/statistics/subject-report-by-level')
    .then((res) => res.data);
