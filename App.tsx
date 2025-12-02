import React, { useState, useEffect } from 'react';
import { TabView } from './types';
import { ChatInterface } from './components/ChatInterface';
import { ICPPreview } from './components/ICPPreview';
import { ApiKeySetup } from './components/ApiKeySetup';
import { BuilderLock } from './components/BuilderLock';
import { Settings, SettingsButton } from './components/Settings';
import { MessageSquare, LayoutDashboard } from 'lucide-react';

// Import custom hooks
import { useICP } from './hooks/useICP';
import { useChat } from './hooks/useChat';
import { useApiKey } from './hooks/useApiKey';

// Import landing page components
import { Navbar } from './components/landing/Navbar';
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { Founder } from './components/landing/Founder';
import { FAQ } from './components/landing/FAQ';
import { Footer } from './components/landing/Footer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabView>(TabView.CHAT);
  const [showSettings, setShowSettings] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  // Use custom hooks for state management
  const { apiKey, hasApiKey, isLoading: isLoadingKey, saveApiKey, deleteApiKey } = useApiKey();
  const { icpData, updateICP, resetICP, isComplete } = useICP();
  const { messages, isLoading, sendMessage, resetChat } = useChat(apiKey, updateICP);

  // Smooth scroll to builder
  const scrollToBuilder = () => {
    const element = document.getElementById('builder-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keep page at top on initial load
  useEffect(() => {
    const keepAtTop = () => {
      window.scrollTo(0, 0);
    };

    // Call immediately
    keepAtTop();

    // Keep calling for first 500ms to override any layout shifts
    const intervals = [50, 100, 200, 500].map(delay =>
      setTimeout(keepAtTop, delay)
    );

    return () => intervals.forEach(clearTimeout);
  }, []);

  // Handle unlock button click
  const handleUnlock = () => {
    setShowApiKeyModal(true);
  };

  // Handle API key setup completion
  const handleApiKeyComplete = (key: string) => {
    saveApiKey(key);
    setShowApiKeyModal(false);
  };

  // Handle reset - clears ICP data and chat messages
  const handleReset = () => {
    resetICP();
    resetChat();
  };

  // Show loading while checking for API key
  if (isLoadingKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-inter selection:bg-indigo-500/30">
      {/* API Key Setup Modal - only show when unlock button is clicked */}
      {showApiKeyModal && (
        <ApiKeySetup
          onComplete={handleApiKeyComplete}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && hasApiKey && apiKey && (
        <Settings
          currentApiKey={apiKey}
          onUpdateKey={saveApiKey}
          onDeleteKey={deleteApiKey}
          onReset={handleReset}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Settings Button */}
      {hasApiKey && <SettingsButton onClick={() => setShowSettings(true)} />}

      <Navbar onStart={scrollToBuilder} />

      <main>
        <Hero onStart={scrollToBuilder} />
        <Features />
        <HowItWorks />

        {/* BUILDER SECTION */}
        <section id="builder-section" className="py-20 lg:py-32 bg-slate-950 relative border-t border-slate-900">
          {/* Decorative blob behind builder */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-[800px] bg-indigo-900/10 blur-[100px] -z-10 rounded-full"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Build Your Profile</h2>
              <p className="text-slate-400">Chat with AI. Watch your profile build in real-time.</p>
            </div>

            {/* APP CONTAINER */}
            <div className="relative h-[calc(100vh-12rem)] min-h-[600px] md:h-[800px] flex flex-col md:flex-row bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl ring-1 ring-white/5">

              {/* Lock Overlay - Show when no API key */}
              {!hasApiKey && <BuilderLock onUnlock={handleUnlock} />}

              {/* Mobile Tab Switcher */}
              <div className="md:hidden flex border-b border-slate-800 bg-slate-900 safe-area-top">
                <button
                  onClick={() => setActiveTab(TabView.CHAT)}
                  className={`
                    flex-1 py-5 text-sm font-medium flex items-center justify-center gap-2
                    transition-all active:scale-95 touch-manipulation
                    ${activeTab === TabView.CHAT
                      ? 'text-indigo-400 border-b-2 border-indigo-400 bg-slate-800/50'
                      : 'text-slate-500 hover:text-slate-400'
                    }
                  `}
                >
                  <MessageSquare size={18} />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab(TabView.ICP)}
                  className={`
                    flex-1 py-5 text-sm font-medium flex items-center justify-center gap-2
                    transition-all active:scale-95 touch-manipulation
                    ${activeTab === TabView.ICP
                      ? 'text-indigo-400 border-b-2 border-indigo-400 bg-slate-800/50'
                      : 'text-slate-500 hover:text-slate-400'
                    }
                  `}
                >
                  <LayoutDashboard size={18} />
                  <span>Profile</span>
                </button>
              </div>

              {/* Left Panel: Chat */}
              <div className={`
                flex-1 flex flex-col relative
                ${activeTab === TabView.CHAT ? 'block' : 'hidden md:block'}
                md:border-r border-slate-800
              `}>
                <ChatInterface
                  messages={messages}
                  onSendMessage={sendMessage}
                  isLoading={isLoading}
                  isComplete={isComplete()}
                  onReset={() => { resetICP(); resetChat(); }}
                  icpData={icpData}
                />
              </div>

              {/* Right Panel: ICP Display */}
              <div className={`
                flex-1 md:max-w-md lg:max-w-lg bg-slate-950 relative
                ${activeTab === TabView.ICP ? 'block' : 'hidden md:block'}
              `}>
                <ICPPreview data={icpData} />
              </div>

            </div>
          </div>
        </section>

        <Founder />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
};

export default App;
