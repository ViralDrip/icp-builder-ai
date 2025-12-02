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
          {/* Mobile: Stack vertically */}
          <div className="flex flex-col gap-8 lg:hidden">
            {COPY.howItWorks.steps.map((step, idx) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div
                  key={idx}
                  className={`
                    flex gap-6 items-start
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                  `}
                  style={{ transitionDelay: isVisible ? staggerDelay(idx, 150) : '0ms' }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-white">{step.number}</span>
                    </div>
                    {idx !== COPY.howItWorks.steps.length - 1 && (
                      <div className="w-0.5 h-20 bg-gradient-to-b from-slate-700 to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
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
                      transition-all duration-700 ease-out
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                    `}
                    style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
                  >
                    {/* Step Number - sits on the line */}
                    <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-8 relative z-10 border-4 border-slate-900">
                      <span className="text-3xl font-bold text-white">{step.number}</span>
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 hover:text-indigo-300 hover:border-indigo-500/40 transition-all duration-300 hover:scale-110">
                        <Icon size={28} strokeWidth={2} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed max-w-xs">
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
