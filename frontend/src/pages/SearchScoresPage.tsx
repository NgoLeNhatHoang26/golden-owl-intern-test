import ComponentCard from '../components/common/ComponentCard';
import PageMeta from '../components/common/PageMeta';
import ScoreDetailCard from '../components/search/ScoreDetailCard';
import SearchForm from '../components/search/SearchForm';
import { useStudentSearch } from '../hooks/useStudentSearch';

export default function SearchScoresPage() {
  const {
    registrationNumber,
    setRegistrationNumber,
    student,
    loading,
    error,
    searched,
    search,
  } = useStudentSearch();

  return (
    <>
      <PageMeta
        title="Search Scores | G-Scores"
        description="Look up student scores by registration number"
      />

      <div className="space-y-6">
        <ComponentCard title="User Registration">
          <SearchForm
            registrationNumber={registrationNumber}
            loading={loading}
            error={error}
            onChange={setRegistrationNumber}
            onSubmit={search}
          />
        </ComponentCard>

        <ComponentCard title="Detailed Scores">
          <ScoreDetailCard student={student} searched={searched} />
        </ComponentCard>
      </div>
    </>
  );
}
