import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../ui/table';
import type { TopStudentGroupA } from '../../types/student.types';
import { formatScore } from '../../utils/formatScore';

interface TopStudentsTableProps {
  students: TopStudentGroupA[];
  loading: boolean;
  error: string | null;
}

export default function TopStudentsTable({
  students,
  loading,
  error,
}: TopStudentsTableProps) {
  if (loading) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Đang tải dữ liệu...
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-error-500">{error}</p>;
  }

  if (students.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Chưa có dữ liệu thí sinh khối A.
      </p>
    );
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
                #
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                SBD
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Toán
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Vật lí
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Hóa học
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Tổng điểm
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {students.map((student, index) => (
              <TableRow key={student.registrationNumber}>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {index + 1}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {student.registrationNumber}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {formatScore(student.math)}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {formatScore(student.physics)}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm text-gray-500 dark:text-gray-400">
                  {formatScore(student.chemistry)}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-theme-sm font-semibold text-brand-500">
                  {formatScore(student.totalScore)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
