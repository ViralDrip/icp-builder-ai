import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { COPY } from '../../constants/copy';
import { useScrollAnimation, staggerDelay } from '../../utils/animations';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isVisible = useScrollAnimation(containerRef);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-32 bg-slate-950 border-t border-slate-900" ref={containerRef}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            {COPY.faq.title}
          </h2>
        </div>

        <div className="space-y-4">
          {COPY.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`
                  bg-slate-900 rounded-xl border transition-all duration-700 ease-out overflow-hidden
                  ${isOpen ? 'border-indigo-500/50 shadow-lg shadow-indigo-500/10' : 'border-slate-800 hover:border-slate-700'}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 100) : '0ms' }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-200 pr-8">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-indigo-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-6 pb-6 text-slate-400 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
