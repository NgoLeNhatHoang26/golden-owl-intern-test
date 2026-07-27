export const SUBJECT_LABELS: Record<string, string> = {
  math: 'Toán',
  literature: 'Ngữ văn',
  foreignLanguage: 'Ngoại ngữ',
  physics: 'Vật lí',
  chemistry: 'Hóa học',
  biology: 'Sinh học',
  history: 'Lịch sử',
  geography: 'Địa lí',
  civicEducation: 'GDCD',
};

export const SCORE_LEVELS = [
  { key: 'excellent', label: 'Giỏi (≥8)', color: '#22c55e' },
  { key: 'good', label: 'Khá (6-8)', color: '#3b82f6' },
  { key: 'average', label: 'TB (4-6)', color: '#f59e0b' },
  { key: 'poor', label: 'Yếu (<4)', color: '#ef4444' },
] as const;
