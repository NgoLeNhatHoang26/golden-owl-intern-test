import { SUBJECT_LABELS } from '../../constants/subjects';
import type { Student } from '../../types/student.types';
import { formatScore } from '../../utils/formatScore';

const SCORE_FIELDS = [
  'math',
  'literature',
  'foreignLanguage',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'civicEducation',
] as const;

interface ScoreDetailCardProps {
  student: Student | null;
  searched: boolean;
}

export default function ScoreDetailCard({
  student,
  searched,
}: ScoreDetailCardProps) {
  if (!searched) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Detailed view of search scores here!
      </p>
    );
  }

  if (!student) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-white/[0.03]">
        <p className="text-sm text-gray-500 dark:text-gray-400">Số báo danh</p>
        <p className="text-lg font-semibold text-gray-800 dark:text-white/90">
          {student.registrationNumber}
        </p>
        {student.foreignLanguageCode && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Mã ngoại ngữ: {student.foreignLanguageCode}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SCORE_FIELDS.map((field) => (
          <div
            key={field}
            className="rounded-xl border border-gray-200 px-4 py-3 dark:border-gray-800"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {SUBJECT_LABELS[field]}
            </p>
            <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-white/90">
              {formatScore(student[field])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
