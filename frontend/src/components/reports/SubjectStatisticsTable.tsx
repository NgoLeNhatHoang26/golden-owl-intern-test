import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';
import { SCORE_LEVELS, SUBJECT_LABELS } from '../../constants/subjects';
import type { SubjectStatistic } from '../../types/statistic.types';

interface SubjectStatisticsTableProps {
  data: SubjectStatistic[];
}

export default function SubjectStatisticsTable({
  data,
}: SubjectStatisticsTableProps) {
  if (data.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Môn
              </TableCell>
              {SCORE_LEVELS.map((level) => (
                <TableCell
                  key={level.key}
                  isHeader
                  className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  {level.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data.map((item) => (
              <TableRow key={item.subject}>
                <TableCell className="px-5 py-4 text-start text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {SUBJECT_LABELS[item.subject] ?? item.subject}
                </TableCell>
                {SCORE_LEVELS.map((level) => (
                  <TableCell
                    key={level.key}
                    className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400"
                  >
                    {item[level.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
