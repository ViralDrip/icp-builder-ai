import { ICPData } from '../types';

/**
 * Utility functions for ICP data processing and validation
 */

export type SectionKey = 'firmographics' | 'psychographics' | 'strategy' | 'technology';

/**
 * Check if firmographics section is complete (all 4 fields filled)
 */
export function hasFirmographicsComplete(data: ICPData): boolean {
  return !!(data.role && data.industry && data.companySize && data.geography);
}

/**
 * Check if psychographics section is complete (pain points and goals)
 */
export function hasPsychographicsComplete(data: ICPData): boolean {
  return data.painPoints.length > 0 && data.goals.length > 0;
}

/**
 * Check if strategy section is complete (triggers and objections)
 */
export function hasStrategyComplete(data: ICPData): boolean {
  return data.purchaseTriggers.length > 0 && data.objections.length > 0;
}

/**
 * Check if technology section is complete (tech stack)
 */
export function hasTechnologyComplete(data: ICPData): boolean {
  return data.techStack.length > 0;
}

/**
 * Check if entire ICP is 100% complete
 */
export function isICPComplete(data: ICPData): boolean {
  return (
    hasFirmographicsComplete(data) &&
    hasPsychographicsComplete(data) &&
    hasStrategyComplete(data) &&
    hasTechnologyComplete(data)
  );
}

/**
 * Calculate completion percentage for ICP
 */
export function getICPCompletionPercentage(data: ICPData): number {
  const fields = [
    data.role,
    data.industry,
    data.companySize,
    data.geography,
    data.painPoints.length > 0,
    data.goals.length > 0,
    data.purchaseTriggers.length > 0,
    data.objections.length > 0,
    data.techStack.length > 0
  ];

  const completed = fields.filter(Boolean).length;
  return Math.round((completed / fields.length) * 100);
}

/**
 * Determine which section is currently active (being worked on)
 */
export function getActiveSection(data: ICPData): SectionKey {
  if (!hasFirmographicsComplete(data)) return 'firmographics';
  if (!hasPsychographicsComplete(data)) return 'psychographics';
  if (!hasStrategyComplete(data)) return 'strategy';
  return 'technology';
}

/**
 * Check if ICP has any data at all
 */
export function hasAnyICPData(data: ICPData): boolean {
  return (
    data.role !== '' ||
    data.industry !== '' ||
    data.painPoints.length > 0 ||
    data.goals.length > 0
  );
}
