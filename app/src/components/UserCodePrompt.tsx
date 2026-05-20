import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Check } from 'lucide-react';

interface UserCodePromptProps {
  onSubmit: (code: string) => void;
}

export function UserCodePrompt({ onSubmit }: UserCodePromptProps) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    const code = input.trim();
    if (code.length >= 2) {
      onSubmit(code);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 border border-gray-200"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mx-auto mb-4">
            <User className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Welcome!</h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your <strong>name</strong> to identify yourself in the Study Room.<br />
            Your partner will see this name. It cannot be changed once set.
          </p>
          <div className="space-y-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
              placeholder="Enter your name (e.g., Alice)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
              autoFocus
              maxLength={20}
            />
            <button
              onClick={handleSubmit}
              disabled={input.trim().length < 2}
              className="w-full bg-accent hover:bg-accent-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Check className="w-4 h-4" />
              Set My Name
            </button>
            <p className="text-[10px] text-gray-400 text-center">Use your real name so your partner knows who you are.</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
