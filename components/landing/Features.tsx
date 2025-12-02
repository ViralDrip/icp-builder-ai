import React, { useRef } from 'react';
import { Clock, Target, Heart } from 'lucide-react';
import { COPY } from '../../constants/copy';
import { useScrollAnimation, staggerDelay } from '../../utils/animations';

export const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(containerRef);

  const iconMap = {
    clock: Clock,
    target: Target,
    heart: Heart
  };

  return (
    <section id="features" className="py-32 lg:py-40 bg-slate-950 relative overflow-hidden" ref={containerRef}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">
              {COPY.features.title}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {COPY.features.subtitle}
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {COPY.features.items.map((feature, idx) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className={`
                  group relative
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 150) : '0ms' }}
              >
                <div className="h-full p-8 lg:p-10 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300">
                  {/* Icon */}
                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-all duration-300">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    {feature.description}
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
