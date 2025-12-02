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
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden bg-slate-950"
    >
      {/* Animated Background Layer 1: Gradient Mesh - EXTREMELY VISIBLE */}
      <div className="absolute inset-0 -z-20">
        {/* Large gradient orbs with STRONG colors and LESS blur */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/80 via-purple-500/60 to-transparent rounded-full blur-[60px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-bl from-pink-500/70 via-purple-500/55 to-transparent rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-t from-cyan-500/65 via-indigo-500/50 to-transparent rounded-full blur-[55px] animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }} />

        {/* Additional prominent orbs for more depth */}
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-r from-violet-500/60 to-transparent rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1.5s', animationDuration: '5s' }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-fuchsia-500/65 to-transparent rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }} />
      </div>

      {/* Animated Background Layer 2: Enhanced Dot Grid */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              radial-gradient(circle, rgba(99, 102, 241, 0.5) 2px, transparent 2px),
              radial-gradient(circle, rgba(168, 85, 247, 0.4) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '50px 50px, 25px 25px',
            backgroundPosition: '0 0, 25px 25px'
          }}
        />
      </div>

      {/* EXTREMELY VISIBLE Spotlight effect following mouse */}
      <div
        className="absolute -z-10 pointer-events-none transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(168, 85, 247, 0.4) 40%, transparent 70%)',
          filter: 'blur(40px)'
        }}
      />

      {/* VERY VISIBLE Floating particles with less blur */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-indigo-400/80 rounded-full blur-sm animate-float shadow-2xl shadow-indigo-500/70" />
        <div className="absolute top-1/3 right-1/3 w-10 h-10 bg-purple-400/90 rounded-full blur-sm animate-float shadow-2xl shadow-purple-500/70" style={{ animationDelay: '1s', animationDuration: '6s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-14 h-14 bg-pink-400/70 rounded-full blur-sm animate-float shadow-2xl shadow-pink-500/70" style={{ animationDelay: '2s', animationDuration: '7s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-11 h-11 bg-cyan-400/80 rounded-full blur-sm animate-float shadow-2xl shadow-cyan-500/70" style={{ animationDelay: '3s', animationDuration: '8s' }} />
        <div className="absolute top-1/2 left-1/2 w-9 h-9 bg-fuchsia-400/90 rounded-full blur-sm animate-float shadow-2xl shadow-fuchsia-500/70" style={{ animationDelay: '4s', animationDuration: '9s' }} />
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
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-200 text-sm font-semibold mb-8 backdrop-blur-xl shadow-2xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 group">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-indigo-400 to-purple-400" />
          </span>
          <span className="bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent">
            {COPY.hero.badge}
          </span>
          <Sparkles size={14} className="text-indigo-300 group-hover:rotate-12 transition-transform" />
        </div>

        {/* Epic Headline with Multi-layer Gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1] relative">
          <span className="relative inline-block">
            <span className="absolute inset-0 blur-2xl opacity-50 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {COPY.hero.headline}
            </span>
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-gradient bg-[length:200%_auto]">
              {COPY.hero.headline}
            </span>
          </span>
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
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
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
            className="border-slate-700 hover:border-indigo-500/50 bg-slate-900/50 hover:bg-slate-800/50 backdrop-blur-xl hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-xl"
          >
            {COPY.hero.ctaSecondary}
          </Button>
        </div>

        {/* Social Proof with Glassmorphism Cards */}
        <div className="pt-10">
          <p className="text-slate-400 text-sm mb-6 uppercase tracking-wider font-semibold">Trusted by builders worldwide</p>
          <div className="flex items-center justify-center gap-4 flex-wrap max-w-3xl mx-auto">
            {socialProofItems.map((item, idx) => (
              <div
                key={idx}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/40 backdrop-blur-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-indigo-500/20 cursor-default"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} opacity-90 group-hover:opacity-100 transition-opacity shadow-lg`}>
                  <span className="text-white">{item.icon}</span>
                </div>
                <span className="text-slate-200 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
