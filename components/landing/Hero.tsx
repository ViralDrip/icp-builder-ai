import React, { useRef } from 'react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { COPY } from '../../constants/copy';
import { useScrollAnimation } from '../../utils/animations';

interface HeroProps {
  onStart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart }) => {
  const heroRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(heroRef, 0.1);

  const socialProofItems = [
    { icon: <Sparkles size={16} />, text: 'Powered by Gemini 2.5' },
    { icon: <Check size={16} />, text: '100% Free' },
    { icon: <Check size={16} />, text: 'No Signup' }
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 -z-10">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[800px] h-[600px] bg-gradient-to-l from-pink-600/20 to-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(51, 65, 85) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(51, 65, 85) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div
        className={`
          max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        `}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-lg hover:shadow-indigo-500/20 transition-shadow">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
          </span>
          {COPY.hero.badge}
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient">
            {COPY.hero.headline}
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed">
          {COPY.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button onClick={onStart} size="lg">
            {COPY.hero.cta}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {COPY.hero.ctaSecondary}
          </Button>
        </div>

        {/* Social Proof */}
        <div className="pt-8 border-t border-slate-800/50">
          <p className="text-slate-500 text-sm mb-4">Built in public on TikTok</p>
          <div className="flex items-center justify-center gap-6 text-slate-400 text-sm flex-wrap">
            {socialProofItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
              >
                <span className="text-indigo-400">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
