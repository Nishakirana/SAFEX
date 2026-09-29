import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { PresentationBar } from './components/layout/PresentationBar';
import { SafetyAIGuide } from './components/layout/SafetyAIGuide';

import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { LoginPage } from './pages/LoginPage';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { EnvironmentScannerPage } from './pages/EnvironmentScannerPage';
import { SimulationsLibraryPage } from './pages/SimulationsLibraryPage';
import { SimulationRunnerPage } from './pages/SimulationRunnerPage';
import { ProgressPage } from './pages/ProgressPage';
import { RetrainingPage } from './pages/RetrainingPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { VerifyPage } from './pages/VerifyPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminWorkforcePage } from './pages/AdminWorkforcePage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { AdminCertificationsPage } from './pages/AdminCertificationsPage';
import { AdminReportsPage } from './pages/AdminReportsPage';

const AppContent: React.FC = () => {
  const { activeRoute } = useApp();

  const renderCurrentView = () => {
    if (activeRoute === '/') return <LandingPage />;
    if (activeRoute === '/onboarding') return <OnboardingPage />;
    if (activeRoute === '/login') return <LoginPage />;
    if (activeRoute === '/dashboard') return <WorkerDashboard />;
    if (activeRoute === '/scan') return <EnvironmentScannerPage />;
    if (activeRoute === '/simulations') return <SimulationsLibraryPage />;
    if (activeRoute.startsWith('/simulations/')) {
      const sub = activeRoute.replace('/simulations/', '');
      return <SimulationRunnerPage subRoute={sub} />;
    }
    if (activeRoute === '/progress') return <ProgressPage />;
    if (activeRoute === '/retraining') return <RetrainingPage />;
    if (activeRoute === '/certificates') return <CertificatesPage />;
    if (activeRoute.startsWith('/verify')) {
      const certId = activeRoute.includes('/verify/') ? activeRoute.split('/verify/')[1] : 'SFX-2026-98421';
      return <VerifyPage certId={certId} />;
    }
    if (activeRoute === '/admin') return <AdminDashboard />;
    if (activeRoute === '/admin/workforce') return <AdminWorkforcePage />;
    if (activeRoute === '/admin/analytics') return <AdminAnalyticsPage />;
    if (activeRoute === '/admin/certifications') return <AdminCertificationsPage />;
    if (activeRoute === '/admin/reports') return <AdminReportsPage />;

    return <LandingPage />;
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <PresentationBar />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 pt-6">
        {renderCurrentView()}
      </main>

      <SafetyAIGuide />
      <MobileNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
