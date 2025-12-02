import { useCallback } from 'react';
import { ICPData } from '../types';
import { INITIAL_ICP } from '../constants';
import { useLocalStorage } from './useLocalStorage';
import {
  isICPComplete,
  getICPCompletionPercentage,
  hasAnyICPData
} from '../utils/icpHelpers';

const STORAGE_KEY = 'icp-builder-data';

/**
 * Custom hook for managing ICP data with localStorage persistence
 */
export function useICP() {
  const [icpData, setIcpData] = useLocalStorage<ICPData>(STORAGE_KEY, INITIAL_ICP);

  // Update specific fields of ICP
  const updateICP = useCallback((updatedFields: Partial<ICPData>) => {
    setIcpData(prev => ({
      ...prev,
      ...updatedFields
    }));
  }, [setIcpData]);

  // Reset ICP to initial state
  const resetICP = useCallback(() => {
    setIcpData(INITIAL_ICP);
  }, [setIcpData]);

  // Calculate completion percentage
  const getCompletionPercentage = useCallback((): number => {
    return getICPCompletionPercentage(icpData);
  }, [icpData]);

  // Check if ICP has any data
  const hasData = useCallback((): boolean => {
    return hasAnyICPData(icpData);
  }, [icpData]);

  // Check if ICP is 100% complete
  const isComplete = useCallback((): boolean => {
    return isICPComplete(icpData);
  }, [icpData]);

  return {
    icpData,
    updateICP,
    resetICP,
    getCompletionPercentage,
    hasData,
    isComplete
  };
}
