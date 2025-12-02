import React, { useState, useEffect, useRef } from 'react';
import { ICPData } from '../types';
import { Briefcase, Activity, Zap, Layers, Download, Share2, Check, ChevronDown, Lock } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { downloadICP, shareICP } from '../utils/share';
import {
  SectionKey,
  hasFirmographicsComplete,
  hasPsychographicsComplete,
  hasStrategyComplete,
  hasTechnologyComplete,
  isICPComplete,
  getActiveSection,
  getICPCompletionPercentage
} from '../utils/icpHelpers';

interface ICPPreviewProps {
  data: ICPData;
}

const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isLocked?: boolean;
  isComplete?: boolean;
  isActive?: boolean;
  lockMessage?: string;
}> = ({
  title,
  icon,
  children,
  isOpen,
  onToggle,
  isLocked = false,
  isComplete = false,
  isActive = false,
  lockMessage = 'Keep chatting to unlock this section'
}) => {

  if (isLocked) {
    return (
      <div className="mb-4 bg-slate-900/30 rounded-xl shadow-sm border border-slate-800/40 overflow-hidden opacity-60">
        <div className="flex items-center justify-between gap-2 p-4 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">{icon}</span>
            <h3 className="text-sm">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Lock size={14} />
            <span className="hidden sm:inline">{lockMessage}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mb-4 rounded-xl shadow-sm border overflow-hidden transition-all duration-300 ${
      isComplete
        ? 'bg-emerald-900/10 border-emerald-800/60 ring-1 ring-emerald-500/20'
        : isActive
        ? 'bg-indigo-900/10 border-indigo-700/60 ring-1 ring-indigo-500/30'
        : 'bg-slate-900/50 border-slate-800/60 hover:border-slate-700'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-2 p-4 text-slate-200 font-semibold hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-2">
          <span className={`transition-colors ${
            isComplete ? 'text-emerald-400' : isActive ? 'text-indigo-400' : 'text-slate-500'
          }`} aria-hidden="true">
            {icon}
          </span>
          <h3 className="text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full animate-fade-in">
              <Check size={12} className="text-white" strokeWidth={3} />
            </span>
          )}
          {isActive && !isComplete && (
            <span className="flex items-center justify-center w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          )}
          <ChevronDown
            size={16}
            className={`text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </button>
      {isOpen && (
        <div
          id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="p-4 text-slate-400 text-sm leading-relaxed animate-fade-in"
          role="region"
          aria-label={`${title} section`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const TagList: React.FC<{ items: string[], emptyText: string, colorClass: string }> = ({ items, emptyText, colorClass }) => {
  if (!items || items.length === 0) {
    return <span className="text-slate-600 italic text-xs">{emptyText}</span>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, idx) => (
        <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${colorClass} shadow-sm animate-slide-in-left animate-stagger-${Math.min(idx + 1, 10)}`}>
          {item}
        </span>
      ))}
    </div>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-3">
    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5">{label}</span>
    <div className={`text-sm ${value ? 'text-slate-200 font-medium' : 'text-slate-600 italic'}`}>
      {value || 'Not defined...'}
    </div>
  </div>
);

