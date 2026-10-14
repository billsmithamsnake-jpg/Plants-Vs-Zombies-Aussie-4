import React, { useState } from 'react';
import { soundFx } from '../utils/audio';

interface ProfileModalProps {
  currentName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ currentName, onSave, onClose }) => {
  const [nameInput, setNameInput] = useState(currentName || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClick();
    if (nameInput.trim()) {
      onSave(nameInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-stone-800 border-4 border-stone-600 rounded-2xl shadow-2xl p-6 text-stone-200 overflow-hidden font-serif">
        {/* Skull Icon Header */}
        <div className="flex justify-center -mt-2 mb-2">
          <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-lg">
            <path d="M 20 50 Q 20 10 50 10 Q 80 10 80 50 Q 80 70 65 75 L 65 85 L 35 85 L 35 75 Q 20 70 20 50 Z" fill="#64748b" stroke="#334155" strokeWidth="4" />
            <ellipse cx="38" cy="45" rx="10" ry="14" fill="#1e293b" />
            <ellipse cx="62" cy="45" rx="10" ry="14" fill="#1e293b" />
            <polygon points="50,55 45,65 55,65" fill="#1e293b" />
            <line x1="42" y1="78" x2="42" y2="85" stroke="#1e293b" strokeWidth="3" />
            <line x1="50" y1="78" x2="50" y2="85" stroke="#1e293b" strokeWidth="3" />
            <line x1="58" y1="78" x2="58" y2="85" stroke="#1e293b" strokeWidth="3" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-center tracking-widest text-amber-200 uppercase mb-4 drop-shadow">
          Login / Signup
        </h2>

        <p className="text-center text-stone-300 font-semibold tracking-wider uppercase mb-6 text-lg">
          Please enter your name:
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative border-4 border-amber-600 bg-[#3a220d] rounded-lg p-3 shadow-inner">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Enter name..."
              maxLength={16}
              autoFocus
              className="w-full bg-transparent text-amber-100 text-xl font-bold tracking-wider outline-none px-2 font-mono"
            />
          </div>

          <div className="flex justify-between gap-4 pt-2">
            <button
              type="submit"
              onClick={() => soundFx.playClick()}
              disabled={!nameInput.trim()}
              className="flex-1 py-3 px-6 bg-gradient-to-b from-stone-600 to-stone-800 hover:from-green-700 hover:to-green-900 border-2 border-stone-500 rounded-xl text-green-400 font-extrabold text-xl tracking-wider shadow-lg transition active:scale-95 disabled:opacity-50"
            >
              OK
            </button>
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="flex-1 py-3 px-6 bg-gradient-to-b from-stone-600 to-stone-800 hover:from-red-800 hover:to-red-950 border-2 border-stone-500 rounded-xl text-green-400 font-extrabold text-xl tracking-wider shadow-lg transition active:scale-95"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
