import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, ExternalLink, CheckCircle, AlertCircle, X } from 'lucide-react';

interface ApiKeySetupProps {
  onComplete: (apiKey: string) => void;
  onSkip?: () => void;
  onClose?: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onComplete, onSkip, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!apiKey.trim()) {
      setError('Please enter your API key');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API key format. Google AI keys start with "AIza"');
      return;
    }

    // Trigger closing animation
    setIsClosing(true);
    setTimeout(() => {
      onComplete(apiKey.trim());
    }, 500); // Wait for animation to complete
  };

  const handleClose = () => {
    if (onClose) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className={`max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-out ${isClosing ? 'scale-90 opacity-0 -translate-y-8' : 'scale-100 opacity-100 translate-y-0'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b border-slate-800 p-6 relative">
          {onClose && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all active:scale-95"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          )}
          <div className="flex items-start gap-4 pr-10">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="text-indigo-400" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                One Quick Step to Get Started
              </h2>
              <p className="text-slate-400">
                To protect your privacy and keep this tool 100% free, you'll use your own Google AI API key
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Lock size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">100% Private</div>
                <div className="text-xs text-slate-400">Key stays in your browser</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <CheckCircle size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">Always Free</div>
                <div className="text-xs text-slate-400">Google gives 1,500 free requests/day</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Shield size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">No Signup</div>
                <div className="text-xs text-slate-400">No account needed here</div>
              </div>
            </div>
          </div>

          {/* How to Get Key */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Get Your Free API Key
            </h3>
            <div className="space-y-2 text-sm text-slate-300 ml-8">
              <p>Click the button below to open Google AI Studio (it's free!)</p>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 touch-manipulation"
              >
                <ExternalLink size={16} />
                Open Google AI Studio
              </a>
              <p className="text-xs text-slate-500 pt-2">
                💡 Click "Get API Key" → "Create API key" → Copy it
              </p>
            </div>
          </div>

          {/* Input */}
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Paste Your Key Here
            </h3>
            <form onSubmit={handleSubmit} className="ml-8 space-y-3">
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setError('');
                  }}
                  placeholder="AIzaSy..."
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 font-mono text-sm"
                  autoComplete="off"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                >
                  {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <div className="flex items-start gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 touch-manipulation"
              >
                Start Building My ICP
              </button>

              <p className="text-xs text-slate-500 text-center">
                🔒 Your key is stored locally in your browser and never sent to our servers
              </p>
            </form>
          </div>

          {/* Help Link */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              Need help?{' '}
              <a
                href="https://ai.google.dev/gemini-api/docs/api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 underline"
              >
                Read Google's API Key Guide
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
