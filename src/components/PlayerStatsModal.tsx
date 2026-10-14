import React, { useEffect } from 'react';
import { PlayerStats, formatPlayTime } from '../utils/playerStats';
import { soundFx } from '../utils/audio';
import { ALL_ACHIEVEMENTS } from '../data/achievementsData';

interface PlayerStatsModalProps {
  stats: PlayerStats;
  playerName: string;
  highestLevelUnlocked: number;
  unlockedAchievements: string[];
  onClose: () => void;
}

export const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({
  stats,
  playerName,
  highestLevelUnlocked,
  unlockedAchievements,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const totalAchievements = ALL_ACHIEVEMENTS.length;
  const leavesNeeded = Math.max(0, 150 - stats.leaves);

  // Fun gardener ranking based on zombies defeated
  const getRank = (kills: number) => {
    if (kills >= 1000) return { title: 'Legendary Bush Ranger', color: 'text-amber-300' };
    if (kills >= 500) return { title: 'Outback Veteran', color: 'text-yellow-400' };
    if (kills >= 200) return { title: 'Lawn Defender', color: 'text-lime-400' };
    if (kills >= 50) return { title: 'Greenhorn Gardener', color: 'text-emerald-400' };
    return { title: 'Backyard Sprout', color: 'text-stone-400' };
  };

  const rank = getRank(stats.totalZombiesDefeated);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 border-4 border-amber-600 rounded-3xl shadow-2xl p-5 sm:p-7 text-stone-200 flex flex-col items-center overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon / Emblem */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-300 uppercase tracking-wider drop-shadow">
            Player Career Statistics
          </h2>
          <span className="text-2xl">📈</span>
        </div>

        {/* Player Profile & Rank Bar */}
        <div className="w-full bg-black/50 border border-amber-500/40 rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-400 uppercase font-sans font-bold">GARDENER:</span>
            <span className="text-base font-extrabold text-lime-300 truncate max-w-[160px]">
              {playerName || 'Neighbor'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 uppercase font-sans font-bold">HONOUR:</span>
            <span className={`text-xs font-black uppercase tracking-wider ${rank.color}`}>
              {rank.title}
            </span>
          </div>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-4">
          {/* Total Zombies Defeated */}
          <div className="bg-stone-950/80 border-2 border-red-900/60 hover:border-red-600/80 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-lg transition">
            <span className="text-2xl mb-1">🧟‍♂️</span>
            <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
              Zombies Defeated
            </span>
            <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
              {stats.totalZombiesDefeated.toLocaleString()}
            </span>
            <span className="text-[10px] text-stone-500 mt-1">Invaders repelled</span>
          </div>

          {/* Total Sun Collected */}
          <div className="bg-stone-950/80 border-2 border-yellow-900/60 hover:border-yellow-500/80 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-lg transition">
            <span className="text-2xl mb-1">☀️</span>
            <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
              Sun / Prawns
            </span>
            <span className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">
              {stats.totalSunCollected.toLocaleString()}
            </span>
            <span className="text-[10px] text-stone-500 mt-1">Solar energy collected</span>
          </div>

          {/* Total Time Played */}
          <div className="bg-stone-950/80 border-2 border-blue-900/60 hover:border-blue-500/80 rounded-2xl p-3.5 flex flex-col items-center text-center shadow-lg transition">
            <span className="text-2xl mb-1">⏱️</span>
            <span className="text-xs text-stone-400 uppercase font-bold tracking-wider mb-1">
              Time Played
            </span>
            <span className="text-xl sm:text-2xl font-black text-cyan-300 font-mono">
              {formatPlayTime(stats.totalTimePlayedSeconds)}
            </span>
            <span className="text-[10px] text-stone-500 mt-1">Lawn combat duration</span>
          </div>
        </div>

        {/* Currency & Casualties Section */}
        <div className="w-full bg-gradient-to-r from-emerald-950/70 via-stone-900 to-amber-950/70 border-2 border-emerald-600/60 rounded-2xl p-4 mb-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-700/40 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍃</span>
              <span className="text-sm font-black text-emerald-300 uppercase tracking-wider">
                Leaves Currency & Plant Sacrifices
              </span>
            </div>
            <span className="text-xs font-mono font-bold bg-emerald-900/90 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500/50">
              {stats.leaves} 🍃 Leaves
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-black/40 rounded-xl p-2.5 border border-emerald-900/40">
              <div className="text-stone-400 font-bold uppercase mb-0.5">Leaves Received:</div>
              <div className="text-base font-black text-emerald-400 font-mono">
                {stats.leaves} 🍃
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Earned strictly when a plant dies in battle (1 leaf per death).
              </div>
            </div>

            <div className="bg-black/40 rounded-xl p-2.5 border border-red-900/40">
              <div className="text-stone-400 font-bold uppercase mb-0.5">Plants Lost in Action:</div>
              <div className="text-base font-black text-rose-400 font-mono">
                {stats.totalPlantsLost.toLocaleString()} 🥀
              </div>
              <div className="text-[11px] text-stone-400 mt-0.5">
                Total fallen flora sacrificed defending the homestead.
              </div>
            </div>
          </div>
        </div>

        {/* Special Power-Up Showcase: Bee-R */}
        <div className="w-full bg-stone-950/90 border-2 border-amber-500/60 rounded-2xl p-4 mb-4 shadow-xl flex items-center gap-4">
          <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-950/80 border-2 border-amber-400/70 flex items-center justify-center p-2 shadow-inner">
            {/* Mini Bee-R Icon */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
              {/* Bee Wings */}
              <ellipse cx="28" cy="30" rx="14" ry="7" fill="#93c5fd" opacity="0.8" transform="rotate(-30 28 30)" />
              <ellipse cx="72" cy="30" rx="14" ry="7" fill="#93c5fd" opacity="0.8" transform="rotate(30 72 30)" />
              {/* Beer Mug Body with Stripes */}
              <rect x="30" y="32" width="40" height="46" rx="10" fill="#f59e0b" stroke="#78350f" strokeWidth="3" />
              {/* Stripes */}
              <rect x="30" y="44" width="40" height="7" fill="#1c1917" />
              <rect x="30" y="58" width="40" height="7" fill="#1c1917" />
              {/* Beer Mug Handle */}
              <path d="M 70 42 C 84 42 84 66 70 66" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
              {/* Foamy Froth Head */}
              <ellipse cx="50" cy="32" rx="22" ry="8" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
              <circle cx="38" cy="28" r="6" fill="#ffffff" />
              <circle cx="50" cy="26" r="7" fill="#ffffff" />
              <circle cx="62" cy="28" r="6" fill="#ffffff" />
              {/* Antennae */}
              <path d="M 44 22 Q 40 12 34 14" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 56 22 Q 60 12 66 14" stroke="#1c1917" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Stinger */}
              <polygon points="50,86 44,78 56,78" fill="#1c1917" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm font-black text-amber-300 uppercase tracking-wider">
                Special Power-Up: BEE-R
              </span>
              {stats.hasUnlockedBeeR ? (
                <span className="bg-lime-900/90 text-lime-300 border border-lime-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                  ✓ UNLOCKED & READY
                </span>
              ) : (
                <span className="bg-stone-800 text-stone-400 border border-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  🔒 {leavesNeeded} Leaves to unlock
                </span>
              )}
            </div>
            <p className="text-xs text-stone-300 leading-snug">
              {stats.hasUnlockedBeeR ? (
                <span>
                  Granted by Aussie Joe! Tap the bottom-right Bee-R button during battle to send a massive beer-bee flying across all lanes, wiping out every zombie on screen (60s cooldown).
                </span>
              ) : (
                <span>
                  Lose 150 plants in battle (or use the secret admin code) to summon Aussie Joe. He will roast your gardening skills and award this screen-clearing brew!
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-3 gap-2.5 w-full mb-6 text-center text-xs">
          <div className="bg-stone-950/70 border border-stone-700/60 rounded-xl p-2.5">
            <div className="text-stone-400 font-bold uppercase text-[10px] mb-0.5">Plants Planted</div>
            <div className="text-base font-black text-lime-400 font-mono">
              {stats.totalPlantsPlanted.toLocaleString()} 🌱
            </div>
          </div>

          <div className="bg-stone-950/70 border border-stone-700/60 rounded-xl p-2.5">
            <div className="text-stone-400 font-bold uppercase text-[10px] mb-0.5">Trophies Earned</div>
            <div className="text-base font-black text-amber-300 font-mono">
              {unlockedAchievements.length} / {totalAchievements} 🏆
            </div>
          </div>

          <div className="bg-stone-950/70 border border-stone-700/60 rounded-xl p-2.5">
            <div className="text-stone-400 font-bold uppercase text-[10px] mb-0.5">Highest Level</div>
            <div className="text-base font-black text-yellow-400 font-mono">
              Level {highestLevelUnlocked} 🗺️
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full max-w-xs py-3 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 border-2 border-amber-400/80 rounded-2xl text-white font-black text-base uppercase tracking-wider shadow-xl transition active:scale-95 cursor-pointer"
        >
          Close Statistics
        </button>
      </div>
    </div>
  );
};
