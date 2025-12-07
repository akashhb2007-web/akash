import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IdeaGenerator from './components/IdeaGenerator';
import MediaStore from './components/MediaStore';
import TrendAnalysis from './components/TrendAnalysis';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import { NavSection } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'login' | 'onboarding' | 'app'>('login');
  const [currentSection, setCurrentSection] = useState<NavSection>(NavSection.Dashboard);

  const handleLoginSuccess = () => {
    setView('onboarding');
  };

  const handleOnboardingComplete = () => {
    setView('app');
  };

  const renderContent = () => {
    switch (currentSection) {
      case NavSection.Dashboard:
        return <Dashboard />;
      case NavSection.Generator:
        return <IdeaGenerator />;
      case NavSection.MediaStudio:
        return <MediaStore />;
      case NavSection.Trends:
        return <TrendAnalysis />;
      case NavSection.Settings:
        return (
            <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-300 mb-2">Settings</h3>
                    <p>Configure account connections and API preferences here.</p>
                </div>
            </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (view === 'login') {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-dark text-white selection:bg-primary/30">
      <Sidebar currentSection={currentSection} onNavigate={setCurrentSection} />
      
      <main className="flex-1 overflow-y-auto relative">
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto h-full">
            {renderContent()}
        </div>
      </main>
      
      {/* Abstract Background Gradient Blob */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
    </div>
  );
};

export default App;