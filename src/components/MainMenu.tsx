import React, { useEffect, useState } from 'react';
import { MENU_BG_IMAGE } from '../assets/images';
import { ALL_ACHIEVEMENTS } from '../data/achievementsData';
import { soundFx, outbackMusic } from '../utils/audio';
import { AchievementsModal } from './AchievementsModal';
import { OzAlmanacModal } from './OzAlmanacModal';
import { AcknowledgementOfCountryModal } from './AcknowledgementOfCountryModal';
import { PlayerStatsModal } from './PlayerStatsModal';
import { PlayerStats, getPlayerStats } from '../utils/playerStats';

interface MainMenuProps {
  playerName: string;
  highestLevelUnlocked?: number;
  unlockedAchievements?: string[];
  playerStats?: PlayerStats;
  onChangeProfile: () => void;
  onSelectLevel: () => void;
  onNewGame: () => void;
  onLoadGame: () => void;
  onExit: () => void;
  onStartSecretGlitchLevel?: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  playerName,
  highestLevelUnlocked = 1,
  unlockedAchievements = [],
  playerStats,
  onChangeProfile,
  onSelectLevel,
  onNewGame,
  onLoadGame,
  onExit,
  onStartSecretGlitchLevel,
}) => {
  const [showAlmanac, setShowAlmanac] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showAcknowledgementModal, setShowAcknowledgementModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(outbackMusic.isMuted);
  const [isPlaying, setIsPlaying] = useState<boolean>(outbackMusic.getIsPlaying());

  // Auto-play "G'day Neighbour" upon mounting and ensure active on user gestures
  useEffect(() => {
    outbackMusic.play('menu');
    setIsPlaying(outbackMusic.getIsPlaying());

    const handleInteraction = () => {
      outbackMusic.resumeContextIfNeeded();
      if (!outbackMusic.getIsPlaying()) {
        outbackMusic.play('menu');
      }
      setIsPlaying(outbackMusic.getIsPlaying());
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    const interval = setInterval(() => {
      setIsPlaying(outbackMusic.getIsPlaying());
    }, 500);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      clearInterval(interval);
    };
  }, []);

  const handleToggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playClick();
    const muted = outbackMusic.toggleMute();
    setIsMusicMuted(muted);
    if (!muted && !outbackMusic.getIsPlaying()) {
      outbackMusic.play('menu');
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[680px] bg-amber-950 overflow-hidden select-none flex items-center justify-center">
      {/* 16:9 Aspect Ratio Main Container matching user artwork directly */}
      <div className="relative w-full h-full max-w-[1280px] aspect-[16/9] mx-auto overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Full Image Background matching user artwork directly */}
        <img
          src={MENU_BG_IMAGE}
          alt="Plants vs Zombies Australia Main Menu"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Player Profile Tag & Trophy Case Button - Placed over Queenslander House Porch */}
        <div className="absolute top-[3%] left-[2.5%] z-20 flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick();
              onChangeProfile();
            }}
            className="cursor-pointer transition-all transform hover:scale-105 active:scale-95 group focus:outline-none flex items-center gap-2"
            aria-label="Change Profile"
          >
            <span className="text-xl drop-shadow">🇦🇺</span>
            <div className="text-left bg-black/60 backdrop-blur-sm px-3 py-1 rounded-xl border border-amber-500/40 group-hover:border-amber-400/80 transition-colors">
              <div className="text-[10px] text-amber-300 font-sans uppercase tracking-wider font-bold">
                Profile
              </div>
              <div className="font-extrabold text-xs text-lime-300 truncate max-w-[130px]">
                {playerName || 'Neighbor'}
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setShowAchievementsModal(true);
            }}
            className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-1.5 shadow-lg active:scale-95 transition cursor-pointer backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400 fill-current">
              <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
            </svg>
            <span>TROPHIES</span>
            <span className="text-[10px] bg-amber-800/90 px-1.5 py-0.5 rounded text-amber-200 font-mono">
              {unlockedAchievements.length}/{ALL_ACHIEVEMENTS.length}
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setShowAcknowledgementModal(true);
            }}
            className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-2 shadow-lg active:scale-95 transition cursor-pointer backdrop-blur-sm"
            title="Acknowledgement to Country"
          >
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-amber-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-red-700 border border-amber-400/60" />
            </span>
            <span>ACKNOWLEDGEMENT TO COUNTRY</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setShowStatsModal(true);
            }}
            className="bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 hover:border-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-200 flex items-center gap-1.5 shadow-lg active:scale-95 transition cursor-pointer backdrop-blur-sm"
            title="Player Career Statistics & Leaves"
          >
            <span className="text-sm">📊</span>
            <span>STATS</span>
          </button>
        </div>

        {/* Aussie Soundtrack Badge ("G'day Neighbour") */}
        <div className="absolute top-[3%] right-[2.5%] z-20 flex items-center gap-2">
          <button
            onClick={handleToggleMusic}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition shadow-lg backdrop-blur-md cursor-pointer ${
              isMusicMuted
                ? 'bg-stone-900/80 border-stone-600 text-stone-400 hover:text-stone-200'
                : 'bg-amber-950/85 border-amber-500/70 text-amber-200 hover:border-amber-400'
            }`}
            title={isMusicMuted ? 'Unmute G\'day Neighbour Theme' : 'Mute Theme'}
          >
            <span className="text-sm">{isMusicMuted ? '🔇' : '🪃'}</span>
            <div className="text-left font-sans">
              <div className="text-[9px] text-yellow-400 font-bold uppercase tracking-wider leading-none">
                OUTBACK OST
              </div>
              <div className="text-xs font-black text-amber-100 leading-tight">
                G'day Neighbour
              </div>
            </div>

            {/* Live Audio Equalizer Animation */}
            {!isMusicMuted && isPlaying && (
              <div className="flex items-end gap-0.5 h-3.5 ml-1">
                <span className="w-1 bg-lime-400 rounded-full animate-pulse h-2" style={{ animationDuration: '0.4s' }} />
                <span className="w-1 bg-yellow-400 rounded-full animate-pulse h-3.5" style={{ animationDuration: '0.6s' }} />
                <span className="w-1 bg-amber-400 rounded-full animate-pulse h-2.5" style={{ animationDuration: '0.5s' }} />
                <span className="w-1 bg-orange-500 rounded-full animate-pulse h-3" style={{ animationDuration: '0.35s' }} />
              </div>
            )}
          </button>
        </div>

        {/* OVERLAY INTERACTIVE HIDDEN GRID POSITIONED PRECISELY OVER TOMBSTONE SLABS & WORDS */}
        <div className="absolute top-[49.5%] left-[71.8%] w-[19.4%] h-[34.2%] z-20 flex flex-col justify-between pointer-events-none">
          {/* 1. Slab 1: Chuck a Level (Select Level) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onSelectLevel();
            }}
            className="menu-tombstone-glow w-full h-[22.5%] pointer-events-auto cursor-pointer focus:outline-none rounded-xl border-2 border-transparent"
            aria-label="Select Level"
            title="Chuck a Level (Select Level)"
          />

          {/* 2. Slab 2: Crack a New One (New Game) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onNewGame();
            }}
            className="menu-tombstone-glow w-full h-[22.5%] pointer-events-auto cursor-pointer focus:outline-none rounded-xl border-2 border-transparent"
            aria-label="New Game"
            title="Crack a New One (New Game)"
          />

          {/* 3. Slab 3: Reload Yer Game (Load Game) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onLoadGame();
            }}
            className="menu-tombstone-glow w-full h-[22.5%] pointer-events-auto cursor-pointer focus:outline-none rounded-xl border-2 border-transparent"
            aria-label="Load Game"
            title="Reload Yer Game (Load Game)"
          />

          {/* 4. Slab 4: Fair Dinkum Exit (Exit) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              onExit();
            }}
            className="menu-tombstone-glow w-full h-[22.5%] pointer-events-auto cursor-pointer focus:outline-none rounded-xl border-2 border-transparent"
            aria-label="Exit Game"
            title="Fair Dinkum Exit (Exit Game)"
          />
        </div>

        {/* 5. Oz Almanac Notebook on Ground next to tombstone base */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setShowAlmanac(true);
          }}
          className="menu-tombstone-glow absolute top-[78.5%] left-[62.2%] w-[11.2%] h-[14.8%] z-20 cursor-pointer focus:outline-none rounded-2xl border-2 border-transparent"
          aria-label="Open Oz Almanac"
          title="Oz Almanac"
        />
      </div>

      {/* Oz Almanac Modal */}
      {showAlmanac && (
        <OzAlmanacModal
          highestLevelUnlocked={highestLevelUnlocked}
          onClose={() => setShowAlmanac(false)}
        />
      )}

      {/* Achievements Modal */}
      {showAchievementsModal && (
        <AchievementsModal
          unlockedAchievements={unlockedAchievements}
          playerName={playerName}
          onClose={() => setShowAchievementsModal(false)}
          onStartSecretGlitchLevel={() => {
            setShowAchievementsModal(false);
            if (onStartSecretGlitchLevel) {
              onStartSecretGlitchLevel();
            }
          }}
        />
      )}

      {/* Acknowledgement of Country Modal */}
      {showAcknowledgementModal && (
        <AcknowledgementOfCountryModal
          onClose={() => setShowAcknowledgementModal(false)}
        />
      )}

      {/* Player Career Statistics & Leaves Modal */}
      {showStatsModal && (
        <PlayerStatsModal
          stats={playerStats || getPlayerStats()}
          playerName={playerName}
          highestLevelUnlocked={highestLevelUnlocked}
          unlockedAchievements={unlockedAchievements}
          onClose={() => setShowStatsModal(false)}
        />
      )}
    </div>
  );
};




