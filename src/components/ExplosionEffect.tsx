import React from 'react';
import { VisualEffect } from '../types';

interface ExplosionEffectProps {
  effect: VisualEffect;
}

export const ExplosionEffect: React.FC<ExplosionEffectProps> = ({ effect }) => {
  if (effect.type === 'spudow') {
    // Lemon Mine Sour Detonation Blast & Citrus Shockwaves (Zero Text)
    return (
      <div
        className="absolute pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${effect.x + 35}px`,
          top: `${effect.y + 35}px`,
          width: '180px',
          height: '180px',
        }}
      >
        {/* Outer Expanding Lemon Shockwave Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400/90 animate-ping opacity-85" />
        <div className="absolute inset-2 rounded-full border-2 border-amber-500/70 animate-ping opacity-70 [animation-delay:100ms]" />

        {/* Dynamic Lemon Mine SVG Blast & Citrus Debris */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-[spin_0.8s_ease-out_infinite]"
        >
          <defs>
            <radialGradient id="lemonBlastCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#facc15" stopOpacity="0.9" />
              <stop offset="80%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="smokeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#78350f" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#451a03" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1c1917" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Smoke Clouds */}
          <circle cx="35" cy="40" r="22" fill="url(#smokeGlow)" className="animate-pulse" />
          <circle cx="65" cy="45" r="20" fill="url(#smokeGlow)" className="animate-pulse" />
          <circle cx="50" cy="65" r="24" fill="url(#smokeGlow)" className="animate-pulse" />

          {/* Central Lemon Fiery Core Flash */}
          <circle cx="50" cy="50" r="32" fill="url(#lemonBlastCore)" />

          {/* Jagged Citrus Burst Spikes */}
          <polygon points="50,12 54,28 66,20 58,34 74,36 60,46 70,60 54,55 50,70 46,55 30,60 40,46 26,36 42,34 34,20 46,28" fill="#fef08a" opacity="0.95" />

          {/* Flying Lemon Slice / Citrus Pulp Shrapnel */}
          {/* Lemon Wedge 1 */}
          <path d="M 22 25 A 8 8 0 0 1 32 35 L 22 35 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          {/* Lemon Wedge 2 */}
          <path d="M 76 26 A 8 8 0 0 1 86 36 L 76 36 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          {/* Flying Dirt & Lemon Sparks */}
          <circle cx="78" cy="72" r="4.5" fill="#78350f" />
          <circle cx="22" cy="75" r="3.5" fill="#b45309" />
          <circle cx="50" cy="88" r="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="50" cy="10" r="3" fill="#fef08a" />
          <circle cx="84" cy="52" r="2.5" fill="#fde047" />
          <circle cx="16" cy="50" r="2.5" fill="#fde047" />
        </svg>
      </div>
    );
  }

  if (effect.type === 'boom') {
    // Cherry Bomb / Rotten Baby Tomato Fiery Cross Explosion Blast (Zero Text)
    return (
      <div
        className="absolute pointer-events-none z-40 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${effect.x + 35}px`,
          top: `${effect.y + 35}px`,
          width: '160px',
          height: '160px',
        }}
      >
        {/* Expanding High-Intensity Fireball Wave */}
        <div className="absolute inset-0 rounded-full bg-radial from-amber-200 via-orange-500 to-red-600 animate-ping opacity-85" />
        <div className="absolute inset-4 rounded-full border-4 border-yellow-300 animate-pulse opacity-90" />

        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.9)]">
          <defs>
            <radialGradient id="fireCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="80%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Jagged Flame Burst Petals */}
          <path
            d="M 50,5 Q 58,30 75,18 Q 68,36 90,38 Q 72,50 92,68 Q 68,66 70,92 Q 52,74 50,95 Q 48,74 30,92 Q 32,66 8,68 Q 28,50 10,38 Q 32,36 25,18 Q 42,30 50,5 Z"
            fill="url(#fireCore)"
            className="animate-pulse"
          />

          {/* Inner Incandescent White/Yellow Hotspot */}
          <circle cx="50" cy="50" r="18" fill="#ffffff" opacity="0.95" />
          <circle cx="50" cy="50" r="26" fill="#fde047" opacity="0.8" />

          {/* Flying Hot Ember Sparks */}
          <circle cx="30" cy="22" r="3" fill="#fef08a" />
          <circle cx="70" cy="24" r="2.5" fill="#fde047" />
          <circle cx="78" cy="62" r="3.5" fill="#f97316" />
          <circle cx="24" cy="68" r="2.5" fill="#fef08a" />
          <circle cx="50" cy="82" r="3" fill="#f97316" />
        </svg>
      </div>
    );
  }

  // Splat / Leaf / Smoke burst for hit impact (Zero Text)
  return (
    <div
      className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${effect.x + 20}px`,
        top: `${effect.y + 20}px`,
        width: '60px',
        height: '60px',
      }}
    >
      <div className="w-full h-full rounded-full bg-lime-400/40 animate-ping opacity-60" />
      <svg viewBox="0 0 40 40" className="w-full h-full">
        <circle cx="20" cy="20" r="10" fill="#84cc16" opacity="0.75" />
        <circle cx="12" cy="14" r="4" fill="#a3e635" opacity="0.85" />
        <circle cx="28" cy="16" r="3.5" fill="#65a30d" opacity="0.85" />
        <circle cx="20" cy="28" r="4" fill="#4d7c0f" opacity="0.85" />
      </svg>
    </div>
  );
};
