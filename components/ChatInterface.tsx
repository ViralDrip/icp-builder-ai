import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ICPData } from '../types';
import { Send, User, Bot, Sparkles, CheckCircle2, Download, RotateCcw, Mail } from 'lucide-react';
import { downloadICP } from '../utils/share';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  isComplete: boolean;
  onReset: () => void;
  icpData: ICPData;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, isComplete, onReset, icpData }) => {
  const [inputText, setInputText] = useState('');
  const [email, setEmail] = useState('');
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    onSendMessage(inputText);
    setInputText('');
    // Keep input focused after sending - use multiple attempts to ensure it works
    requestAnimationFrame(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    });
  };

  // Also refocus when loading ends
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Handle email submission
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || emailSending) return;

    setEmailSending(true);

    try {
      // Convert ICP data to JSON for webhook
      const icpDataJson = JSON.stringify(icpData, null, 2);

      // TODO: Replace with your actual webhook URL
      const webhookUrl = 'YOUR_WEBHOOK_URL_HERE';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          icpData: icpData,
          timestamp: new Date().toISOString()
        })
      });

      setEmailSent(true);
      setTimeout(() => {
        setEmailSent(false);
        setEmail('');
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try downloading instead.');
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 relative">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Sparkles size={16} />
            </div>
            <div>
                <h1 className="font-bold text-slate-100">ICP Strategist</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">AI Powered</p>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 ring-1 ring-slate-700">
                <Bot className="text-indigo-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Ready to define your audience?</h3>
            <p className="text-slate-500 max-w-sm text-sm">Tell me about your product, and I'll help you pinpoint exactly who needs it.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-800 border border-slate-700 text-indigo-400'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              </div>
              
              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700 text-slate-300 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex w-full justify-start">
             <div className="flex gap-3 max-w-[75%]">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 flex-shrink-0 flex items-center justify-center mt-1 shadow-sm">
                   <Bot size={16} />
                </div>
                <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5" role="status" aria-label="AI is typing">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} aria-hidden="true"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} aria-hidden="true"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} aria-hidden="true"></div>
                   <span className="sr-only">AI is typing a response</span>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area / Completion UI */}
      {isComplete ? (
        <div className="px-6 md:px-10 py-6 bg-gradient-to-r from-emerald-900/20 to-green-900/20 border-t border-emerald-800/50 animate-slide-in-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="text-emerald-400 animate-pulse" size={24} />
            <h3 className="text-lg font-bold text-emerald-100">ICP Complete!</h3>
          </div>
          <p className="text-sm text-slate-300 text-center mb-6">
            Your Ideal Customer Profile is ready. Download it now or get it sent to your email.
          </p>

          {/* Email Form */}
          {!emailSent ? (
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all placeholder:text-slate-600"
                  disabled={emailSending}
                  required
                />
                <button
                  type="submit"
                  disabled={emailSending || !email.trim()}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50 active:scale-95 disabled:opacity-50 disabled:hover:bg-emerald-600 whitespace-nowrap"
                  aria-label="Send ICP to email"
                >
                  <Mail size={16} />
                  {emailSending ? 'Sending...' : 'Send PDF'}
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-4 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg text-center">
              <p className="text-emerald-300 text-sm font-medium">
                ✓ Email sent! Check your inbox.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center border-t border-emerald-800/30 pt-4">
            <button
              onClick={() => downloadICP(icpData)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-indigo-500/50 active:scale-95"
              aria-label="Download ICP as markdown file"
            >
              <Download size={16} />
              Download MD
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold rounded-lg transition-all border border-slate-700 active:scale-95"
              aria-label="Reset and start over"
            >
              <RotateCcw size={16} />
              Start Over
            </button>
          </div>
        </div>
      ) : (
        <div className="px-6 md:px-10 pt-5 pb-5 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleSubmit} className="relative flex items-center max-w-full mb-1">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your answer..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-base rounded-full pl-5 pr-14 py-4 md:py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600 shadow-inner touch-manipulation"
              disabled={isLoading}
              autoComplete="off"
              autoCapitalize="sentences"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="absolute right-2 p-3 md:p-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 active:scale-95 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 touch-manipulation"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};