import { useState, useEffect } from 'react';

const API_KEY_STORAGE_KEY = 'gemini-api-key';

/**
 * Custom hook for managing the user's Gemini API key
 */
export function useApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load API key from localStorage on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    } catch (error) {
      console.error('Failed to load API key from storage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save API key to localStorage
  const saveApiKey = (key: string) => {
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
      setApiKey(key);
    } catch (error) {
      console.error('Failed to save API key to storage:', error);
      throw new Error('Failed to save API key');
    }
  };

  // Delete API key from localStorage
  const deleteApiKey = () => {
    try {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      setApiKey(null);
    } catch (error) {
      console.error('Failed to delete API key from storage:', error);
      throw new Error('Failed to delete API key');
    }
  };

  // Check if user has an API key
  const hasApiKey = apiKey !== null && apiKey.length > 0;

  return {
    apiKey,
    hasApiKey,
    isLoading,
    saveApiKey,
    deleteApiKey
  };
}
