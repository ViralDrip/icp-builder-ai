import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ICPData } from '../types';
import { sendMessageToGemini, initializeChat } from '../services/geminiService';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'model',
  text: "Hi! I'm your AI strategist and I'm here to help you build a detailed Ideal Customer Profile. First, tell me about your product or service - what do you offer and who do you help?"
};

const CHAT_STORAGE_KEY = 'icp-builder-chat-messages';

/**
 * Custom hook for managing chat state and interactions
 */
export function useChat(
  apiKey: string | null,
  onICPUpdate: (updatedFields: Partial<ICPData>) => void
) {
  // Load messages from localStorage on mount
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(CHAT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [INITIAL_MESSAGE];
      }
    } catch (err) {
      console.error('Failed to load chat messages:', err);
    }
    return [INITIAL_MESSAGE];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('Failed to save chat messages:', err);
    }
  }, [messages]);

  // Initialize chat session when API key is available
  useEffect(() => {
    if (apiKey) {
      try {
        // Pass the conversation history to maintain context
        initializeChat(apiKey, messages);
      } catch (err) {
        console.error('Failed to initialize chat:', err);
        setError('Failed to initialize AI chat');
      }
    }
  }, [apiKey]); // Only reinitialize when API key changes, not on every message

  // Send a message to the AI
  const sendMessage = useCallback(async (text: string) => {
    if (!apiKey) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'No API key found. Please set up your API key first.'
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await sendMessageToGemini(text, onICPUpdate);

      // Add a natural typing delay to make it feel more conversational
      await new Promise(resolve => setTimeout(resolve, 400));

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      };
      setMessages(prev => [...prev, errorMsg]);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, onICPUpdate]);

  // Reset chat to initial state
  const resetChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear chat messages:', err);
    }
    if (apiKey) {
      initializeChat(apiKey, [INITIAL_MESSAGE]);
    }
  }, [apiKey]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat
  };
}
