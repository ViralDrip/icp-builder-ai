import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  percentage: number;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, showLabel = true }) => {
  const isComplete = percentage === 100;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-400">
            ICP Completion
          </span>
          <span className={`text-xs font-bold ${isComplete ? 'text-emerald-400' : 'text-indigo-400'}`}>
            {percentage}%
          </span>
        </div>
      )}

      <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        {/* Progress fill */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}
          style={{ width: `${percentage}%` }}
        />

        {/* Shimmer effect */}
        {percentage > 0 && percentage < 100 && (
          <div
            className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
        )}

        {/* Completion checkmark */}
        {isComplete && (
          <div className="absolute right-1 top-1/2 -translate-y-1/2 bg-emerald-500 rounded-full p-0.5">
            <Check size={10} className="text-white" strokeWidth={3} />
          </div>
        )}
      </div>

      {isComplete && showLabel && (
        <p className="text-xs text-emerald-400 mt-2 text-center font-medium animate-fade-in">
          Profile Complete! Ready to export.
        </p>
      )}
    </div>
  );
};
