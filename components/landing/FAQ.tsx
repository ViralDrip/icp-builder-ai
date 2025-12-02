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
    <section id="faq" className="py-32 lg:py-40 bg-slate-950 relative overflow-hidden" ref={containerRef}>
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-indigo-400 tracking-wider uppercase">
              FAQ
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
                  ${isOpen ? 'border-indigo-500/50 shadow-xl shadow-indigo-500/10 scale-[1.02]' : 'border-slate-800 hover:border-slate-700 hover:shadow-lg'}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                `}
                style={{ transitionDelay: isVisible ? staggerDelay(idx, 150) : '0ms' }}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="flex items-center justify-between w-full p-6 lg:p-8 text-left"
                >
                  <span className="text-lg lg:text-xl font-semibold text-white pr-8">
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
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 text-slate-400 text-base lg:text-lg leading-relaxed">
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
