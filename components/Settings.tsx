import React, { useState } from 'react';
import { Settings as SettingsIcon, X, Key, Trash2, Save, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface SettingsProps {
  currentApiKey: string;
  onUpdateKey: (newKey: string) => void;
  onDeleteKey: () => void;
  onReset: () => void;
  onClose: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  currentApiKey,
  onUpdateKey,
  onDeleteKey,
  onReset,
  onClose
}) => {
  const [apiKey, setApiKey] = useState(currentApiKey);
  const [showKey, setShowKey] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    if (apiKey.trim() && apiKey !== currentApiKey) {
      onUpdateKey(apiKey.trim());
    }
  };

  const handleDelete = () => {
    onDeleteKey();
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  const maskedKey = currentApiKey ? `${currentApiKey.substring(0, 8)}...${currentApiKey.substring(currentApiKey.length - 4)}` : '';

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <SettingsIcon className="text-indigo-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-xs text-slate-500">Manage your API key</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Current Key */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
              <Key size={16} className="text-indigo-400" />
              Your API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg pl-4 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-sm"
                placeholder="AIzaSy..."
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="text-slate-500 hover:text-slate-300 transition-colors p-2 hover:bg-slate-800 rounded-lg"
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              🔒 Stored locally in your browser only
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!apiKey.trim() || apiKey === currentApiKey}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>

          {/* Delete Section */}
          <div className="pt-4 border-t border-slate-800">
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-semibold rounded-lg transition-all border border-red-500/20"
              >
                <Trash2 size={16} />
                Delete API Key
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm text-red-400 font-medium">
                    Are you sure? You'll need to enter a new key to use the tool again.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition-all"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Section */}
          <div className="pt-4 border-t border-slate-800">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 font-semibold rounded-lg transition-all border border-orange-500/20"
              >
                <RotateCcw size={16} />
                Reset Everything
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                  <p className="text-sm text-orange-400 font-medium">
                    This will clear your ICP data and chat history. Your API key will remain saved.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all"
                  >
                    Yes, Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Button Component
interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-4 left-4 z-40 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500 text-slate-400 hover:text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 touch-manipulation"
    aria-label="Open settings"
    title="Settings"
  >
    <SettingsIcon size={20} />
  </button>
);
