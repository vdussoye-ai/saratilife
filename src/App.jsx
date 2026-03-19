import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Landing = lazy(() => import('./pages/Landing'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Scorecard = lazy(() => import('./pages/Scorecard'));
const Blueprint = lazy(() => import('./pages/Blueprint'));
const SprintDashboard = lazy(() => import('./pages/SprintDashboard'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const DecisionDashboard = lazy(() => import('./pages/DecisionDashboard'));
const About = lazy(() => import('./pages/About'));
const Capital = lazy(() => import('./pages/Capital'));
const Article = lazy(() => import('./pages/Article'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Loading() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--cream)',
      color: 'var(--charcoal)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-md)',
    }}>
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/scorecard" element={<Scorecard />} />
          <Route path="/blueprint" element={<Blueprint />} />
          <Route path="/sprint" element={<SprintDashboard />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/decisions" element={<DecisionDashboard />} />
          <Route path="/capital/:id" element={<Capital />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
