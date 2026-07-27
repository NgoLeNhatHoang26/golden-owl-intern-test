import ComponentCard from '../components/common/ComponentCard';
import PageMeta from '../components/common/PageMeta';
import SubjectLevelChart from '../components/reports/SubjectLevelChart';
import SubjectStatisticsTable from '../components/reports/SubjectStatisticsTable';
import { useSubjectStatistics } from '../hooks/useSubjectStatistics';

export default function ReportsPage() {
  const { data, categories, series, colors, loading, error } =
    useSubjectStatistics();

  return (
    <>
      <PageMeta
        title="Reports | G-Scores"
        description="Statistics of student scores by subject and level"
      />

      <div className="space-y-6">
        <ComponentCard
          title="Score Level Report by Subject"
          desc="Giỏi (≥8), Khá (6-8), Trung bình (4-6), Yếu (<4)"
        >
          <SubjectLevelChart
            categories={categories}
            series={series}
            colors={colors}
            loading={loading}
            error={error}
          />
        </ComponentCard>

        <ComponentCard title="Detailed Statistics">
          <SubjectStatisticsTable data={data} />
        </ComponentCard>
      </div>
    </>
  );
}
