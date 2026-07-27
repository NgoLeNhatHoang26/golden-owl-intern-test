import ComponentCard from '../components/common/ComponentCard';
import PageMeta from '../components/common/PageMeta';
import TopStudentsTable from '../components/dashboard/TopStudentsTable';
import { useTopStudents } from '../hooks/useTopStudents';

export default function DashboardPage() {
  const { students, loading, error } = useTopStudents();

  return (
    <>
      <PageMeta
        title="Dashboard | G-Scores"
        description="Top 10 students in group A by math, physics, and chemistry scores"
      />

      <div className="space-y-6">
        <ComponentCard
          title="Top 10 Students - Group A"
          desc="Ranking by total score of Math, Physics, and Chemistry"
        >
          <TopStudentsTable
            students={students}
            loading={loading}
            error={error}
          />
        </ComponentCard>
      </div>
    </>
  );
}
