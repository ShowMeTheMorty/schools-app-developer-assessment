import { Routes, Route, Navigate } from 'react-router-dom';
import NotFoundPage from 'pages/NotFoundPage';
import WelcomePage from 'pages/WelcomePage';
import SchoolListPage from 'pages/SchoolListPage';

const ROUTES = {
  home: '/home',
  schools: '/schools',
} as const;

const AppRoutes = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.home} replace />} />
      <Route path={ROUTES.home} element={<WelcomePage />} />
      <Route path={ROUTES.schools} element={<SchoolListPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export { AppRoutes as default, ROUTES };