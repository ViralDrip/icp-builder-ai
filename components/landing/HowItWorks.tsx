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

  return (
    <section id="how-it-works" className="py-32 lg:py-40 bg-slate-900/50 relative overflow-hidden" ref={containerRef}>
      {/* Subtle background gradients */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">
              Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {COPY.howItWorks.title}
          </h2>
        </div>

        {/* Timeline Stepper */}
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Vertical with slide-in animations */}
          <div className="lg:hidden space-y-8">
            {COPY.howItWorks.steps.map((step, idx) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div
                  key={idx}
                  className={`
                    relative pl-20
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
                  `}
                  style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
                >
                  {/* Step Circle */}
                  <div className="absolute left-0 top-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center shadow-xl">
                      <Icon size={20} strokeWidth={2} className="text-indigo-400 mb-1" />
                      <span className="text-xs font-bold text-slate-400">0{step.number}</span>
                    </div>
                  </div>

                  {/* Connecting Line */}
                  {idx !== COPY.howItWorks.steps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-20 bg-gradient-to-b from-slate-700 to-transparent" />
                  )}

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop: Horizontal timeline */}
          <div className="hidden lg:block relative">
            {/* Connecting Line */}
            <div className="absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

            {/* Steps */}
            <div className="flex justify-between items-start relative">
              {COPY.howItWorks.steps.map((step, idx) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <div
                    key={idx}
                    className={`
                      flex-1 flex flex-col items-center text-center px-4
                      transition-all duration-700 ease-out group
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                    `}
                    style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
                  >
                    {/* Step Circle with Icon */}
                    <div className="relative mb-10">
                      <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center shadow-xl relative z-10 group-hover:border-indigo-500/40 transition-all duration-500 group-hover:scale-105">
                        <Icon size={32} strokeWidth={2} className="text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors" />
                        <span className="text-sm font-bold text-slate-400 group-hover:text-slate-300 transition-colors">Step {step.number}</span>
                      </div>
                      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-full blur-2xl transition-all duration-500 -z-10" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed max-w-xs group-hover:text-slate-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
