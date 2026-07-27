export function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined) {
    return '—';
  }

  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
