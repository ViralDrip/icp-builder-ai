import React, { useRef } from 'react';
import { MessageSquare, Brain, Download, ArrowRight } from 'lucide-react';
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center max-w-6xl mx-auto">
          {COPY.howItWorks.steps.map((step, idx) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            const isLastStep = idx === COPY.howItWorks.steps.length - 1;

            return (
              <React.Fragment key={idx}>
                {/* Step Card */}
                <div
                  className={`
                    group relative
                    transition-all duration-700 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                  `}
                  style={{ transitionDelay: isVisible ? staggerDelay(idx, 200) : '0ms' }}
                >
                  {/* Card */}
                  <div className="relative p-8 lg:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-8">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
                        <span className="text-lg font-bold text-white">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 mt-4">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/20 rounded-2xl blur-xl transition-all duration-500" />
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-all duration-500 group-hover:scale-110">
                          <Icon size={28} strokeWidth={2} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Arrow between cards (desktop only) */}
                {!isLastStep && (
                  <div
                    className={`
                      hidden lg:flex items-center justify-center
                      transition-all duration-700 ease-out
                      ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}
                    style={{ transitionDelay: isVisible ? staggerDelay(idx, 300) : '0ms' }}
                  >
                    <ArrowRight className="text-slate-600 w-8 h-8" strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};
