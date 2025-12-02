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

        {/* Timeline Stepper - Horizontal on all screen sizes */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connecting Line - hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            {/* Steps - Horizontal on all screen sizes */}
            <div className="flex justify-between items-start relative gap-4">
              {COPY.howItWorks.steps.map((step, idx) => {
                const Icon = iconMap[step.icon as keyof typeof iconMap];
                return (
                  <div
                    key={idx}
                    className={`
                      flex-1 flex flex-col items-center text-center px-2 md:px-4
                      transition-all duration-700 ease-out group
                      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                    `}
                    style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
                  >
                    {/* Step Circle with Icon */}
                    <div className="relative mb-6 md:mb-10">
                      <div className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 flex flex-col items-center justify-center shadow-xl relative z-10 group-hover:border-indigo-500/40 transition-all duration-500 group-hover:scale-105">
                        {/* Icon */}
                        <Icon size={24} strokeWidth={2} className="md:w-8 md:h-8 text-indigo-400 mb-1 md:mb-2 group-hover:text-indigo-300 transition-colors" />
                        {/* Number */}
                        <span className="text-xs md:text-sm font-bold text-slate-400 group-hover:text-slate-300 transition-colors">Step {step.number}</span>
                      </div>
                      {/* Subtle glow on hover */}
                      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-full blur-2xl transition-all duration-500 -z-10" />
                    </div>

                    {/* Content */}
                    <h3 className="text-base md:text-2xl font-bold text-white mb-2 md:mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-xs group-hover:text-slate-300 transition-colors duration-300">
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
