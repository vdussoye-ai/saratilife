import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, Component } from 'react';

const Landing = lazy(() => import('./pages/Landing'));
const Assessment = lazy(() => import('./pages/Assessment'));
const Scorecard = lazy(() => import('./pages/Scorecard'));
const Blueprint = lazy(() => import('./pages/Blueprint'));
const SprintDashboard = lazy(() => import('./pages/SprintDashboard'));
const CheckIn = lazy(() => import('./pages/CheckIn'));
const DecisionDashboard = lazy(() => import('./pages/DecisionDashboard'));
const Capital = lazy(() => import('./pages/Capital'));
const Article = lazy(() => import('./pages/Article'));
const NotFound = lazy(() => import('./pages/NotFound'));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8f6f3',
          color: '#2d2d2d',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '16px',
          padding: '24px',
          textAlign: 'center',
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h1>
          <pre style={{
            background: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #e8e8e8',
            maxWidth: '600px',
            width: '100%',
            overflow: 'auto',
            fontSize: '13px',
            textAlign: 'left',
            color: '#c0392b',
          }}>
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#2d2d2d',
              color: '#f8f6f3',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
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
    </ErrorBoundary>
  );
}
