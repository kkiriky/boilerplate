import { Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

// const Main = lazy(() => import('@/pages/Main/Main'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

const AppLayout = () => {
  return (
    <>
      <div className="fullscreen">
        <Suspense fallback={<div className="fullscreen" />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

const Main = () => {
  return <div>Main</div>;
};

const NotFound = () => {
  return <div>NotFound</div>;
};
