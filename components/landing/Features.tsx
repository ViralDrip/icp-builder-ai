import React, { useRef } from 'react';
import { Clock, Target, Heart } from 'lucide-react';
import { GradientCard } from '../ui/GradientCard';
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

  const gradients: Array<'purple' | 'blue' | 'pink'> = ['purple', 'blue', 'pink'];

  return (
    <section id="features" className="py-20 lg:py-32 bg-slate-950 relative overflow-hidden" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold text-indigo-400 tracking-wide uppercase mb-3">
            {COPY.features.title}
          </h2>
          <p className="text-3xl md:text-4xl font-bold text-white">
            {COPY.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.features.items.map((feature, idx) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={idx}
                className={`
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 150) : '0ms' }}
              >
                <GradientCard gradient={gradients[idx]} className="h-full group">
                  <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </GradientCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
