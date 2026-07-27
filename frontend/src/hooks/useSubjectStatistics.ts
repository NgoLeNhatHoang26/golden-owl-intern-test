import { useEffect, useMemo, useState } from 'react';
import { SCORE_LEVELS, SUBJECT_LABELS } from '../constants/subjects';
import { getSubjectReportByLevel } from '../services/statistic.service';
import type { SubjectStatistic } from '../types/statistic.types';

export function useSubjectStatistics() {
  const [data, setData] = useState<SubjectStatistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSubjectReportByLevel()
      .then(setData)
      .catch(() => setError('Không tải được dữ liệu báo cáo'))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => data.map((item) => SUBJECT_LABELS[item.subject] ?? item.subject),
    [data],
  );

  const series = useMemo(
    () =>
      SCORE_LEVELS.map((level) => ({
        name: level.label,
        data: data.map((item) => item[level.key]),
      })),
    [data],
  );

  const colors = useMemo(() => SCORE_LEVELS.map((level) => level.color), []);

  return { data, categories, series, colors, loading, error };
}
