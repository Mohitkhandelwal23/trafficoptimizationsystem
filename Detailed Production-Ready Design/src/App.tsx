import { useState } from 'react';
import { Sidebar } from './components/sidebar';
import { Dashboard } from './components/dashboard';
import { LiveMap } from './components/live-map';
import { SignalControl } from './components/signal-control';
import { EChallanCenter } from './components/e-challan-center';
import { Analytics } from './components/analytics';
import { ModelMonitoring } from './components/model-monitoring';
import { Settings } from './components/settings';
import { LoginPage } from './components/login-page';
import { LandingPage } from './components/landing-page';
import { LiveStreaming } from './components/live-streaming';
import { VideoUpload } from './components/video-upload';
import { DemoVideos } from './components/demo-videos';



type AppState = 'landing' | 'login' | 'admin' | 'demo';

export default function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Landing page state
  if (appState === 'landing') {
    return (
      <LandingPage 
        onNavigateToLogin={() => setAppState('login')}
        onNavigateToDemo={() => setAppState('demo')}
      />
    );
  }

  // Demo videos state
  if (appState === 'demo') {
    return (
      <DemoVideos onBackToLanding={() => setAppState('landing')} />
    );
  }

  // Login state
  if (appState === 'login') {
    return (
      <LoginPage 
        onLogin={() => setAppState('admin')}
        onBackToLanding={() => setAppState('landing')}
      />
    );
  }

  // Admin dashboard state
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'live-map':
        return <LiveMap />;
      case 'live-traffic':
        return <VideoUpload />;
      case 'signal-control':
        return <SignalControl />;
      case 'e-challan':
        return <EChallanCenter />;
      case 'analytics':
        return <Analytics />;
      case 'model-monitoring':
        return <ModelMonitoring />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground dark">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onBackToLanding={() => setAppState('landing')}
      />
      <main className="flex-1 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
}