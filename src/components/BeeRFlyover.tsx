import React, { useEffect } from 'react';

export const BeeRSprite: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} overflow="visible">
      <defs>
        <radialGradient id="beerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beerLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Aura Glow */}
      <circle cx="60" cy="60" r="54" fill="url(#beerGlow)" />

      {/* Bee Wings (Fluttering behind) */}
      <g className="animate-pulse origin-center">
        {/* Left Wing Top */}
        <ellipse
          cx="28"
          cy="32"
          rx="22"
          ry="10"
          fill="url(#wingGrad)"
          stroke="#60a5fa"
          strokeWidth="1.5"
          transform="rotate(-35 28 32)"
        />
        {/* Left Wing Bottom */}
        <ellipse
          cx="30"
          cy="42"
          rx="16"
          ry="7"
          fill="url(#wingGrad)"
          stroke="#60a5fa"
          strokeWidth="1.2"
          transform="rotate(-20 30 42)"
        />
        {/* Right Wing Top */}
        <ellipse
          cx="92"
          cy="32"
          rx="22"
          ry="10"
          fill="url(#wingGrad)"
          stroke="#60a5fa"
          strokeWidth="1.5"
          transform="rotate(35 92 32)"
        />
        {/* Right Wing Bottom */}
        <ellipse
          cx="90"
          cy="42"
          rx="16"
          ry="7"
          fill="url(#wingGrad)"
          stroke="#60a5fa"
          strokeWidth="1.2"
          transform="rotate(20 90 42)"
        />
      </g>

      {/* Beer Mug Handle */}
      <path
        d="M 80 44 C 104 44 104 84 80 84"
        fill="none"
        stroke="#92400e"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M 80 44 C 102 44 102 84 80 84"
        fill="none"
        stroke="#fde047"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Beer Mug Body (The Bee Torso) */}
      <rect
        x="32"
        y="36"
        width="50"
        height="56"
        rx="12"
        fill="url(#beerLiquid)"
        stroke="#78350f"
        strokeWidth="3.5"
      />

      {/* Bee Black Stripes across Beer Mug */}
      <rect x="32.5" y="48" width="49" height="9" fill="#1c1917" opacity="0.95" />
      <rect x="32.5" y="66" width="49" height="9" fill="#1c1917" opacity="0.95" />

      {/* Carbonation Bubbles in Beer */}
      <circle cx="42" cy="78" r="2.5" fill="#fef08a" opacity="0.8" />
      <circle cx="64" cy="80" r="3" fill="#fef08a" opacity="0.8" />
      <circle cx="54" cy="62" r="2" fill="#fef08a" opacity="0.8" />
      <circle cx="46" cy="42" r="2.5" fill="#fef08a" opacity="0.8" />

      {/* Bee Sharp Stinger at bottom */}
      <polygon points="57,92 50,105 64,92" fill="#1c1917" stroke="#78350f" strokeWidth="1" />
      <polygon points="57,94 51,103 62,94" fill="#fbbf24" opacity="0.6" />

      {/* Frothy Beer Foam Head (Thick Whipped Creamy Top) */}
      <g>
        <ellipse cx="57" cy="36" rx="28" ry="11" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        <circle cx="40" cy="30" r="9" fill="#ffffff" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="57" cy="27" r="11" fill="#ffffff" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="74" cy="30" r="9" fill="#ffffff" stroke="#fef08a" strokeWidth="1.5" />
        {/* Foam Drips down the glass */}
        <path d="M 46 36 Q 48 44 49 46 Q 51 44 52 36" fill="#ffffff" />
        <path d="M 64 36 Q 66 45 68 46 Q 69 44 71 36" fill="#ffffff" />
      </g>

      {/* Bee Antennae curling out of foam */}
      <g>
        <path
          d="M 48 20 Q 42 8 32 10"
          stroke="#1c1917"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="32" cy="10" r="3.5" fill="#eab308" stroke="#1c1917" strokeWidth="1.5" />

        <path
          d="M 66 20 Q 72 8 82 10"
          stroke="#1c1917"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="82" cy="10" r="3.5" fill="#eab308" stroke="#1c1917" strokeWidth="1.5" />
      </g>

      {/* Cool Aussie Sunglasses on the Bee-R Face */}
      <g>
        {/* Left lens */}
        <path
          d="M 41 50 L 51 50 Q 52 57 46 57 Q 40 57 41 50 Z"
          fill="#09090b"
          stroke="#27272a"
          strokeWidth="1.5"
        />
        {/* Right lens */}
        <path
          d="M 57 50 L 67 50 Q 68 57 62 57 Q 56 57 57 50 Z"
          fill="#09090b"
          stroke="#27272a"
          strokeWidth="1.5"
        />
        {/* Bridge */}
        <line x1="51" y1="52" x2="57" y2="52" stroke="#27272a" strokeWidth="2" />
        {/* Lens reflection highlights */}
        <line x1="43" y1="52" x2="48" y2="55" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <line x1="59" y1="52" x2="64" y2="55" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
      </g>

      {/* Determined Aussie Smirk */}
      <path
        d="M 50 63 Q 56 66 61 62"
        fill="none"
        stroke="#1c1917"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface BeeRFlyoverProps {
  onComplete: () => void;
}

export const BeeRFlyover: React.FC<BeeRFlyoverProps> = ({ onComplete }) => {
  useEffect(() => {
    // Total animation lasts 2.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden select-none">
      {/* Amber sonic shockwave screen flash */}
      <div className="absolute inset-0 bg-amber-500/20 animate-pulse duration-300" />

      {/* Massive Sweeping Bee-R Container flying across */}
      <div
        className="absolute top-1/3 w-[260px] h-[260px] filter drop-shadow-[0_0_50px_rgba(245,158,11,1)]"
        style={{
          animation: 'beeRFlight 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}
      >
        {/* Trailing Froth & Sonic Lines */}
        <div className="absolute top-1/2 -left-36 transform -translate-y-1/2 flex items-center gap-1 opacity-80">
          <div className="w-48 h-5 bg-gradient-to-r from-transparent via-amber-400 to-yellow-300 rounded-full blur-[2px]" />
          <div className="w-24 h-3 bg-gradient-to-r from-transparent to-white rounded-full blur-[1px]" />
        </div>

        {/* Floating Flying Text Banner */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-amber-950/95 border-2 border-yellow-400 text-yellow-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-2xl whitespace-nowrap animate-bounce">
          ⚡ BUZZZZ! HAVE A COLD ONE! 🍺
        </div>

        {/* The Giant Bee-R Sprite */}
        <BeeRSprite className="w-full h-full transform hover:scale-105" />

        {/* Spraying Beer Bubbles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl animate-ping opacity-75">🫧</span>
        </div>
      </div>

      <style>{`
        @keyframes beeRFlight {
          0% {
            left: -320px;
            top: 45%;
            transform: scale(0.6) rotate(15deg);
          }
          30% {
            left: 20%;
            top: 25%;
            transform: scale(1.1) rotate(-8deg);
          }
          60% {
            left: 55%;
            top: 40%;
            transform: scale(1.2) rotate(10deg);
          }
          85% {
            left: 85%;
            top: 20%;
            transform: scale(1.1) rotate(-5deg);
          }
          100% {
            left: 110%;
            top: 35%;
            transform: scale(0.9) rotate(20deg);
          }
        }
      `}</style>
    </div>
  );
};
