import { useEffect, useState } from 'react';
import { getTopStudents } from '../services/student.service';
import type { TopStudentGroupA } from '../types/student.types';

export function useTopStudents() {
  const [students, setStudents] = useState<TopStudentGroupA[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTopStudents()
      .then(setStudents)
      .catch(() => setError('Không tải được danh sách top 10 thí sinh'))
      .finally(() => setLoading(false));
  }, []);

  return { students, loading, error };
}
