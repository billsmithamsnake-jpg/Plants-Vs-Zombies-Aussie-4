import React, { useEffect, useState } from 'react';
import { soundFx } from '../utils/audio';
import { AussieJoeVector } from './AussieJoeVector';

export const AUSSIE_JOE_LEVEL_DIALOGUES: Record<number, string[]> = {
  1: [
    "G'day neighbour! My name is Aussie Joe and I'm the cousin of Crazy Dave who lives all the way over in America.",
    "Now, there's been some strange green fellows that keep on trying to eat my meat pies and my brains, so I need you to stop them!",
    "Here's some plant packets free of charge and get cracking, speaking of which I'll crack open a can for myself while you do all the work. Thanks!",
  ],
  2: [
    "I leave my cones out for one day and they steal them!",
    "Bloody cone-stealing green bean looking bros!",
  ],
  3: [
    "Careful neighbour! They have poles those moles, put them in holes inside the ground.",
    "I'm a great rhymer.",
  ],
  4: [
    "My grandma sent me some koala onesies however they were all extra small, so I threw them out.",
    "They dug threw my trash and put it on, I heard they hate being frozen.",
  ],
  5: [
    "They have some flags I bought for International Flag Day until I forgot about the holiday and just used them to mark golf holes.",
  ],
  6: [
    "Is it just me or do I feel the earth start to move and quake?",
    "Never mind, I'll just go eat some pie.",
  ],
  7: [
    "G'day neighbour! Welcome to PRO MODE! These void-infected zombies are twice as tough and twice as angry!",
    "I was digging through a random garage sale last year and found these bizarre tree seeds, and I completely forgot about 'em until right now!",
    "It's the Mini Eucalyptus Tree! It costs 400 prawns, has 1,000 HP, and fires mini eucalyptus leaves across ALL 5 lanes simultaneously every 4.5 seconds!",
    "Because shooting in 5 lanes is super painful for the tree, it loses 5 HP every time it fires and deals solid leaf damage! Plus, you can only have ONE on the field at a time!",
    "Oh, and Koala Imps CANNOT resist eucalyptus — any leaf instantly pulverizes Koala Imps! I'm tucking it into a temporary 7th seed slot for you right now ready to place! Use it wisely against these brutal void waves!",
  ],
};

export const AUSSIE_JOE_VICTORY_DIALOGUE = [
  "Congratulations! Those green guys are gone for now, here's a special item for helping me neighbour.",
];

export const AUSSIE_JOE_ROAST_DIALOGUE = [
  "STREWTH MATE! What in the name of the outback did I just witness?! ONE HUNDRED AND FIFTY DEAD PLANTS?!",
  "Look at your lawn, cobber! Your Grill Flowers are burnt to a crisp like dropped snag sausages, and your Peashooters couldn't hit a sleeping wombat!",
  "You've been serving up a gourmet five-course salad buffet for these green blokes! Even a blind drop bear could defend a backyard better than that!",
  "I can't bear to watch any more of me beloved Australian flora get chewed into mulch... It's making me eyes water!",
  "So listen here: take this secret brew from me personal stash. It's the BEE-R — a massive, buzzing bee shaped like a cold frothy beer with a sting like 10,000 volts!",
  "Whenever you're getting overrun like a total rookie, tap the Bee-R icon at your bottom right corner. That massive bad boy will swoop across, buzz through every lane, and wipe every single zombie off your lawn!",
  "It goes on cooldown for a full minute after each flight, so don't be wasting it! Now stop feeding me garden to the dead and put this bad boy to work!",
];

interface AussieJoeDialogProps {
  levelNumber?: number;
  customLines?: string[];
  isVictoryReward?: boolean;
  onComplete: () => void;
}

export const AussieJoeDialog: React.FC<AussieJoeDialogProps> = React.memo(({
  levelNumber = 1,
  customLines,
  isVictoryReward = false,
  onComplete,
}) => {
  const lines = customLines || AUSSIE_JOE_LEVEL_DIALOGUES[levelNumber] || [
    "G'day mate! Protect me lawn from those pesky Outback zombies!",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    soundFx.playClick();
    if (currentIndex < lines.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, lines]);

  const currentText = lines[currentIndex];
  const isLastLine = currentIndex === lines.length - 1;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm pointer-events-auto select-none font-serif">
      <div
        onClick={handleNext}
        className="relative w-full max-w-3xl bg-stone-900/95 border-4 border-amber-600 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 overflow-hidden cursor-pointer group transform transition duration-200 hover:border-amber-400"
      >
        {/* Aussie Joe Character Illustration Column */}
        <div className="relative shrink-0 w-44 md:w-56 h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-amber-950/60 via-amber-900/40 to-stone-950 border-2 border-amber-600/80 p-2 shadow-inner">
          <AussieJoeVector className="w-full h-full transform group-hover:scale-105 transition-transform duration-300 filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.9)]" />
          {/* Joe Badge Overlay */}
          <div className="absolute top-2 left-2 bg-amber-950/90 border border-amber-500 rounded-lg px-2 py-0.5 text-[10px] font-black text-amber-300 uppercase tracking-widest shadow">
            AUSSIE JOE
          </div>
        </div>

        {/* Speech Bubble Column */}
        <div className="relative flex-1 flex flex-col justify-between w-full h-full min-h-[180px] md:min-h-[220px]">
          {/* Jagged Clay Speech Bubble Container */}
          <div className="relative w-full flex-1 bg-[#fbf6e9] border-8 border-[#a84428] rounded-[2rem] p-5 shadow-2xl flex flex-col justify-between text-stone-900 relative">
            {/* Pointer / Tail of Speech Bubble */}
            <div className="hidden md:block absolute -left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[14px] border-t-transparent border-r-[22px] border-r-[#a84428] border-b-[14px] border-b-transparent" />

            {/* Bubble Header */}
            <div className="flex items-center justify-between border-b-2 border-amber-800/30 pb-1.5 mb-2">
              <span className="text-[11px] font-black text-[#8b3117] tracking-widest uppercase font-mono">
                {isVictoryReward ? 'OUTBACK VICTORY!' : `LEVEL ${levelNumber} INTRO`}
              </span>
              <span className="text-[11px] font-bold text-amber-900/80 font-mono">
                {currentIndex + 1} / {lines.length}
              </span>
            </div>

            {/* Dialogue Body Text */}
            <p className="text-base md:text-lg font-extrabold text-stone-900 leading-relaxed tracking-wide my-auto italic max-h-52 overflow-y-auto pr-1">
              "{currentText}"
            </p>

            {/* Bottom Controls - Compact button with no space/click text */}
            <div className="flex items-center justify-end pt-3 mt-2 border-t-2 border-amber-800/20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className={`px-3 py-1.5 rounded-lg text-white font-black text-xs uppercase tracking-wider shadow transform active:scale-95 transition ${
                  isLastLine
                    ? isVictoryReward
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-stone-950 border border-yellow-200 animate-pulse'
                      : 'bg-gradient-to-r from-lime-600 to-green-700 hover:from-lime-500 hover:to-green-600 border border-lime-300'
                    : 'bg-gradient-to-r from-[#b34020] to-[#882b13] hover:from-[#a03619] hover:to-[#77230e] border border-amber-400/50'
                }`}
              >
                {isLastLine
                  ? isVictoryReward
                    ? 'CLAIM TROPHY! ★'
                    : "LET'S PLAY! ►"
                  : 'NEXT ►'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});


