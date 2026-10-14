import React from 'react';
import { SaveGame } from '../types';
import { soundFx } from '../utils/audio';

interface LoadGameModalProps {
  saveGames: SaveGame[];
  onLoadSave: (save: SaveGame) => void;
  onDeleteSave: (id: string) => void;
  onClose: () => void;
}

export const LoadGameModal: React.FC<LoadGameModalProps> = ({
  saveGames,
  onLoadSave,
  onDeleteSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-stone-900 border-4 border-stone-600 rounded-3xl shadow-2xl p-6 text-stone-200 flex flex-col max-h-[85vh] font-serif">
        <h2 className="text-3xl font-black text-center tracking-widest text-amber-200 uppercase mb-6 drop-shadow">
          LOAD SAVED GAME
        </h2>

        {saveGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-stone-600 mb-4 fill-current">
              <path d="M 20 90 L 20 40 Q 20 10 50 10 Q 80 10 80 40 L 80 90 Z" />
            </svg>
            <p className="text-xl font-semibold text-stone-400">No saved games found!</p>
            <p className="text-stone-500 text-sm mt-1">Start a new game and click SAVE in the pause menu.</p>
          </div>
        ) : (
          <div className="overflow-y-auto space-y-4 pr-2 max-h-[50vh]">
            {saveGames.map((save) => (
              <div
                key={save.id}
                className="bg-stone-800/90 hover:bg-stone-750 border-2 border-stone-600 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-lg transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-amber-300">{save.playerName}</span>
                    <span className="bg-amber-900/80 border border-amber-600 text-amber-200 text-xs px-2 py-0.5 rounded-full font-bold">
                      Level {save.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-stone-300 mt-2 font-mono">
                    <span>🦐 {save.sun} Prawns</span>
                    <span>🌱 {save.plants.length} Plants</span>
                    <span>🧟 {save.zombies.length} Zombies Left</span>
                    <span className="text-stone-400 text-xs">{save.savedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onLoadSave(save);
                    }}
                    className="px-5 py-2.5 bg-green-700 hover:bg-green-600 border border-green-500 rounded-xl font-bold text-white text-sm tracking-wider uppercase shadow active:scale-95 transition"
                  >
                    LOAD
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onDeleteSave(save.id);
                    }}
                    className="p-2.5 bg-red-900/80 hover:bg-red-800 border border-red-600 rounded-xl font-bold text-red-200 shadow active:scale-95 transition"
                    title="Delete Save"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-10 py-3 bg-gradient-to-b from-stone-700 to-stone-900 hover:from-amber-800 hover:to-amber-950 border-4 border-stone-500 rounded-2xl text-amber-200 font-black text-xl tracking-widest uppercase shadow-xl active:scale-95 transition"
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
};
