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
    <section id="how-it-works" className="py-32 lg:py-40 bg-slate-900/50 relative" ref={containerRef}>
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
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

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {COPY.howItWorks.steps.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const isLastStep = idx === COPY.howItWorks.steps.length - 1;

            return (
              <div
                key={idx}
                className={`
                  relative flex flex-col items-center text-center
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
              >
                {/* Connecting arrow for desktop */}
                {!isLastStep && (
                  <div className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-slate-700/50 to-transparent" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-700 rounded-full" />
                  </div>
                )}

                {/* Step Number */}
                <div className="mb-8">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center">
                    <span className="text-xl font-bold text-indigo-400">{step.number}</span>
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-8 group">
                  <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-300">
                    <Icon size={36} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="max-w-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
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