export const ICPPreview: React.FC<ICPPreviewProps> = ({ data }) => {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');
  const [openSection, setOpenSection] = useState<SectionKey | null>('firmographics');
  const prevCompletionRef = useRef(0);
  const isInitialMount = useRef(true);

  // Check if sections are FULLY complete (ALL fields filled)
  const hasFirmographics = hasFirmographicsComplete(data);
  const hasPsychographics = hasPsychographicsComplete(data);
  const hasStrategy = hasStrategyComplete(data);
  const hasTechnology = hasTechnologyComplete(data);

  // Check if ICP is 100% complete
  const isComplete = isICPComplete(data);

  // Smart auto-open: only when progressing forward, not on resets
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const currentCompletion = getICPCompletionPercentage(data);
    const prevCompletion = prevCompletionRef.current;

    // Only auto-open if completion is increasing (progressing forward)
    // Don't auto-open if completion decreased (reset) or stayed the same
    if (currentCompletion > prevCompletion) {
      const activeSection = getActiveSection(data);
      setOpenSection(activeSection);
    }

    // Update the ref for next comparison
    prevCompletionRef.current = currentCompletion;
  }, [data]);

  // Handle manual toggle - only one section open at a time
  const handleToggle = (section: SectionKey) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleDownload = () => {
    downloadICP(data);
  };

  const handleShare = async () => {
    const result = await shareICP(data);
    if (result.success) {
      setShareStatus(result.method === 'share' ? 'shared' : 'copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 overflow-hidden">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">ICP Dashboard</h2>
            <p className="text-xs text-slate-500 mt-1">Live Profile Preview</p>
          </div>
          {isComplete && (
            <div className="flex gap-2 animate-fade-in">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors border border-slate-700 active:scale-95"
                title="Share ICP"
              >
                 {shareStatus === 'idle' ? (
                   <>
                     <Share2 size={14} />
                     <span className="hidden sm:inline">Share</span>
                   </>
                 ) : (
                   <>
                     <Check size={14} className="text-emerald-400" />
                     <span className="hidden sm:inline text-emerald-400">
                       {shareStatus === 'copied' ? 'Copied!' : 'Shared!'}
                     </span>
                   </>
                 )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors active:scale-95"
                title="Download as Markdown"
              >
                 <Download size={14} />
                 <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          )}
        </div>
        <ProgressBar percentage={getICPCompletionPercentage(data)} />
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-8 scrollbar-thin scrollbar-thumb-slate-700">
        <Section
          title="Firmographics"
          icon={<Briefcase size={18} />}
          isOpen={openSection === 'firmographics'}
          onToggle={() => handleToggle('firmographics')}
          isComplete={hasFirmographics}
          isActive={!hasFirmographics}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Role / Persona" value={data.role} />
            <Field label="Industry" value={data.industry} />
            <Field label="Company Size" value={data.companySize} />
            <Field label="Geography" value={data.geography} />
          </div>
        </Section>

        <Section
          title="Psychographics"
          icon={<Activity size={18} />}
          isOpen={openSection === 'psychographics'}
          onToggle={() => handleToggle('psychographics')}
          isLocked={!hasFirmographics}
          isComplete={hasPsychographics}
          isActive={hasFirmographics && !hasPsychographics}
          lockMessage="Complete Firmographics first"
        >
           <div className="mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Pain Points</span>
              <ul className="space-y-1.5">
                {data.painPoints && data.painPoints.length > 0 ? (
                  data.painPoints.map((p, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-800/50 animate-slide-in-left animate-stagger-${Math.min(i + 1, 10)}`}>
                      <span className="text-red-400 mt-0.5">•</span> {p}
                    </li>
                  ))
                ) : <span className="text-slate-600 italic text-xs">Discuss challenges...</span>}
              </ul>
           </div>
           <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Goals</span>
               <ul className="space-y-1.5">
                {data.goals && data.goals.length > 0 ? (
                  data.goals.map((g, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs text-slate-300 bg-slate-800/50 p-2 rounded border border-slate-800/50 animate-slide-in-left animate-stagger-${Math.min(i + 1, 10)}`}>
                      <span className="text-emerald-400 mt-0.5">•</span> {g}
                    </li>
                  ))
                ) : <span className="text-slate-600 italic text-xs">Discuss objectives...</span>}
              </ul>
           </div>
        </Section>

        <Section
          title="Strategy"
          icon={<Zap size={18} />}
          isOpen={openSection === 'strategy'}
          onToggle={() => handleToggle('strategy')}
          isLocked={!hasPsychographics}
          isComplete={hasStrategy}
          isActive={hasPsychographics && !hasStrategy}
          lockMessage="Complete Psychographics first"
        >
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Purchase Triggers</span>
              <TagList
                items={data.purchaseTriggers}
                emptyText="What makes them buy?"
                colorClass="bg-indigo-900/30 text-indigo-300 border-indigo-800"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Common Objections</span>
              <TagList
                items={data.objections}
                emptyText="Why do they say no?"
                colorClass="bg-orange-900/20 text-orange-300 border-orange-900/50"
              />
            </div>
          </div>
        </Section>

        <Section
          title="Technology"
          icon={<Layers size={18} />}
          isOpen={openSection === 'technology'}
          onToggle={() => handleToggle('technology')}
          isLocked={!hasStrategy}
          isComplete={hasTechnology}
          isActive={hasStrategy && !hasTechnology}
          lockMessage="Complete Strategy first"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Tech Stack</span>
          <TagList 
            items={data.techStack} 
            emptyText="What tools do they use?" 
            colorClass="bg-slate-800 text-slate-300 border-slate-700" 
          />
        </Section>
        
        <div className="mt-8 text-center">
            <p className="text-slate-600 text-xs">Generated by AI • {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};