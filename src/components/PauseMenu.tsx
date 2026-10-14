import React, { useEffect, useState } from 'react';
import { soundFx } from '../utils/audio';

interface PauseMenuProps {
  onResume: () => void;
  onSave: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onSave,
  onRestart,
  onMainMenu,
}) => {
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Keyboard shortcut listener: 'M' or 'Escape' resumes/closes the menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm' || e.key === 'Escape') {
        e.preventDefault();
        soundFx.playClick();
        onResume();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onResume]);

  const handleSaveClick = () => {
    soundFx.playClick();
    onSave();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none font-serif overflow-hidden animate-in fade-in duration-200">
      {/* Outback Wooden Plaque Cabinet Frame matching Achievements Trophy Modal */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#2b180d] via-[#1a0f07] to-[#120a04] border-8 border-[#633a1c] rounded-3xl shadow-2xl p-6 text-amber-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Subtle Woodgrain Vector Planks Backdrop */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 800 600" className="w-full h-full stroke-amber-900/60 stroke-[1.5] fill-none">
            <line x1="0" y1="90" x2="800" y2="90" strokeDasharray="12,8" />
            <line x1="0" y1="180" x2="800" y2="180" strokeDasharray="16,6" />
            <line x1="0" y1="270" x2="800" y2="270" strokeDasharray="10,10" />
            <line x1="0" y1="360" x2="800" y2="360" strokeDasharray="14,8" />
            <line x1="0" y1="450" x2="800" y2="450" strokeDasharray="18,6" />
            <ellipse cx="160" cy="140" rx="50" ry="14" />
            <ellipse cx="640" cy="320" rx="70" ry="18" />
            <ellipse cx="380" cy="460" rx="45" ry="12" />
          </svg>
        </div>

        {/* Header Bar - Clean Title without any shield badge */}
        <div className="relative z-10 flex items-center justify-between border-b-4 border-amber-900/80 py-2.5 mb-4">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-3xl font-black text-amber-200 tracking-wider uppercase drop-shadow-lg font-serif">
              GAME PAUSED
            </h2>
            <span className="text-[11px] font-mono text-amber-400/80 tracking-widest uppercase">
              OUTBACK SURVIVAL STRATEGY
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Geometric Keycap Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-amber-950/90 border border-amber-500/80 px-3 py-1 rounded-xl text-xs font-bold text-amber-300 font-mono shadow-xl">
              <span className="text-amber-400 font-black">[M]</span>
              <span className="text-stone-400">/</span>
              <span className="text-amber-400 font-black">[ESC]</span>
              <span className="text-stone-300">RESUME</span>
            </div>

            {/* Geometric Circular Close Button */}
            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onResume();
              }}
              className="w-9 h-9 bg-amber-900/80 hover:bg-amber-800 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-100 font-black text-lg shadow-xl cursor-pointer active:scale-95 transition"
              title="Resume Game"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Save Notification Banner */}
        {saveSuccess && (
          <div className="relative z-10 mb-3 bg-lime-950/95 border-2 border-lime-400 text-lime-300 font-sans font-bold px-4 py-2 rounded-xl text-center text-xs tracking-wide shadow-lg flex items-center justify-center gap-2 animate-bounce">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-lime-400 fill-current">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>GAME STATE AND LAWN DEFENSES SAVED TO STORAGE</span>
          </div>
        )}

        {/* Main Body: Two-Column Uncluttered Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 overflow-hidden flex-1">
          {/* Left Column (4.5 Cols): Actions */}
          <div className="md:col-span-5 bg-gradient-to-b from-[#180e07]/95 via-[#26180c]/95 to-[#190f07]/95 border-4 border-[#4d3018] rounded-2xl p-4 flex flex-col justify-between shadow-2xl backdrop-blur-xs">
            <div className="flex flex-col gap-2.5">
              <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest px-1 pb-1 border-b border-amber-900/60 flex items-center justify-between">
                <span>COMMAND ACTIONS</span>
                <span className="text-stone-400 font-mono text-[10px]">SLOT 1</span>
              </div>

              {/* 1. Resume Game Button */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onResume();
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-lime-700 via-lime-600 to-lime-800 hover:from-lime-600 hover:to-lime-700 border-2 border-lime-400 rounded-xl text-white font-serif font-black text-sm tracking-wider uppercase shadow-[0_4px_15px_rgba(101,163,13,0.35)] transition transform active:scale-98 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-lime-950/80 border border-lime-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-lime-200 fill-current">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  </div>
                  <span>RESUME GAME</span>
                </div>
                <span className="text-[10px] font-mono text-lime-200 bg-lime-900/80 px-2 py-0.5 rounded border border-lime-400/50">[M]</span>
              </button>

              {/* 2. Save Progress Button */}
              <button
                type="button"
                onClick={handleSaveClick}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-sky-800 via-sky-700 to-sky-900 hover:from-sky-700 hover:to-sky-800 border-2 border-sky-400 rounded-xl text-sky-100 font-serif font-bold text-xs tracking-wider uppercase shadow-md transition active:scale-98 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-sky-950/80 border border-sky-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-sky-200 fill-current">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2zM7 3v5h8V3H7zm10 18v-8H7v8h10z" />
                    </svg>
                  </div>
                  <span>SAVE DEFENSES</span>
                </div>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-950/60 px-1.5 py-0.5 rounded">SAVE</span>
              </button>

              {/* 3. Restart Level Button */}
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onRestart();
                }}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 hover:from-amber-800 hover:to-amber-900 border-2 border-amber-600 rounded-xl text-amber-100 font-serif font-bold text-xs tracking-wider uppercase shadow-md transition active:scale-98 flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-950/80 border border-amber-400 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-amber-200 fill-none stroke-current stroke-2">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  </div>
                  <span>RESTART LEVEL</span>
                </div>
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded">RESET</span>
              </button>
            </div>

            {/* Bottom: Main Menu Exit Button */}
            <div className="pt-3 border-t border-amber-900/60">
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onMainMenu();
                }}
                className="w-full py-2.5 px-4 bg-stone-900/90 hover:bg-stone-800 border-2 border-stone-600 rounded-xl text-stone-300 hover:text-stone-100 font-serif font-bold text-xs tracking-widest uppercase transition active:scale-98 flex items-center justify-center gap-2 cursor-pointer shadow-inner"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current stroke-2 fill-none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>EXIT TO MAIN MENU</span>
              </button>
            </div>
          </div>

          {/* Right Column (7 Cols): Uncluttered Survival Tips for Casual Unlocked Plants */}
          <div className="md:col-span-7 bg-[#1b1008] border-4 border-[#3d2513] rounded-2xl p-4 flex flex-col justify-between shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-amber-900/70 pb-2.5 mb-2.5 shrink-0">
              <div className="flex items-center gap-2">
                {/* Geometric Diamond Shape */}
                <div className="w-5 h-5 rounded-md bg-amber-900/90 border border-amber-400 rotate-45 flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-300 rounded-xs" />
                </div>
                <span className="font-serif font-black text-amber-200 text-sm tracking-wider uppercase">
                  SURVIVAL TIPS
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">UNLOCKED BOTANICAL ARSENAL</span>
            </div>

            {/* Clean Survival Tips Card List using Exact Game Plants and Prawn Economics */}
            <div className="space-y-2.5 overflow-y-auto max-h-[310px] pr-1.5 font-sans">
              {/* Tip 1: Level 1 Early Game - Grill Flower & Weedshooter */}
              <div className="p-3 bg-stone-950/90 rounded-xl border border-amber-900/40 hover:border-amber-600/70 transition flex items-start gap-3 shadow-inner">
                {/* Geometric Hexagon / Sunfire Prawn Generator Icon */}
                <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-500/70 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 fill-current">
                    <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-amber-200 text-xs uppercase tracking-wide">
                      GRILL FLOWER & WEEDSHOOTER
                    </h4>
                    <span className="text-[9px] font-mono font-bold bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded border border-amber-600/50">LEVEL 1</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed mt-1">
                    Plant 3–4 <strong className="text-amber-200">Grill Flowers</strong> in back columns to generate +50 grilled prawns continually. Support them with low-cost (75 prawns) <strong className="text-lime-300">Weedshooters</strong> to hold off early walkers.
                  </p>
                </div>
              </div>

              {/* Tip 2: Level 2 & 3 - Potato Mine & Wall-nut */}
              <div className="p-3 bg-stone-950/90 rounded-xl border border-stone-800 hover:border-amber-700/60 transition flex items-start gap-3 shadow-inner">
                {/* Geometric Rounded Square Trap Icon */}
                <div className="w-8 h-8 rounded-lg bg-stone-900 border border-stone-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 fill-current">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <circle cx="12" cy="12" r="3" className="fill-stone-950" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-stone-200 text-xs uppercase tracking-wide">
                      LEMON MINES & WALLABYS
                    </h4>
                    <span className="text-[9px] font-mono font-bold bg-stone-900 text-stone-300 px-1.5 py-0.2 rounded border border-stone-600/50">LEVEL 2–3</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed mt-1">
                    Plant 25-prawn <strong className="text-yellow-300">Lemon Mines</strong> early (arms in 12s) to blow up tough coneheads for cheap. Deploy 4,000 HP <strong className="text-amber-400">Wallabys</strong> to stall zombies while your lanes power up.
                  </p>
                </div>
              </div>

              {/* Tip 3: Level 4 - Snow Pea, Weedpeater & Threeweeder */}
              <div className="p-3 bg-stone-950/90 rounded-xl border border-cyan-950/60 hover:border-cyan-600/70 transition flex items-start gap-3 shadow-inner">
                {/* Geometric Polygon Chill Icon */}
                <div className="w-8 h-8 rounded-lg bg-sky-950 border border-cyan-500/70 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-300 fill-none stroke-current stroke-2">
                    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-cyan-200 text-xs uppercase tracking-wide">
                      SNOW PEAS & WEEDPEATERS
                    </h4>
                    <span className="text-[9px] font-mono font-bold bg-sky-950 text-cyan-400 px-1.5 py-0.2 rounded border border-cyan-600/50">LEVEL 4</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed mt-1">
                    <strong className="text-cyan-300">Snow Peas</strong> freeze and cut zombie movement and eating speeds in half. Pair them with rapid-firing <strong className="text-lime-300">Weedpeaters</strong> and 3-lane <strong className="text-lime-400">Threeweeders</strong> for maximum damage.
                  </p>
                </div>
              </div>

              {/* Tip 4: Level 5 - Cherry Bomb & Dingo Chomper */}
              <div className="p-3 bg-stone-950/90 rounded-xl border border-red-950/60 hover:border-red-600/70 transition flex items-start gap-3 shadow-inner">
                {/* Geometric Blast Diamond Icon */}
                <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-500/70 flex items-center justify-center shrink-0 mt-0.5">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-red-400 fill-current">
                    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-black text-red-200 text-xs uppercase tracking-wide">
                      CHERRY BOMBS & DINGO CHOMPERS
                    </h4>
                    <span className="text-[9px] font-mono font-bold bg-red-950 text-red-400 px-1.5 py-0.2 rounded border border-red-600/50">LEVEL 5+</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed mt-1">
                    Drop instant <strong className="text-red-300">Cherry Bombs</strong> to vaporize dense 3x3 clusters during Huge Wave alarms. Use <strong className="text-amber-200">Dingo Chompers</strong> behind Wallabys to swallow heavy bucketheads in 6 seconds.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Handbook Footer */}
            <div className="mt-2.5 pt-2 border-t border-amber-900/60 flex items-center justify-between text-[10px] font-mono text-stone-400">
              <span className="text-amber-400/90">OUTBACK DEFENSE HANDBOOK</span>
              <span className="text-stone-500">PRAWN-POWERED BOTANY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
