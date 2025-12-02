import React from 'react';
import { Sparkles } from 'lucide-react';
import { COPY } from '../../constants/copy';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900">
      {/* Top Section - TikTok CTA */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {COPY.footer.ctaTitle}
          </h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            {COPY.footer.ctaDescription}
          </p>
          <a
            href={COPY.founder.tiktokUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black hover:bg-slate-950 text-white rounded-full font-bold border-2 border-slate-800 hover:border-pink-500/50 transition-all shadow-xl hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-pink-500">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            Follow {COPY.founder.tiktokHandle}
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
              <Sparkles size={18} />
            </div>
            <span className="text-slate-300 font-semibold">ICP Builder AI</span>
          </div>

          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} {COPY.footer.copyright}
          </p>

          <div className="flex gap-4 text-slate-500">
            <a
              href={COPY.founder.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition-colors"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
