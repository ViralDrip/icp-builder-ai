import React from 'react';

interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: 'purple' | 'blue' | 'pink' | 'green';
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = 'purple'
}) => {
  const gradientClasses = {
    purple: 'from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20',
    blue: 'from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20',
    pink: 'from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20',
    green: 'from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20'
  };

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-2xl' : '';

  return (
    <div
      className={`
        relative p-8 rounded-2xl border border-slate-800/50
        bg-gradient-to-br ${gradientClasses[gradient]}
        transition-all duration-300 ease-out
        ${hoverClasses}
        backdrop-blur-sm
        shadow-lg
        ${className}
      `}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
