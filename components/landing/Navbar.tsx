import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  onStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#faq', label: 'FAQ' }
  ];

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/50 shadow-lg'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all group-hover:scale-110">
              <Sparkles size={20} />
            </div>
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
              ICP Builder
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-slate-800/50 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={onStart} size="sm">
              Start Building
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 animate-slide-in-up">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-300 hover:text-white block px-4 py-3 rounded-lg hover:bg-slate-800/50 text-base font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onStart();
                setIsOpen(false);
              }}
              className="w-full text-left text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 rounded-lg text-base font-semibold hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/30"
            >
              Start Building
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
