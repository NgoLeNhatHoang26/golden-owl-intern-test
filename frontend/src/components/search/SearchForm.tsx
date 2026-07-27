import Label from '../form/Label';
import Input from '../form/input/InputField';

interface SearchFormProps {
  registrationNumber: string;
  loading: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function SearchForm({
  registrationNumber,
  loading,
  error,
  onChange,
  onSubmit,
}: SearchFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="registrationNumber">Registration Number</Label>
        <Input
          id="registrationNumber"
          name="registrationNumber"
          type="text"
          placeholder="Enter registration number"
          value={registrationNumber}
          onChange={(event) => onChange(event.target.value)}
          error={Boolean(error)}
          disabled={loading}
        />
        {error && (
          <p className="mt-1.5 text-xs text-error-500">{error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
      >
        {loading ? 'Searching...' : 'Submit'}
      </button>
    </form>
  );
}
