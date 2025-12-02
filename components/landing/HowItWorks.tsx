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

        {/* Steps with better connectors */}
        <div className="relative">
          {/* Horizontal connecting line for desktop */}
          <div className="hidden lg:block absolute top-[72px] left-0 right-0 px-[15%]">
            <div className="w-full h-[2px] bg-gradient-to-r from-slate-700/30 via-slate-600/50 to-slate-700/30" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
            {COPY.howItWorks.steps.map((step, idx) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];

              return (
                <div
                  key={idx}
                  className={`
                    relative flex flex-col items-center text-center
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                  `}
                  style={{ transitionDelay: isVisible ? staggerDelay(idx, 250) : '0ms' }}
                >
                  {/* Step Number Badge */}
                  <div className="relative mb-8 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/30 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-indigo-500/10 transition-all duration-300 hover:scale-110 hover:shadow-indigo-500/20">
                      <span className="text-2xl font-bold bg-gradient-to-br from-indigo-300 to-purple-300 bg-clip-text text-transparent">{step.number}</span>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="mb-10 group">
                    <div className="relative">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-3xl blur-xl transition-all duration-500" />
                      <div className="relative w-24 h-24 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/40 group-hover:bg-slate-800 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 shadow-lg">
                        <Icon size={40} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="max-w-xs">
                    <h3 className="text-2xl font-bold text-white mb-5 group-hover:text-indigo-300 transition-colors duration-300">
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
      </div>
    </section>
  );
};
