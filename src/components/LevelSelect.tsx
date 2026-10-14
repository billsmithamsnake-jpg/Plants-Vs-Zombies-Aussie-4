import React, { useState } from 'react';
import { MENU_BG_IMAGE } from '../assets/images';
import { ALL_ACHIEVEMENTS } from '../data/achievementsData';
import { LevelConfig, ZombieType } from '../types';
import { soundFx } from '../utils/audio';
import { AchievementsModal } from './AchievementsModal';
import { AussieJoeDialog, AUSSIE_JOE_ROAST_DIALOGUE } from './AussieJoeDialog';
import { ZombieSprite } from './PVZRenderers';

interface LevelSelectProps {
  levels: LevelConfig[];
  highestLevelUnlocked: number;
  unlockedAchievements?: string[];
  playerName?: string;
  onSelectLevel: (levelNum: number) => void;
  onAdminUnlockAll?: () => void;
  onAdminLockAll?: () => void;
  onUnlockCheatBaby?: () => void;
  onUnlockTrophyExe?: () => void;
  onUnlockAllAchievements?: () => void;
  onUnlockMeatcan?: () => void;
  onGrantPetals?: () => void;
  onStartSecretGlitchLevel?: (isTester?: boolean) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({
  levels,
  highestLevelUnlocked,
  unlockedAchievements = [],
  playerName = 'Neighbor',
  onSelectLevel,
  onAdminUnlockAll,
  onAdminLockAll,
  onUnlockCheatBaby,
  onUnlockTrophyExe,
  onUnlockAllAchievements,
  onUnlockMeatcan,
  onGrantPetals,
  onStartSecretGlitchLevel,
  onBack,
}) => {
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showAussieJoeCheatModal, setShowAussieJoeCheatModal] = useState(false);
  const [showAussieJoeRoastModal, setShowAussieJoeRoastModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = passwordInput.trim();

    if (input.toUpperCase() === 'IAMABABY') {
      soundFx.playClick();
      setShowAdminModal(false);
      setPasswordInput('');
      setPasswordError(false);
      setShowAussieJoeCheatModal(true);
      if (onUnlockCheatBaby) {
        onUnlockCheatBaby();
      }
      return;
    }

    if (input === 'Trophy') {
      soundFx.playClick();
      setPasswordError(false);
      if (onUnlockTrophyExe) {
        onUnlockTrophyExe();
      }
      setAdminSuccess('Unlocked Trophy.EXE achievement!');
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
      }, 1200);
      return;
    }

    if (input === '252811') {
      soundFx.playClick();
      setPasswordError(false);
      if (onUnlockAllAchievements) {
        onUnlockAllAchievements();
      }
      setAdminSuccess('ALL ACHIEVEMENTS UNLOCKED!');
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
      }, 1200);
      return;
    }

    if (input.toLowerCase() === 'sorryforeverything') {
      soundFx.playClick();
      setPasswordError(false);
      if (onUnlockMeatcan) {
        onUnlockMeatcan();
      }
      setAdminSuccess('Unlocked Meatcan plant!');
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
      }, 1200);
      return;
    }

    if (input.toLowerCase() === 'tester') {
      soundFx.playClick();
      setPasswordError(false);
      setAdminSuccess('Entering Level 99 (Phase 2 Test Mode: 149/150 Zombies cleared)...');
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
        if (onStartSecretGlitchLevel) {
          onStartSecretGlitchLevel(true);
        } else {
          onSelectLevel(99);
        }
      }, 1000);
      return;
    }

    if (input.toLowerCase() === 'petals') {
      soundFx.playClick();
      setPasswordError(false);
      setShowAdminModal(false);
      setPasswordInput('');
      if (onGrantPetals) {
        onGrantPetals();
      }
      setShowAussieJoeRoastModal(true);
      return;
    }

    if (input.toLowerCase() === 'gator') {
      soundFx.playClick();
      if (onAdminUnlockAll) {
        onAdminUnlockAll();
      }
      setAdminSuccess('All levels successfully unlocked!');
      setPasswordError(false);
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
      }, 1200);
      return;
    } else {
      soundFx.playClick();
      setPasswordError(true);
    }
  };

  const handleAdminLock = () => {
    if (passwordInput.trim().toLowerCase() === 'gator') {
      soundFx.playClick();
      if (onAdminLockAll) {
        onAdminLockAll();
      }
      setAdminSuccess('All levels locked back to Level 1!');
      setPasswordError(false);
      setTimeout(() => {
        setShowAdminModal(false);
        setAdminSuccess(null);
        setPasswordInput('');
      }, 1200);
    } else {
      soundFx.playClick();
      setPasswordError(true);
    }
  };

  const hasBeatenSecretLevel = unlockedAchievements.includes('punch_coded_gut');
  const displayLevels = levels.filter((lvl) => lvl.levelNumber !== 99 || hasBeatenSecretLevel);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-900 overflow-hidden flex flex-col items-center justify-between p-6 select-none font-serif">
      {/* Background image - Plants vs Zombies Australia Outback strictly used without added borders */}
      <div className="absolute inset-0 z-0">
        <img
          src={MENU_BG_IMAGE}
          alt="Plants vs Zombies Australia Level Select Background"
          className="w-full h-full object-cover opacity-85 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />
      </div>

      {/* Header Title */}
      <div className="relative z-10 my-1">
        <div className="bg-stone-900/80 border border-stone-600/80 rounded-2xl px-8 py-2 shadow-2xl backdrop-blur-sm">
          <h1 className="text-2xl md:text-3xl font-black tracking-widest text-amber-200 uppercase drop-shadow">
            SELECT LEVEL
          </h1>
        </div>
      </div>


      {/* Main Grid Layout */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-6 my-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-4xl px-4 max-h-[480px] overflow-y-auto p-2">
          {displayLevels.map((lvl) => {
            const isUnlocked = lvl.levelNumber === 99 ? hasBeatenSecretLevel : lvl.levelNumber <= highestLevelUnlocked;
            const isPro = (lvl.isProMode || lvl.levelNumber >= 7) && lvl.levelNumber !== 99;
            const isFinal = lvl.levelNumber === 99;
            const previewZombie: ZombieType = 
              lvl.levelNumber === 99 ? 'aussie_joe_boss' :
              lvl.levelNumber === 1 || lvl.levelNumber === 7 ? 'basic' :
              lvl.levelNumber === 2 || lvl.levelNumber === 8 ? 'conehead' :
              lvl.levelNumber === 3 || lvl.levelNumber === 9 ? 'polevaulter' :
              lvl.levelNumber === 4 || lvl.levelNumber === 10 ? 'koala_imp' :
              lvl.levelNumber === 5 || lvl.levelNumber === 11 ? 'flag' :
              lvl.levelNumber === 6 || lvl.levelNumber === 12 ? 'red_sand_gargantuar' :
              lvl.zombieTypes[lvl.zombieTypes.length - 1] || 'basic';

            return (
              <button
                key={lvl.levelNumber}
                disabled={!isUnlocked}
                onClick={() => {
                  soundFx.playClick();
                  onSelectLevel(lvl.levelNumber);
                }}
                className={`relative group bg-stone-900/80 border-2 ${
                  isUnlocked
                    ? isFinal
                      ? 'border-red-500 hover:border-yellow-400 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(239,68,68,0.8)] ring-2 ring-red-500/40 cursor-pointer'
                      : isPro
                      ? 'border-purple-500 hover:border-cyan-400 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(168,85,247,0.6)] cursor-pointer'
                      : lvl.levelNumber === 6
                      ? 'border-red-500 hover:border-amber-400 hover:scale-105 active:scale-95 cursor-pointer'
                      : 'border-amber-500/80 hover:border-lime-400 hover:scale-105 active:scale-95 cursor-pointer'
                    : 'border-stone-700 opacity-60 cursor-not-allowed'
                } rounded-2xl p-3 flex flex-col items-center shadow-2xl transition duration-200 overflow-hidden focus:outline-none`}
              >
                {/* Level Frame Window */}
                <div className="relative w-full h-32 bg-slate-800/80 rounded-xl overflow-hidden flex items-center justify-center">
                  <div className={`absolute inset-0 ${
                    isFinal
                      ? 'bg-gradient-to-b from-red-950 via-purple-950 to-black'
                      : isPro 
                      ? 'bg-gradient-to-b from-purple-950 via-indigo-900 to-black'
                      : lvl.levelNumber === 6 
                      ? 'bg-gradient-to-b from-orange-400 via-red-300 to-amber-200' 
                      : 'bg-gradient-to-b from-sky-300 to-green-300'
                  } opacity-85`} />
                  
                  {/* Zombie Preview */}
                  <div className={`relative z-10 ${
                    lvl.levelNumber === 99
                      ? 'scale-50 transform translate-y-3'
                      : lvl.levelNumber === 6 || lvl.levelNumber === 12
                      ? 'scale-60 transform translate-y-3'
                      : 'scale-75 transform translate-y-2'
                  }`}>
                    <ZombieSprite type={previewZombie} hp={100} maxHp={100} isVoid={isPro} />
                  </div>

                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center z-20">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 text-stone-400 fill-current">
                        <path d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 5a3 3 0 016 0v3H9V7zm3 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                      </svg>
                      <span className="text-[10px] text-stone-300 font-sans font-bold mt-1">
                        {isPro ? 'PRO LOCKED' : 'LOCKED'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Level Title Label */}
                <div className="mt-2 bg-black/60 px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <span className={`text-lg font-black ${
                    isFinal
                      ? 'text-red-400'
                      : isPro
                      ? 'text-purple-300'
                      : lvl.levelNumber === 6
                      ? 'text-red-400'
                      : 'text-amber-200'
                  } tracking-wider`}>
                    {isFinal ? 'FINAL LEVEL' : isPro ? `Pro Level ${lvl.levelNumber - 6}` : `Level ${lvl.levelNumber}`}
                  </span>
                  {isFinal && (
                    <span className="text-xs font-extrabold text-yellow-300 bg-red-900/90 border border-yellow-400 px-1.5 py-0.5 rounded uppercase animate-pulse">
                      FINAL BOSS
                    </span>
                  )}
                  {(lvl.levelNumber === 6 || lvl.levelNumber === 12) && (
                    <span className="text-xs font-extrabold text-amber-300 bg-red-950/90 border border-red-500/80 px-1.5 py-0.5 rounded uppercase">
                      BOSS
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between mt-2 gap-3 flex-wrap sm:flex-nowrap">
        {/* Trophy Case Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setShowAchievementsModal(true);
          }}
          className="bg-amber-950/90 hover:bg-amber-900 border-2 border-amber-500 rounded-2xl px-4 py-2 text-amber-200 font-extrabold text-sm tracking-wider uppercase shadow-2xl active:scale-95 transition cursor-pointer flex items-center gap-2"
        >
          <span>🏆 TROPHY CASE</span>
          <span className="text-[10px] bg-amber-800/90 px-2 py-0.5 rounded text-amber-200 font-mono">
            {unlockedAchievements.length}/{ALL_ACHIEVEMENTS.length}
          </span>
        </button>

        {/* Admin Panel Button */}
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            setPasswordInput('');
            setPasswordError(false);
            setAdminSuccess(null);
            setShowAdminModal(true);
          }}
          className="bg-amber-950/90 hover:bg-amber-900 border-2 border-yellow-500 rounded-2xl px-4 py-2 text-yellow-300 font-extrabold text-sm tracking-wider uppercase shadow-2xl active:scale-95 transition cursor-pointer flex items-center gap-2"
        >
          <span>🛠️ ADMIN PANEL</span>
          <span className="text-[10px] bg-amber-800/90 px-2 py-0.5 rounded text-amber-200 font-mono">
            {highestLevelUnlocked >= levels.length ? 'ALL UNLOCKED' : 'PROTECTED'}
          </span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onBack();
          }}
          className="bg-stone-900/90 hover:bg-amber-950 border-2 border-amber-500 rounded-2xl px-6 py-2 text-amber-200 font-black text-lg tracking-widest uppercase shadow-2xl active:scale-95 transition cursor-pointer ml-auto"
        >
          BACK
        </button>
      </div>

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
            } else {
              onSelectLevel(99);
            }
          }}
        />
      )}

      {/* Aussie Joe Cheat Code Dialog */}
      {showAussieJoeCheatModal && (
        <AussieJoeDialog
          customLines={[
            "Hey, I noticed that you just used a cheat code for an OP plant! Well we'll all remember this and just to remind you a new, previously hidden achievement is now yours saying how you cheated like a baby. Here's the plant, the Rotten Baby Tomato plant!"
          ]}
          onComplete={() => setShowAussieJoeCheatModal(false)}
        />
      )}

      {/* Aussie Joe 150 Leaves / Petals Roast Dialog */}
      {showAussieJoeRoastModal && (
        <AussieJoeDialog
          customLines={AUSSIE_JOE_ROAST_DIALOGUE}
          onComplete={() => setShowAussieJoeRoastModal(false)}
        />
      )}

      {/* Password Protected Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 border-4 border-amber-500 rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2 text-2xl font-black text-amber-300 tracking-wider uppercase">
              <span>🔐</span>
              <span>ADMIN ACCESS PANEL</span>
            </div>

            <p className="text-sm text-stone-300 font-sans">
              Enter the admin passcode to unlock all game levels:
            </p>

            <form onSubmit={handleAdminSubmit} className="w-full flex flex-col items-center gap-3 mt-1">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Enter passcode..."
                autoFocus
                className="w-full bg-stone-950 border-2 border-amber-600 focus:border-yellow-400 rounded-xl px-4 py-2 text-center text-amber-200 font-mono text-lg font-bold outline-none shadow-inner tracking-widest placeholder:text-stone-600 placeholder:font-sans placeholder:text-sm"
              />

              {passwordError && (
                <div className="text-red-400 text-xs font-sans font-bold bg-red-950/80 border border-red-700/80 px-3 py-1 rounded-lg animate-bounce">
                  ❌ Access Denied: Incorrect Passcode!
                </div>
              )}

              {adminSuccess && (
                <div className="text-lime-300 text-xs font-sans font-bold bg-lime-950/80 border border-lime-600 px-3 py-1 rounded-lg animate-pulse">
                  ✅ {adminSuccess}
                </div>
              )}

              <div className="flex items-center gap-2 w-full mt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick();
                    setShowAdminModal(false);
                  }}
                  className="px-3 bg-stone-800 hover:bg-stone-700 border border-stone-600 rounded-xl py-2 text-stone-300 font-bold uppercase text-xs cursor-pointer active:scale-95 transition"
                >
                  CANCEL
                </button>

                <button
                  type="button"
                  onClick={handleAdminLock}
                  className="flex-1 bg-red-950 hover:bg-red-900 border border-red-600 rounded-xl py-2 text-red-200 font-bold uppercase text-xs tracking-wider cursor-pointer shadow active:scale-95 transition"
                >
                  🔒 LOCK ALL
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 border border-yellow-300 rounded-xl py-2 text-black font-black uppercase text-xs tracking-wider cursor-pointer shadow-lg active:scale-95 transition"
                >
                  🔓 UNLOCK ALL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

