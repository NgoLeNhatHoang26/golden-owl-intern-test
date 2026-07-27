import { useCallback, useState } from 'react';
import { getStudentByRegistrationNumber } from '../services/student.service';
import type { Student } from '../types/student.types';

export function useStudentSearch() {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async () => {
    const trimmed = registrationNumber.trim();

    if (!trimmed) {
      setError('Vui lòng nhập số báo danh');
      setStudent(null);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const data = await getStudentByRegistrationNumber(trimmed);

      if (!data) {
        setStudent(null);
        setError('Không tìm thấy thí sinh với số báo danh này');
        return;
      }

      setStudent(data);
    } catch {
      setStudent(null);
      setError('Không thể kết nối tới server. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  }, [registrationNumber]);

  return {
    registrationNumber,
    setRegistrationNumber,
    student,
    loading,
    error,
    searched,
    search,
  };
}
