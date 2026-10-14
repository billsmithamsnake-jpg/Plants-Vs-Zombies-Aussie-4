import React, { useState } from 'react';
import { ALL_ACHIEVEMENTS, AchievementDef } from '../data/achievementsData';
import { soundFx } from '../utils/audio';
import { AussieJoeDialog } from './AussieJoeDialog';
import { TrophySprite } from './TrophySprite';

interface AchievementsModalProps {
  unlockedAchievements?: string[];
  playerName?: string;
  onClose: () => void;
  onStartSecretGlitchLevel?: () => void;
}

const MAIN_ACHIEVEMENT_IDS = [
  'first_lawn',
  'barbie_master',
  'spud_boom',
  'prawn_collector',
  'vault_interceptor',
  'bucket_crusher',
  'koala_tamer',
  'outback_hero',
  'golden_meat_pie',
  'pro_void_master',
];

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  unlockedAchievements = [],
  playerName = 'Neighbor',
  onClose,
  onStartSecretGlitchLevel,
}) => {
  const [selectedAchievementId, setSelectedAchievementId] = useState<string>(
    ALL_ACHIEVEMENTS[0].id
  );
  const [isShattering, setIsShattering] = useState<boolean>(false);

  const hasAllMain = MAIN_ACHIEVEMENT_IDS.every((id) => unlockedAchievements.includes(id));
  const hasBeatenSecretLevel = unlockedAchievements.includes('punch_coded_gut');
  const [showSecretDialogue, setShowSecretDialogue] = useState<boolean>(hasAllMain && !hasBeatenSecretLevel);

  // Filter achievements: hide secret achievements ('punch_coded_gut' & 'unlocked_meatcan') until unlocked
  const visibleAchievements = ALL_ACHIEVEMENTS.filter((a) => {
    if (a.id === 'punch_coded_gut') return unlockedAchievements.includes('punch_coded_gut');
    if (a.id === 'unlocked_meatcan') return unlockedAchievements.includes('unlocked_meatcan');
    return true;
  });

  const selectedAchievement =
    visibleAchievements.find((a) => a.id === selectedAchievementId) ||
    visibleAchievements[0];

  const isSelectedUnlocked = unlockedAchievements.includes(
    selectedAchievement.id
  );

  const unlockedCount = unlockedAchievements.length;

  const handleStartShatter = () => {
    setShowSecretDialogue(false);
    setIsShattering(true);
    soundFx.playSpudow();
    setTimeout(() => {
      if (onStartSecretGlitchLevel) {
        onStartSecretGlitchLevel();
      } else {
        onClose();
      }
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none font-serif overflow-hidden">
      {/* GLASS SHATTER & MATRIX GLITCH OVERLAY */}
      {isShattering && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center pointer-events-none animate-pulse">
          <div className="absolute inset-0 bg-emerald-950/90 mix-blend-difference animate-ping" />
          {/* Shattered Glass Shards SVG */}
          <svg viewBox="0 0 1000 1000" className="absolute inset-0 w-full h-full stroke-emerald-400 stroke-[3] fill-black/60">
            <polygon points="0,0 450,200 200,600" className="animate-vibrate" />
            <polygon points="450,200 1000,0 700,500" className="animate-vibrate" />
            <polygon points="200,600 700,500 1000,1000" className="animate-vibrate" />
            <polygon points="0,0 200,600 0,1000" className="animate-vibrate" />
            <polygon points="200,600 0,1000 600,800" className="animate-vibrate" />
            <line x1="100" y1="100" x2="900" y2="900" stroke="#f43f5e" strokeWidth="8" />
            <line x1="900" y1="100" x2="100" y2="900" stroke="#f43f5e" strokeWidth="8" />
          </svg>
          <div className="relative z-10 text-center font-mono font-black text-3xl md:text-5xl text-emerald-400 tracking-widest drop-shadow-[0_0_25px_rgba(34,197,94,1)] animate-bounce">
            SYSTEM CRITICAL GLITCH INITIALIZING...
          </div>
        </div>
      )}

      {/* Secret Aussie Joe Dialogue Trigger */}
      {showSecretDialogue && !isShattering && (
        <AussieJoeDialog
          customLines={[
            "Well, you did it... you won. You beat the green men, got every single achievement and beat difficult foes I would not be able to beat.",
            "I know that once I do give you this final achievement, trophy, whatever you call it... you'll leave. I can't stay in this digital outback forever; you can't leave me here!",
            "Tell you what, I have one final thing you must do before you leave this place. Face me in a battle."
          ]}
          onComplete={handleStartShatter}
        />
      )}

      {/* Outback Trophy Cabinet Frame */}
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-[#2b180d] via-[#1a0f07] to-[#120a04] border-8 border-[#633a1c] rounded-3xl shadow-2xl p-6 text-amber-100 flex flex-col max-h-[92vh] overflow-hidden group">
        {/* Subtle Woodgrain Vector Planks Backdrop */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 800 600" className="w-full h-full stroke-amber-900/60 stroke-[1.5] fill-none">
            <line x1="0" y1="100" x2="800" y2="100" strokeDasharray="12,8" />
            <line x1="0" y1="200" x2="800" y2="200" strokeDasharray="16,6" />
            <line x1="0" y1="300" x2="800" y2="300" strokeDasharray="10,10" />
            <line x1="0" y1="400" x2="800" y2="400" strokeDasharray="14,8" />
            <line x1="0" y1="500" x2="800" y2="500" strokeDasharray="18,6" />
            <ellipse cx="200" cy="150" rx="60" ry="15" />
            <ellipse cx="600" cy="350" rx="80" ry="20" />
            <ellipse cx="350" cy="480" rx="50" ry="12" />
          </svg>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between border-b-4 border-amber-900/80 py-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-yellow-400 fill-current drop-shadow">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 003.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
              </svg>
              <h2 className="text-2xl md:text-3xl font-black text-amber-200 tracking-wider uppercase drop-shadow-lg font-serif">
                OUTBACK TROPHY CASE
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-amber-950/90 border border-amber-500/80 px-4 py-1.5 rounded-xl text-xs font-bold text-amber-300 font-mono shadow-xl">
              UNLOCKED: {unlockedCount} / {ALL_ACHIEVEMENTS.length}
            </div>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="w-10 h-10 bg-amber-900/80 hover:bg-red-900/90 border-2 border-amber-500 rounded-full flex items-center justify-center text-amber-100 font-black text-xl shadow-xl cursor-pointer active:scale-95 transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Body: Wooden Shelves (Left) + Detail Card (Right) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden flex-1">
          {/* Left Grid: Rustic Wooden Shelves */}
          <div className="md:col-span-2 bg-gradient-to-b from-[#180e07]/95 via-[#26180c]/95 to-[#190f07]/95 border-4 border-[#4d3018] rounded-2xl p-4 overflow-y-auto max-h-[420px] shadow-2xl flex flex-col gap-4 relative backdrop-blur-xs">
            <div className="grid grid-cols-3 gap-3">
              {visibleAchievements.map((ach) => {
                const isUnlocked = unlockedAchievements.includes(ach.id);
                const isSelected = ach.id === selectedAchievementId;

                return (
                  <button
                    key={ach.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedAchievementId(ach.id);
                    }}
                    className={`relative flex flex-col items-center justify-between p-3 rounded-2xl border-2 transition duration-200 cursor-pointer ${
                      isSelected
                        ? isUnlocked
                          ? ach.tier === 'gold'
                            ? 'bg-amber-900/90 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.6)] scale-105'
                            : ach.tier === 'silver'
                            ? 'bg-slate-900/90 border-slate-300 shadow-[0_0_15px_rgba(203,213,225,0.5)] scale-105'
                            : ach.tier === 'crap'
                            ? 'bg-amber-950/90 border-amber-600 shadow-[0_0_15px_rgba(180,83,9,0.7)] scale-105'
                            : 'bg-amber-950/90 border-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.5)] scale-105'
                          : 'bg-stone-900 border-amber-600 scale-105 shadow-lg'
                        : isUnlocked
                        ? ach.tier === 'gold'
                          ? 'bg-amber-950/60 hover:bg-amber-900/60 border-amber-600/80'
                          : ach.tier === 'silver'
                          ? 'bg-slate-950/60 hover:bg-slate-900/60 border-slate-700/80'
                          : ach.tier === 'crap'
                          ? 'bg-amber-950/80 hover:bg-amber-900/80 border-amber-800'
                          : 'bg-amber-950/40 hover:bg-amber-900/40 border-amber-800/80'
                        : 'bg-stone-950/80 hover:bg-stone-900/80 border-stone-800 opacity-60'
                    }`}
                  >
                    {/* Tier Ribbon Header */}
                    <div className="w-full flex items-center justify-between text-[10px] font-black font-mono mb-1">
                      <span
                        className={
                          isUnlocked
                            ? ach.tier === 'gold'
                              ? 'text-yellow-300'
                              : ach.tier === 'silver'
                              ? 'text-slate-300'
                              : ach.tier === 'crap'
                              ? 'text-amber-500 font-extrabold'
                              : 'text-amber-400'
                            : 'text-stone-500'
                        }
                      >
                        {ach.tier === 'gold'
                          ? 'GOLD'
                          : ach.tier === 'silver'
                          ? 'SILVER'
                          : ach.tier === 'crap'
                          ? 'CRAP'
                          : 'BRONZE'}
                      </span>
                      {isUnlocked ? (
                        <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-lime-400 fill-current">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 20 20" className="w-3 h-3 text-stone-500 fill-current">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    {/* Trophy Display Pedestal */}
                    <div className="w-16 h-16 my-1 bg-stone-950/90 rounded-xl border border-stone-800 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <TrophySprite id={ach.id} isUnlocked={isUnlocked} size="md" />
                    </div>

                    {/* Trophy Label */}
                    <div className="w-full text-center mt-1">
                      <div
                        className={`text-xs font-black truncate ${
                          isUnlocked
                            ? ach.tier === 'gold'
                              ? 'text-yellow-200'
                              : ach.tier === 'silver'
                              ? 'text-slate-200'
                              : 'text-amber-200'
                            : 'text-stone-500'
                        }`}
                      >
                        {isUnlocked ? ach.title : 'Locked Trophy'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Card View with Scrollbar */}
          <div className="bg-[#1b1008] border-4 border-[#3d2513] rounded-2xl p-5 flex flex-col items-center justify-between text-center relative overflow-y-auto max-h-[420px] shadow-2xl">
            {isSelectedUnlocked ? (
              <div className="w-full flex flex-col items-center h-full justify-between gap-3">
                <div className="w-full flex flex-col items-center">
                  {/* Unlocked Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-lime-950/90 border border-lime-500 text-lime-300 font-extrabold text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow">
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>ACHIEVEMENT UNLOCKED</span>
                  </div>

                  {/* Trophy Artwork Frame */}
                  <div
                    className={`w-24 h-24 mx-auto rounded-2xl border-4 flex items-center justify-center mb-3 shadow-2xl overflow-hidden shrink-0 ${
                      selectedAchievement.tier === 'gold'
                        ? 'bg-gradient-to-b from-amber-900 to-yellow-950 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.5)]'
                        : selectedAchievement.tier === 'silver'
                        ? 'bg-slate-900 border-slate-300 shadow-[0_0_20px_rgba(203,213,225,0.4)]'
                        : selectedAchievement.tier === 'crap'
                        ? 'bg-amber-950 border-amber-800 shadow-[0_0_20px_rgba(180,83,9,0.6)]'
                        : 'bg-amber-950 border-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                    }`}
                  >
                    <TrophySprite id={selectedAchievement.id} isUnlocked={true} size="lg" />
                  </div>

                  <h3 className="text-xl font-black text-amber-200 mb-1">
                    {selectedAchievement.title}
                  </h3>

                  <div className="text-[11px] font-mono font-bold text-amber-400 mb-2 uppercase tracking-wider">
                    {selectedAchievement.tier === 'gold'
                      ? 'GOLD TROPHY'
                      : selectedAchievement.tier === 'silver'
                      ? 'SILVER TROPHY'
                      : selectedAchievement.tier === 'crap'
                      ? 'CRAP TROPHY'
                      : 'BRONZE TROPHY'}
                  </div>

                  {/* Scrollable Description Box */}
                  <div className="w-full max-h-36 overflow-y-auto bg-stone-950/90 p-3 rounded-xl border border-stone-800 my-2 text-stone-300 text-xs font-sans leading-relaxed text-left shadow-inner">
                    <p className="italic font-medium">
                      "{selectedAchievement.description.replace('{PROFILE_NAME}', playerName)}"
                    </p>
                  </div>
                </div>

                <div className="w-full bg-amber-950/60 border border-amber-800/80 p-2 rounded-xl text-xs text-lime-400 font-extrabold shrink-0 mt-2">
                  Accomplished in your Outback Journey!
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center h-full justify-between gap-3">
                <div className="w-full flex flex-col items-center">
                  {/* Locked Badge */}
                  <div className="inline-flex items-center gap-1.5 bg-stone-900 border border-stone-700 text-stone-400 font-extrabold text-[11px] font-mono px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-current">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>LOCKED TROPHY</span>
                  </div>

                  {/* Silhouetted Frame */}
                  <div className="w-24 h-24 mx-auto bg-stone-950 border-4 border-stone-800 rounded-2xl flex flex-col items-center justify-center mb-3 text-stone-700 shadow-inner shrink-0">
                    <TrophySprite id={selectedAchievement.id} isUnlocked={false} size="lg" />
                  </div>

                  <h3 className="text-xl font-black text-stone-400 mb-1">
                    ??? (Locked Trophy)
                  </h3>

                  <div className="text-[11px] font-mono font-bold text-stone-500 mb-2 uppercase tracking-wider">
                    HOW TO UNLOCK THIS TROPHY
                  </div>

                  {/* Scrollable Requirement Box */}
                  <div className="w-full max-h-36 overflow-y-auto bg-amber-950/80 p-3 rounded-xl border-2 border-amber-700/80 shadow-inner text-amber-200 text-xs font-sans font-extrabold leading-relaxed text-left my-2">
                    <p>{selectedAchievement.howToGet}</p>
                  </div>
                </div>

                <div className="w-full bg-stone-950/80 border border-stone-800 p-2 rounded-xl text-xs text-stone-500 font-bold shrink-0 mt-2">
                  Complete this task to place this trophy on your cabinet!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
