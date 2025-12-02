import React, { useRef } from 'react';
import { User } from 'lucide-react';
import { Button } from '../ui/Button';
import { COPY } from '../../constants/copy';
import { useScrollAnimation } from '../../utils/animations';

export const Founder: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section
      ref={sectionRef}
      className={`
        py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900
        border-t border-slate-800 relative overflow-hidden
        transition-all duration-1000
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {/* Profile Image */}
        <div
          className={`
            inline-block p-1 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 mb-8 shadow-2xl
            transition-all duration-700 delay-200
            ${isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}
          `}
        >
          <div className="w-32 h-32 rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-4 border-slate-900">
            <User size={64} className="text-slate-600" />
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {COPY.founder.title}
        </h2>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {COPY.founder.description}
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-12">
          <a
            href={COPY.founder.tiktokUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white rounded-full font-bold hover:bg-slate-950 transition-all border-2 border-slate-800 hover:border-pink-500/50 shadow-2xl hover:scale-105 group text-lg"
          >
            <span className="text-pink-500 group-hover:text-pink-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </span>
            <span>{COPY.founder.cta}</span>
            <span className="opacity-60 text-base">{COPY.founder.tiktokHandle}</span>
          </a>
        </div>

        {/* Stats - Always horizontal */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto pt-8 border-t border-slate-800/50">
          {COPY.socialProof.stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs md:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
