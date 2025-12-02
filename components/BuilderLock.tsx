import React from 'react';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';

interface BuilderLockProps {
  onUnlock: () => void;
}

export const BuilderLock: React.FC<BuilderLockProps> = ({ onUnlock }) => {
  return (
    <div className="absolute inset-0 z-20 backdrop-blur-md bg-slate-950/90 flex items-center justify-center p-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-md">
        {/* Animated Lock Icon */}
        <div className="relative inline-block mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse" />

          {/* Lock container */}
          <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-slate-700 shadow-2xl flex items-center justify-center group hover:scale-110 transition-all duration-300">
            <Lock className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={40} strokeWidth={2.5} />

            {/* Sparkles */}
            <div className="absolute -top-2 -right-2 animate-bounce">
              <Sparkles className="text-yellow-400" size={20} />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          One Quick Step to Get Started
        </h3>

        <p className="text-slate-400 mb-8 leading-relaxed">
          To keep this 100% free and private, you'll use your own Google AI API key.
          Takes 30 seconds, free forever.
        </p>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 mb-8 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>100% Private</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>Always Free</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span>No Signup</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onUnlock}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-lg font-bold rounded-xl shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
        >
          <Lock size={20} className="group-hover:rotate-12 transition-transform" />
          <span>Unlock Free Access</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Fine print */}
        <p className="text-xs text-slate-600 mt-6">
          🔒 Your API key stays in your browser. We never see it.
        </p>
      </div>
    </div>
  );
};
