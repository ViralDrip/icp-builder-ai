import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Check, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { COPY } from '../../constants/copy';
import { useScrollAnimation } from '../../utils/animations';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const heroRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(heroRef, 0.1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialProofItems = [
    { icon: <Sparkles size={16} />, text: 'Powered by Gemini 2.5', color: 'from-indigo-500 to-purple-500' },
    { icon: <Zap size={16} />, text: '100% Free Forever', color: 'from-emerald-500 to-teal-500' },
    { icon: <TrendingUp size={16} />, text: 'No Signup Required', color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden"
    >
      {/* Solid background at the very back */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Subtle gradient orbs - more understated */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/25 via-purple-500/15 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />
      </div>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>


      {/* Main Content */}
      <div
        className={`
          max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-semibold mb-8 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-500 group animate-fade-in">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-indigo-400 to-purple-400" />
          </span>
          <span className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            {COPY.hero.badge}
          </span>
          <Sparkles size={14} className="text-indigo-300 group-hover:rotate-12 transition-transform" />
        </div>

        {/* Headline with selective glow on key words */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] relative text-white">
          Know{' '}
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              exactly who
            </span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
              exactly who
            </span>
          </span>
          {' '}to sell to
        </h1>

        {/* Description with Subtle Glow */}
        <p className="mt-6 max-w-3xl mx-auto text-xl sm:text-2xl text-slate-300 mb-12 leading-relaxed font-light">
          {COPY.hero.description}
        </p>

        {/* CTA Buttons with Enhanced Effects */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mb-16">
          <Button
            onClick={onStart}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-500 hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-2 font-bold text-lg">
              {COPY.hero.cta}
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-slate-700 hover:border-indigo-500/50 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-xl hover:scale-105 transition-all duration-500 hover:-translate-y-1 font-semibold text-lg shadow-xl"
          >
            {COPY.hero.ctaSecondary}
          </Button>
        </div>

        {/* Social Proof - Minimal Style */}
        <div className="pt-10">
          <p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-semibold">Trusted by builders worldwide</p>
          <div className="flex items-center justify-center gap-4 flex-wrap max-w-3xl mx-auto">
            {socialProofItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/30 backdrop-blur-sm border border-slate-800 hover:border-slate-700 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg cursor-default"
              >
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {item.icon}
                </div>
                <span className="text-slate-300 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
