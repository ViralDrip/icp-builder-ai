import React, { useRef } from 'react';
import { MessageSquare, Brain, Download } from 'lucide-react';
import { COPY } from '../../constants/copy';
import { useScrollAnimation, staggerDelay } from '../../utils/animations';

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(containerRef);

  const iconMap = {
    message: MessageSquare,
    brain: Brain,
    download: Download
  };

  const colors = [
    { bg: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30', icon: 'text-indigo-400' },
    { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', icon: 'text-purple-400' },
    { bg: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30', icon: 'text-emerald-400' }
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-slate-900 relative border-t border-slate-800" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-indigo-400 font-semibold tracking-wide uppercase text-sm mb-3">
            Process
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            {COPY.howItWorks.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
          </div>

          {COPY.howItWorks.steps.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const color = colors[idx];

            return (
              <div
                key={idx}
                className={`
                  relative z-10 flex flex-col items-center text-center pt-8
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
              >
                {/* Step number badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-950 border border-slate-700 rounded-full text-xs font-bold text-indigo-400 z-20">
                  {step.number}
                </div>

                {/* Icon container */}
                <div className={`w-28 h-28 rounded-2xl bg-gradient-to-br ${color.bg} border ${color.border} flex items-center justify-center mb-8 shadow-xl backdrop-blur-sm group hover:scale-110 transition-all duration-300 relative z-10`}>
                  <Icon className={`${color.icon} group-hover:scale-110 transition-transform`} size={48} />
                </div>

                <div className="px-2">
                  <h4 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h4>
                  <p className="text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
