import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import { ScrollToTop } from './components/common/ScrollToTop';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import SearchScoresPage from './pages/SearchScoresPage';
import NotFound from './pages/OtherPage/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/search" element={<SearchScoresPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
