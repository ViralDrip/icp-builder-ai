import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 rounded-full inline-flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-slate-700 text-slate-200 hover:border-indigo-500 hover:text-white hover:bg-indigo-500/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};
