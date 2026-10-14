import React, { useCallback, useEffect, useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { LevelSelect } from './components/LevelSelect';
import { LoadGameModal } from './components/LoadGameModal';
import { MainMenu } from './components/MainMenu';
import { PauseMenu } from './components/PauseMenu';
import { ProfileModal } from './components/ProfileModal';
import { ALL_ACHIEVEMENTS } from './data/achievementsData';
import { ALL_PLANTS, LEVELS } from './data/pvzData';
import {
  GameStage,
  PlantedPlant,
  SaveGame,
  UserProfile,
  Zombie,
} from './types';
import { soundFx, outbackMusic } from './utils/audio';
import { PlayerStats, getPlayerStats, grantPetalsCheat } from './utils/playerStats';

export default function App() {
  const [stage, setStage] = useState<GameStage>('menu');
  const [playerStats, setPlayerStats] = useState<PlayerStats>(getPlayerStats);
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('pvz_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Dave',
          highestLevelUnlocked: parsed.highestLevelUnlocked || 1,
          soundEnabled: parsed.soundEnabled ?? true,
          musicEnabled: parsed.musicEnabled ?? true,
          unlockedAchievements: parsed.unlockedAchievements || [],
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Dave',
      highestLevelUnlocked: 1,
      soundEnabled: true,
      musicEnabled: true,
      unlockedAchievements: [],
    };
  });

  const [achievementToast, setAchievementToast] = useState<string | null>(null);

  const [saveGames, setSaveGames] = useState<SaveGame[]>(() => {
    const saved = localStorage.getItem('pvz_saved_games');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentLevelNum, setCurrentLevelNum] = useState<number>(1);
  const [activeSave, setActiveSave] = useState<SaveGame | null>(null);
  const [gameKey, setGameKey] = useState<number>(0);
  const [isTesterMode, setIsTesterMode] = useState<boolean>(false);

  // Unlock achievement handler
  const unlockAchievement = useCallback((id: string) => {
    setProfile((prev) => {
      const current = prev.unlockedAchievements || [];
      if (current.includes(id)) return prev;

      const updated = [...current, id];
      const ach = ALL_ACHIEVEMENTS.find((a) => a.id === id);
      if (ach) {
        soundFx.playVictory();
        setAchievementToast(ach.title);
        setTimeout(() => setAchievementToast(null), 4000);
      }
      return {
        ...prev,
        unlockedAchievements: updated,
      };
    });
  }, []);

  // Automatically check level 6 unlocked achievement
  useEffect(() => {
    if (profile.highestLevelUnlocked >= 6) {
      unlockAchievement('outback_hero');
    }
  }, [profile.highestLevelUnlocked, unlockAchievement]);

  // Main Menu Outback Theme ("G'day Neighbour") lifecycle
  useEffect(() => {
    if (stage === 'menu' || stage === 'profile_modal' || stage === 'level_select' || stage === 'load_game_modal') {
      outbackMusic.play('menu');
    }
  }, [stage]);

  // Current playing board transient state for saving
  const [gameStateToSave, setGameStateToSave] = useState<{
    plants: PlantedPlant[];
    zombies: Zombie[];
    sun: number;
  }>({ plants: [], zombies: [], sun: 150 });

  const handleStateUpdate = useCallback((plants: PlantedPlant[], zombies: Zombie[], sun: number) => {
    setGameStateToSave({ plants, zombies, sun });
  }, []);

  // Save profile & saveGames to LocalStorage
  useEffect(() => {
    localStorage.setItem('pvz_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('pvz_saved_games', JSON.stringify(saveGames));
  }, [saveGames]);

  // Start new game - resets level progression, trophies, and almanac back to initial level 1 state
  const handleNewGame = () => {
    setProfile((prev) => ({
      ...prev,
      highestLevelUnlocked: 1,
      unlockedAchievements: [],
    }));
    setCurrentLevelNum(1);
    setActiveSave(null);
    setGameKey((prev) => prev + 1);
    setStage('playing');
  };

  // Start selected level without resetting user trophies
  const handleStartLevel = (levelNum: number, isTester = false) => {
    setIsTesterMode(isTester);
    setCurrentLevelNum(levelNum);
    setActiveSave(null);
    setGameKey((prev) => prev + 1);
    setStage('playing');
  };

  // Load a saved game
  const handleLoadSave = (save: SaveGame) => {
    setActiveSave(save);
    setCurrentLevelNum(save.level);
    setGameKey((prev) => prev + 1);
    setStage('playing');
  };

  // Save game state
  const handleSaveGame = () => {
    const newSave: SaveGame = {
      id: `save_${Date.now()}`,
      playerName: profile.name,
      level: currentLevelNum,
      sun: gameStateToSave.sun,
      savedAt: new Date().toLocaleString(),
      plants: gameStateToSave.plants,
      zombies: gameStateToSave.zombies,
      mowers: [],
      zombiesKilled: 0,
      totalZombiesInLevel: LEVELS.find((l) => l.levelNumber === currentLevelNum)?.totalZombies || 10,
    };

    setSaveGames((prev) => [newSave, ...prev]);
    alert('Game saved successfully!');
    setStage('playing');
  };

  // Delete saved game
  const handleDeleteSave = (id: string) => {
    setSaveGames((prev) => prev.filter((s) => s.id !== id));
  };

  // Level Victory Handler
  const handleLevelVictory = () => {
    const nextLevel = currentLevelNum + 1;
    setProfile((prev) => ({
      ...prev,
      highestLevelUnlocked: Math.max(prev.highestLevelUnlocked, Math.min(12, nextLevel)),
    }));
    setStage('victory');
  };

  const currentLevelConfig = LEVELS.find((l) => l.levelNumber === currentLevelNum) || LEVELS[0];

  return (
    <div className="w-full min-h-screen bg-stone-950 flex flex-col items-center justify-start font-serif select-none overflow-x-auto overflow-y-auto p-2 sm:p-4">
      {/* Achievement Unlocked Popup Toast */}
      {achievementToast && (
        <div className="fixed top-6 right-6 z-50 bg-amber-950/95 border-4 border-yellow-400 rounded-2xl px-6 py-3 text-amber-100 shadow-[0_0_30px_rgba(250,204,21,0.8)] flex items-center gap-3 animate-bounce">
          <div className="w-8 h-8 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <polygon points="16,94 84,94 76,82 24,82" fill="#b45309" stroke="#78350f" strokeWidth="2" />
              <rect x="24" y="74" width="52" height="8" fill="#d97706" stroke="#fef08a" strokeWidth="2" rx="1" />
              <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
              <path d="M 24 30 C 24 62 76 62 76 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
              <ellipse cx="50" cy="30" rx="26" ry="8" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
              <path d="M 24 34 C 8 34 6 18 26 20" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M 76 34 C 92 34 94 18 74 20" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold text-yellow-300 uppercase tracking-widest">
              ACHIEVEMENT UNLOCKED!
            </div>
            <div className="text-lg font-black text-white drop-shadow">
              {achievementToast}
            </div>
          </div>
        </div>
      )}

      {/* App Main Container (Responsive canvas with scrollability support) */}
      <div className="relative w-full max-w-[1280px] min-w-[960px] min-h-[720px] bg-slate-900 shadow-2xl rounded-2xl border-2 border-amber-900/60 overflow-hidden flex flex-col my-auto">
        {/* Stage 1: Main Menu */}
        {stage === 'menu' && (
          <MainMenu
            playerName={profile.name}
            highestLevelUnlocked={profile.highestLevelUnlocked}
            unlockedAchievements={profile.unlockedAchievements}
            playerStats={playerStats}
            onChangeProfile={() => setStage('profile_modal')}
            onSelectLevel={() => setStage('level_select')}
            onNewGame={handleNewGame}
            onLoadGame={() => setStage('load_game_modal')}
            onExit={() => alert('Thanks for playing Plants vs Zombies!')}
            onStartSecretGlitchLevel={() => handleStartLevel(99)}
          />
        )}

        {/* Stage 2: Profile Modal */}
        {stage === 'profile_modal' && (
          <ProfileModal
            currentName={profile.name}
            onSave={(newName) => {
              setProfile((prev) => ({ ...prev, name: newName }));
              setStage('menu');
            }}
            onClose={() => setStage('menu')}
          />
        )}

        {/* Stage 3: Level Select */}
        {stage === 'level_select' && (
          <LevelSelect
            levels={LEVELS}
            highestLevelUnlocked={profile.highestLevelUnlocked}
            unlockedAchievements={profile.unlockedAchievements}
            playerName={profile.name}
            onSelectLevel={(levelNum) => handleStartLevel(levelNum)}
            onAdminUnlockAll={() =>
              setProfile((prev) => ({ ...prev, highestLevelUnlocked: LEVELS.length }))
            }
            onAdminLockAll={() =>
              setProfile((prev) => ({ ...prev, highestLevelUnlocked: 1 }))
            }
            onUnlockCheatBaby={() => unlockAchievement('cheated_like_a_baby')}
            onUnlockTrophyExe={() => unlockAchievement('trophy_exe')}
            onUnlockAllAchievements={() => {
              ALL_ACHIEVEMENTS.forEach((a) => {
                if (a.id !== 'punch_coded_gut') {
                  unlockAchievement(a.id);
                }
              });
            }}
            onUnlockMeatcan={() => unlockAchievement('unlocked_meatcan')}
            onGrantPetals={() => {
              const { stats } = grantPetalsCheat();
              setPlayerStats(stats);
            }}
            onStartSecretGlitchLevel={(isTester) => handleStartLevel(99, isTester)}
            onBack={() => setStage('menu')}
          />
        )}

        {/* Stage 4: Load Game Modal */}
        {stage === 'load_game_modal' && (
          <LoadGameModal
            saveGames={saveGames}
            onLoadSave={(save) => handleLoadSave(save)}
            onDeleteSave={(id) => handleDeleteSave(id)}
            onClose={() => setStage('menu')}
          />
        )}

        {/* Stage 5: Playing Game */}
        {(stage === 'playing' || stage === 'paused') && (
          <GameBoard
            key={`game_${currentLevelNum}_${gameKey}`}
            level={currentLevelConfig}
            allPlants={ALL_PLANTS}
            initialSun={activeSave ? activeSave.sun : 150}
            initialPlants={activeSave ? activeSave.plants : []}
            initialZombies={activeSave ? activeSave.zombies : []}
            unlockedAchievements={profile.unlockedAchievements}
            unlockAchievement={unlockAchievement}
            isTesterMode={isTesterMode}
            isPaused={stage === 'paused'}
            playerStats={playerStats}
            onStatsUpdate={(newStats) => setPlayerStats(newStats)}
            onPause={() => setStage('paused')}
            onVictory={handleLevelVictory}
            onGameOver={() => setStage('game_over')}
            onStateUpdate={handleStateUpdate}
          />
        )}

        {/* Pause Overlay */}
        {stage === 'paused' && (
          <PauseMenu
            onResume={() => {
              outbackMusic.resume();
              setStage('playing');
            }}
            onSave={handleSaveGame}
            onRestart={() => {
              outbackMusic.stop();
              handleStartLevel(currentLevelNum);
            }}
            onMainMenu={() => {
              outbackMusic.stop();
              setStage('menu');
            }}
          />
        )}

        {/* Victory Screen Modal */}
        {stage === 'victory' && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-stone-900 border-4 border-amber-500 rounded-3xl shadow-2xl p-6 text-stone-200 flex flex-col items-center text-center">
              <h1 className="text-4xl font-black text-lime-400 tracking-wider uppercase mb-2 drop-shadow">
                {currentLevelNum === 12 ? 'PRO MODE CONQUERED!' : currentLevelNum === 99 ? 'FINAL BOSS DEFEATED!' : 'VICTORY!'}
              </h1>
              <p className="text-xl text-amber-200 font-bold mb-6">
                {currentLevelNum === 12
                  ? 'You cleared all Pro Void levels and defeated the Void Sandstone Titan!'
                  : currentLevelNum === 99
                  ? 'You defeated Aussie Joe and his Crocodile in the final glitch showdown!'
                  : 'You saved your lawn from the zombies!'}
              </p>

              <div className="bg-stone-800 border-2 border-amber-600 rounded-2xl p-4 w-full mb-6 flex flex-col items-center">
                <span className="text-sm text-stone-400 font-sans uppercase font-bold mb-1">
                  LEVEL COMPLETED
                </span>
                <span className="text-2xl font-black text-amber-300">
                  {currentLevelConfig.name}
                </span>
              </div>

              <div className="flex flex-col gap-3 w-full">
                {currentLevelNum < 12 && (
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      handleStartLevel(currentLevelNum + 1);
                    }}
                    className="w-full py-3.5 bg-gradient-to-b from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 border-2 border-green-400 rounded-2xl text-white font-black text-xl tracking-widest uppercase shadow-xl transition active:scale-95 cursor-pointer"
                  >
                    {currentLevelNum === 6 ? 'ADVANCE TO LEVEL 7 ➔' : `NEXT LEVEL (${currentLevelNum + 1})`}
                  </button>
                )}

                {currentLevelNum === 12 && profile.unlockedAchievements.includes('punch_coded_gut') && (
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      handleStartLevel(99);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:to-red-500 border-2 border-purple-400 rounded-2xl text-white font-black text-xl tracking-widest uppercase shadow-xl transition active:scale-95 animate-pulse cursor-pointer"
                  >
                    ADVANCE TO FINAL LEVEL ➔
                  </button>
                )}

                <button
                  onClick={() => {
                    soundFx.playClick();
                    outbackMusic.stop();
                    setStage('menu');
                  }}
                  className="w-full py-3 bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 border-2 border-amber-400 rounded-2xl text-white font-black text-lg tracking-widest uppercase shadow-xl transition active:scale-95 cursor-pointer"
                >
                  RETURN TO MAIN MENU
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    outbackMusic.stop();
                    setStage('level_select');
                  }}
                  className="w-full py-2.5 bg-gradient-to-b from-stone-700 to-stone-900 hover:from-stone-600 hover:to-stone-800 border-2 border-stone-500 rounded-2xl text-amber-200 font-black text-base tracking-widest uppercase shadow-xl transition active:scale-95 cursor-pointer"
                >
                  LEVEL SELECT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen Modal */}
        {stage === 'game_over' && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-stone-950 border-4 border-red-600 rounded-3xl shadow-2xl p-6 text-stone-200 flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-4xl font-black text-red-600 tracking-wider uppercase mb-3 drop-shadow-[0_4px_4px_rgba(0,0,0,1)] animate-pulse">
                THE ZOMBIES ATE YOUR BRAINS!
              </h1>
              <p className="text-stone-400 font-sans text-sm mb-6">
                Your plants were overrun. Try placing more Grill Flowers early on!
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    outbackMusic.stop();
                    handleStartLevel(currentLevelNum);
                  }}
                  className="w-full py-3.5 bg-gradient-to-b from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 border-2 border-red-500 rounded-2xl text-white font-black text-xl tracking-widest uppercase shadow-xl transition active:scale-95"
                >
                  TRY AGAIN
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    outbackMusic.stop();
                    setStage('menu');
                  }}
                  className="w-full py-3 bg-gradient-to-b from-stone-800 to-stone-950 hover:from-stone-700 hover:to-stone-900 border-2 border-stone-600 rounded-2xl text-amber-200 font-black text-lg tracking-widest uppercase shadow-xl transition active:scale-95"
                >
                  MAIN MENU
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
