import React from 'react';

interface TrophySpriteProps {
  id: string;
  isUnlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TrophySprite: React.FC<TrophySpriteProps> = React.memo(({
  id,
  isUnlocked = true,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  if (!isUnlocked) {
    return (
      <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Dark Stone Pedestal */}
          <polygon points="20,92 80,92 75,80 25,80" fill="#1c1917" stroke="#292524" strokeWidth="2" />
          <rect x="28" y="72" width="44" height="8" fill="#292524" stroke="#44403c" strokeWidth="1.5" rx="1" />
          
          {/* Silhouette Trophy Body */}
          <path d="M 35 72 L 40 45 Q 25 42 22 28 Q 22 18 35 18 L 65 18 Q 78 18 78 28 Q 75 42 60 45 L 65 72 Z" fill="#1c1917" stroke="#44403c" strokeWidth="2" />
          
          {/* Heavy Chains wrapped around */}
          <path d="M 24 35 Q 50 50 76 35" stroke="#78716c" strokeWidth="3" strokeDasharray="5,3" fill="none" />
          <path d="M 26 50 Q 50 65 74 50" stroke="#78716c" strokeWidth="3" strokeDasharray="5,3" fill="none" />

          {/* Sturdy Padlock */}
          <rect x="38" y="38" width="24" height="20" rx="4" fill="#57534e" stroke="#78716c" strokeWidth="2" />
          {/* Shackle */}
          <path d="M 43 38 L 43 28 Q 50 20 57 28 L 57 38" stroke="#a8a29e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Keyhole */}
          <circle cx="50" cy="46" r="2.5" fill="#1c1917" />
          <polygon points="48.5,46 51.5,46 52,53 48,53" fill="#1c1917" />
        </svg>
      </div>
    );
  }

  switch (id) {
    case 'first_lawn':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Bronze Pedestal */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#92400e" stroke="#b45309" strokeWidth="1.5" rx="1" />
            {/* Nameplate */}
            <rect x="34" y="86" width="32" height="5" fill="#d97706" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#451a03" fontSize="4" fontWeight="900" fontFamily="monospace">LVL 1</text>

            {/* Bronze Stem & Base */}
            <path d="M 44 74 L 44 58 L 56 58 L 56 74 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <ellipse cx="50" cy="58" rx="14" ry="4" fill="#d97706" />

            {/* Bronze Cup with Rim */}
            <path d="M 28 22 C 28 50 72 50 72 22 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <path d="M 32 24 C 32 46 68 46 68 24 Z" fill="#d97706" />
            <ellipse cx="50" cy="22" rx="22" ry="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />

            {/* Bronze Cup Handles */}
            <path d="M 28 26 C 12 26 12 44 29 44" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 28 26 C 12 26 12 44 29 44" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M 72 26 C 88 26 88 44 71 44" stroke="#d97706" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 72 26 C 88 26 88 44 71 44" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Glowing Sunrise arc inside cup */}
            <path d="M 36 22 Q 50 10 64 22 Z" fill="#fef08a" opacity="0.8" />

            {/* Fresh Lawn Sprout emerging */}
            {/* Dirt Mound in cup */}
            <ellipse cx="50" cy="22" rx="16" ry="4" fill="#451a03" />
            {/* Stem */}
            <path d="M 50 22 Q 50 10 50 2" stroke="#16a34a" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            {/* Left Leaf */}
            <path d="M 50 12 Q 34 8 36 2 Q 46 4 50 12 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            {/* Right Leaf */}
            <path d="M 50 8 Q 66 4 64 -2 Q 54 2 50 8 Z" fill="#4ade80" stroke="#15803d" strokeWidth="1" />
            {/* Dew drop */}
            <circle cx="60" cy="1" r="1.5" fill="#e0f2fe" />
          </svg>
        </div>
      );

    case 'barbie_master':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Bronze Pedestal */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#92400e" stroke="#b45309" strokeWidth="1.5" rx="1" />
            <rect x="34" y="86" width="32" height="5" fill="#f97316" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#fff" fontSize="3.5" fontWeight="900" fontFamily="monospace">BARBIE</text>

            {/* Bronze Stand */}
            <path d="M 45 74 L 47 52 L 53 52 L 55 74 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />

            {/* Kettle BBQ Grill Trophy Body */}
            <ellipse cx="50" cy="52" rx="26" ry="12" fill="#27272a" stroke="#78350f" strokeWidth="3" />
            <path d="M 24 52 C 24 74 76 74 76 52 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <path d="M 28 54 C 28 70 72 70 72 54 Z" fill="#ea580c" opacity="0.3" />

            {/* Flaming Embers Core */}
            <ellipse cx="50" cy="50" rx="22" ry="8" fill="#ea580c" />
            <ellipse cx="50" cy="50" rx="16" ry="5" fill="#facc15" />

            {/* Metal Grill Grate Bars */}
            <line x1="32" y1="47" x2="68" y2="47" stroke="#71717a" strokeWidth="2" />
            <line x1="30" y1="50" x2="70" y2="50" stroke="#71717a" strokeWidth="2" />
            <line x1="34" y1="53" x2="66" y2="53" stroke="#71717a" strokeWidth="2" />

            {/* Roaring BBQ Flames */}
            <path d="M 38 48 Q 32 30 42 22 Q 44 32 48 26 Q 52 14 56 22 Q 62 10 68 28 Q 62 36 60 48 Z" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" />
            <path d="M 44 48 Q 42 35 48 30 Q 52 24 54 32 Q 58 22 62 34 Q 56 42 54 48 Z" fill="#fde047" />

            {/* Crossed Bronze Tongs & Fork in background */}
            <line x1="20" y1="20" x2="42" y2="48" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
            <line x1="80" y1="20" x2="58" y2="48" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
            {/* Sparks */}
            <circle cx="36" cy="18" r="1.5" fill="#fef08a" />
            <circle cx="64" cy="12" r="2" fill="#f97316" />
          </svg>
        </div>
      );

    case 'spud_boom':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            <defs>
              <linearGradient id="trophyLemonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <linearGradient id="trophyLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>

            {/* Bronze Pedestal */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#92400e" stroke="#b45309" strokeWidth="1.5" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#b45309" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#fef08a" fontSize="3" fontWeight="900" fontFamily="monospace">SOUR BOMBER</text>

            {/* Bronze Base Stem */}
            <path d="M 42 74 L 38 54 L 62 54 L 58 74 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />

            {/* Jagged Comic Starburst Explosion Behind */}
            <polygon
              points="50,4 58,22 78,14 72,32 92,36 78,50 90,64 70,66 68,84 50,72 32,84 30,66 10,64 22,50 8,36 28,32 22,14 42,22"
              fill="#ef4444"
              stroke="#b91c1c"
              strokeWidth="2"
            />
            <polygon
              points="50,10 56,25 74,18 67,33 84,38 73,48 82,60 65,60 63,75 50,65 37,75 35,60 18,60 27,48 16,38 33,33 26,18 44,25"
              fill="#f97316"
            />
            <polygon
              points="50,16 55,27 68,22 62,34 76,38 67,46 74,56 60,56 58,68 50,60 42,68 40,56 26,56 33,46 24,38 38,34 32,22 45,27"
              fill="#facc15"
            />

            {/* Flying Lemon Droplets / Citrus Sparks */}
            <circle cx="22" cy="24" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="78" cy="24" r="2.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
            <circle cx="86" cy="52" r="2" fill="#facc15" />
            <circle cx="14" cy="52" r="2" fill="#facc15" />

            {/* Armed Lemon Mine on Top */}
            <g>
              {/* Lemon Body */}
              <ellipse cx="50" cy="48" rx="22" ry="15" fill="url(#trophyLemonGrad)" stroke="#ca8a04" strokeWidth="2.5" />
              {/* Left & Right Lemon Tips */}
              <path d="M 28 48 Q 23 48 25 45 Q 29 43 31 47 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
              <path d="M 72 48 Q 77 48 75 45 Q 71 43 69 47 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />

              {/* Rind Texture & Highlights */}
              <path d="M 36 38 Q 50 34 64 38" stroke="#fef9c3" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />

              {/* Green Citrus Leaves on Top */}
              <path d="M 46 34 C 40 29 37 23 43 21 C 48 24 48 30 47 34 Z" fill="url(#trophyLeafGrad)" stroke="#166534" strokeWidth="1.2" />
              <path d="M 54 34 C 60 29 63 23 57 21 C 52 24 52 30 53 34 Z" fill="url(#trophyLeafGrad)" stroke="#166534" strokeWidth="1.2" />

              {/* Eyes & Teeth */}
              <circle cx="43" cy="45" r="3.5" fill="#000" />
              <circle cx="42" cy="44" r="1.2" fill="#fff" />
              <circle cx="57" cy="45" r="3.5" fill="#000" />
              <circle cx="56" cy="44" r="1.2" fill="#fff" />
              <ellipse cx="36" cy="49" rx="2.5" ry="1.5" fill="#f97316" opacity="0.4" />
              <ellipse cx="64" cy="49" rx="2.5" ry="1.5" fill="#f97316" opacity="0.4" />
              <path d="M 44 52 Q 50 56 56 52" stroke="#713f12" strokeWidth="2" fill="none" strokeLinecap="round" />
              <rect x="47" y="52" width="2.8" height="3.5" fill="#fff" stroke="#ca8a04" strokeWidth="0.6" rx="0.5" />
              <rect x="50.2" y="52" width="2.8" height="3.5" fill="#fff" stroke="#ca8a04" strokeWidth="0.6" rx="0.5" />

              {/* Glowing Red Antenna */}
              <line x1="50" y1="34" x2="50" y2="18" stroke="#000" strokeWidth="2.5" />
              <circle cx="50" cy="16" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
              <circle cx="50" cy="16" r="2.5" fill="#fef08a" />
            </g>
          </svg>
        </div>
      );

    case 'prawn_collector':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Bronze Pedestal with Wave Carvings */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#92400e" stroke="#b45309" strokeWidth="1.5" rx="1" />
            <rect x="32" y="86" width="36" height="5" fill="#ea580c" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#fff" fontSize="3.5" fontWeight="900" fontFamily="monospace">1000 PRAWNS</text>

            {/* Wide Bronze Feast Goblet */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <path d="M 22 34 C 22 62 78 62 78 34 Z" fill="#b45309" stroke="#78350f" strokeWidth="2.5" />
            <ellipse cx="50" cy="34" rx="28" ry="8" fill="#d97706" stroke="#78350f" strokeWidth="2" />

            {/* Glowing Golden Prawn Coins piling up */}
            <circle cx="34" cy="32" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="66" cy="32" r="6" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="50" cy="36" r="7" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />

            {/* Giant Juicy Australian King Prawn */}
            <g transform="translate(50, 24) scale(0.9)">
              {/* Curved Prawn Tail & Body Segments */}
              <path d="M -16 6 C -24 -10 -4 -22 14 -16 C 24 -12 28 -2 24 10 C 20 18 10 22 2 16" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <path d="M -12 2 C -18 -8 -2 -18 10 -12" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.6" />
              {/* Shell segment ridges */}
              <line x1="-12" y1="-2" x2="-6" y2="4" stroke="#c2410c" strokeWidth="1.5" />
              <line x1="-4" y1="-12" x2="2" y2="-4" stroke="#c2410c" strokeWidth="1.5" />
              <line x1="8" y1="-14" x2="12" y2="-2" stroke="#c2410c" strokeWidth="1.5" />
              {/* Prawn Tail Fan */}
              <polygon points="-16,6 -26,8 -24,0 -20,2" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
              {/* Prawn Head & Long Whisker Antennae */}
              <circle cx="20" cy="8" r="2" fill="#000" />
              <path d="M 22 4 Q 38 -12 44 -4" stroke="#ea580c" strokeWidth="1.5" fill="none" />
              <path d="M 24 8 Q 42 2 46 16" stroke="#ea580c" strokeWidth="1.5" fill="none" />
            </g>

            {/* Fresh Lemon Wedge slice garnish */}
            <path d="M 26 24 A 12 12 0 0 1 40 16 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 28 22 A 9 9 0 0 1 38 18 Z" fill="#facc15" />
          </svg>
        </div>
      );

    case 'vault_interceptor':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Base Pedestal (Silver Stepped Plinth) */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#cbd5e1" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#0f172a" fontSize="3.5" fontWeight="900" fontFamily="monospace">POLE VAULT</text>

            {/* Chalice Stem */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
            <ellipse cx="50" cy="54" rx="10" ry="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />

            {/* Left Trophy Curved Handle */}
            <path
              d="M 28 34 C 10 34 8 16 28 20"
              stroke="#cbd5e1"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 28 34 C 12 34 10 18 28 20"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Right Trophy Curved Handle */}
            <path
              d="M 72 34 C 90 34 92 16 72 20"
              stroke="#cbd5e1"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 72 34 C 88 34 90 18 72 20"
              stroke="#64748b"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Silver Cup / Chalice Body */}
            <path d="M 26 28 C 26 56 74 56 74 28 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.5" />
            {/* Highlight & Shading */}
            <path d="M 30 30 C 30 52 46 52 46 30 Z" fill="#f8fafc" opacity="0.6" />
            <path d="M 58 30 C 58 52 70 52 70 30 Z" fill="#94a3b8" opacity="0.5" />

            {/* Cup Rim & Dark Interior Depth */}
            <ellipse cx="50" cy="28" rx="24" ry="7" fill="#475569" stroke="#64748b" strokeWidth="2" />
            <ellipse cx="50" cy="28" rx="22" ry="5.5" fill="#1e293b" />

            {/* ================= VAULTING POLE STICKING OUT ================= */}
            <g id="vaulting_pole_sticking_out">
              {/* Main Pole Shaft extending diagonally out of the cup */}
              <line x1="42" y1="36" x2="84" y2="4" stroke="#d97706" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="42" y1="36" x2="84" y2="4" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />

              {/* Bamboo Segment Rings */}
              <line x1="50" y1="30" x2="52" y2="28" stroke="#78350f" strokeWidth="6" />
              <line x1="62" y1="21" x2="64" y2="19" stroke="#78350f" strokeWidth="6" />
              <line x1="74" y1="12" x2="76" y2="10" stroke="#78350f" strokeWidth="6" />

              {/* Athletic Red & White Grip Tape Wrap near the top end */}
              <rect x="68" y="10" width="8" height="4.5" fill="#ef4444" rx="1" transform="rotate(-38 72 12)" />
              <rect x="73" y="6" width="6" height="4.5" fill="#ffffff" rx="1" transform="rotate(-38 76 8)" />

              {/* Pole Rubber Tip Cap */}
              <circle cx="84" cy="4" r="3.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />

              {/* Gleam Sparkle on the Tip */}
              <path d="M 84 -2 L 84 10 M 78 4 L 90 4" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="84" cy="4" r="1.5" fill="#ffffff" />
            </g>

            {/* Cup Front Lip to overlay the bottom section of the pole inside */}
            <path d="M 26 28 C 30 35 70 35 74 28" stroke="#cbd5e1" strokeWidth="3" fill="none" />
            <path d="M 32 30 C 38 34 62 34 68 30" stroke="#f8fafc" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      );

    case 'bucket_crusher':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Heavy Silver Anvil Pedestal */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#94a3b8" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#0f172a" fontSize="3.5" fontWeight="900" fontFamily="monospace">CRUSHER</text>

            {/* Industrial Stand */}
            <path d="M 42 74 L 44 54 L 56 54 L 58 74 Z" fill="#64748b" stroke="#1e293b" strokeWidth="2" />

            {/* Silver Laurel Leaves Framing */}
            <path d="M 18 64 Q 10 40 22 22" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 82 64 Q 90 40 78 22" stroke="#94a3b8" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Crushed, Dented Galvanized Bucket */}
            <g transform="translate(50, 42)">
              {/* Dented Bucket Body */}
              <path d="M -22 16 L -16 -12 Q 0 -16 16 -12 L 22 16 Z" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" />
              {/* Deep impact dent crease */}
              <path d="M -16 -12 Q 0 4 16 -12" stroke="#1e293b" strokeWidth="3" fill="#64748b" />
              <ellipse cx="0" cy="16" rx="22" ry="6" fill="#64748b" stroke="#334155" strokeWidth="2" />
              {/* Rust streaks */}
              <path d="M -6 -2 L -4 12 M 8 -4 L 10 10" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              {/* Bucket wire handle hanging limp */}
              <path d="M -22 0 Q -30 20 -10 24" stroke="#475569" strokeWidth="2" fill="none" />
            </g>

            {/* Heavy Smashing Sledgehammer striking down */}
            <g transform="translate(50, 20) rotate(-25)">
              <rect x="-6" y="-12" width="12" height="20" rx="3" fill="#334155" stroke="#0f172a" strokeWidth="2" />
              <rect x="-4" y="-10" width="8" height="16" rx="2" fill="#64748b" />
              <line x1="0" y1="-12" x2="0" y2="-32" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Impact Flash Shockwave */}
            <polygon points="50,18 56,26 66,24 60,32 68,40 56,38 50,48 44,38 32,40 40,32 34,24 44,26" fill="#facc15" opacity="0.9" />
          </svg>
        </div>
      );

    case 'koala_tamer':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Silver Stepped Base Pedestal */}
            <polygon points="18,94 82,94 76,82 24,82" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#a7f3d0" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#064e3b" fontSize="3.5" fontWeight="900" fontFamily="monospace">KOALA TAMER</text>

            {/* Silver Trophy Stem with Laurel Leaves */}
            <path d="M 44 74 L 46 56 L 54 56 L 56 74 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
            <ellipse cx="36" cy="68" rx="8" ry="3.5" fill="#15803d" transform="rotate(-20 36 68)" />
            <ellipse cx="64" cy="68" rx="8" ry="3.5" fill="#15803d" transform="rotate(20 64 68)" />

            {/* Parachute Canopy Arched Above */}
            <path d="M 22 24 C 22 6 78 6 78 24 Z" fill="#15803d" stroke="#14532d" strokeWidth="2.5" />
            <path d="M 34 24 C 34 9 66 9 66 24 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
            <path d="M 44 24 C 44 9 56 9 56 24 Z" fill="#22c55e" />
            <circle cx="50" cy="7" r="3" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />

            {/* Parachute Suspension Cords */}
            <line x1="24" y1="24" x2="34" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="42" y1="24" x2="44" y2="38" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="58" y1="24" x2="56" y2="38" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="76" y1="24" x2="66" y2="40" stroke="#cbd5e1" strokeWidth="1.5" />

            {/* Koala Imp Character Mascot Head */}
            <g id="koala_trophy_mascot" transform="translate(50, 48)">
              {/* Fluffy Round Koala Onesie Ears */}
              <circle cx="-18" cy="-14" r="10" fill="#64748b" stroke="#334155" strokeWidth="2" />
              <circle cx="-18" cy="-14" r="6" fill="#f1f5f9" />
              <path d="M -23 -14 Q -18 -10 -15 -17" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

              <circle cx="18" cy="-14" r="10" fill="#64748b" stroke="#334155" strokeWidth="2" />
              <circle cx="18" cy="-14" r="6" fill="#f1f5f9" />
              <path d="M 23 -14 Q 18 -10 15 -17" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />

              {/* Koala Hood Dome */}
              <circle cx="0" cy="-2" r="18" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
              
              {/* Big Black Leather Koala Nose on Forehead */}
              <ellipse cx="0" cy="-12" rx="6" ry="4.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <ellipse cx="-1.5" cy="-13" rx="2" ry="1.2" fill="#94a3b8" opacity="0.6" />

              {/* Green Zombie Face cutout inside hood */}
              <ellipse cx="0" cy="2" rx="13" ry="11" fill="#65a30d" stroke="#3f6212" strokeWidth="1.5" />

              {/* Asymmetrical Imp Eyes */}
              <circle cx="-5" cy="0" r="4" fill="#fef08a" stroke="#000" strokeWidth="1.2" />
              <circle cx="-5" cy="0" r="1.8" fill="#000" />
              <circle cx="-5.8" cy="-0.8" r="0.7" fill="#fff" />

              <circle cx="5" cy="1" r="4.5" fill="#fef08a" stroke="#000" strokeWidth="1.2" />
              <circle cx="5" cy="1" r="2" fill="#000" />
              <circle cx="4.2" cy="0.2" r="0.7" fill="#fff" />

              {/* Cheeky Imp Mouth with tiny fangs */}
              <path d="M -6 7 Q 0 11 6 7" stroke="#1c1917" strokeWidth="1.8" fill="none" />
              <polygon points="-3,7 -1.5,10 0,7" fill="#fff" />
              <polygon points="2,7 3.5,10 5,7" fill="#fff" />

              {/* Fresh Green Eucalyptus Gum Sprig in corner */}
              <g transform="translate(8, 6) rotate(25)">
                <path d="M 0 0 Q 6 -4 12 0" stroke="#14532d" strokeWidth="1.5" fill="none" />
                <ellipse cx="6" cy="-2" rx="4" ry="2" fill="#22c55e" stroke="#15803d" strokeWidth="0.8" />
                <ellipse cx="12" cy="0" rx="3.5" ry="1.8" fill="#4ade80" stroke="#15803d" strokeWidth="0.8" />
              </g>
            </g>
          </svg>
        </div>
      );

    case 'outback_hero':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Red Outback Sandstone & Silver Pedestal */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#7c2d12" stroke="#451a03" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#9a3412" stroke="#cbd5e1" strokeWidth="1.5" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" stroke="#78350f" strokeWidth="1" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#78350f" fontSize="3.5" fontWeight="900" fontFamily="monospace">OUTBACK VET</text>

            {/* Heavy Sandstone Pillar Stand */}
            <path d="M 42 74 L 45 54 L 55 54 L 58 74 Z" fill="#c2410c" stroke="#7c2d12" strokeWidth="2" />

            {/* Crossed Silver Boomerangs in background */}
            <g id="crossed_boomerangs">
              {/* Left Boomerang */}
              <path d="M 22 56 Q 30 30 46 14 Q 42 22 28 42 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
              {/* Right Boomerang */}
              <path d="M 78 56 Q 70 30 54 14 Q 58 22 72 42 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
            </g>

            {/* Golden Outback Sunrise Halo */}
            <path d="M 26 44 C 26 22 74 22 74 44 Z" fill="#fef08a" opacity="0.25" />

            {/* ================= RED SAND GARGANTUAR TITAN HEAD ================= */}
            <g id="garg_titan_trophy_head" transform="translate(50, 40)">
              {/* Rocky Jaw & Red Sandstone Skull */}
              <path d="M -18 -6 L 18 -6 L 14 18 L -14 18 Z" fill="#c2410c" stroke="#451a03" strokeWidth="2.5" />
              
              {/* Rock Texture Highlight & Cracks */}
              <path d="M -12 2 L -8 10 L -4 6" stroke="#f97316" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M 6 0 L 10 8 L 8 14" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Heavy Shadowed Brow Overhang */}
              <rect x="-17" y="-5" width="34" height="4" fill="#290a00" rx="1" />

              {/* Glowing Sinister Yellow/Amber Eyes */}
              <ellipse cx="-7" cy="1" rx="3.5" ry="2.8" fill="#fef08a" stroke="#78350f" strokeWidth="1" />
              <circle cx="-7" cy="1" r="1.5" fill="#000" />

              <ellipse cx="7" cy="1" rx="3.5" ry="2.8" fill="#fef08a" stroke="#78350f" strokeWidth="1" />
              <circle cx="7" cy="1" r="1.5" fill="#000" />

              {/* Snarl Mouth & Sharp Sandstone Teeth */}
              <path d="M -12 8 Q 0 5 12 8 L 10 15 Q 0 18 -10 15 Z" fill="#1c1917" stroke="#290a00" strokeWidth="1.5" />
              <polygon points="-9,8 -7,12 -5,8" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />
              <polygon points="-2,8 0,13 2,8" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />
              <polygon points="5,8 7,12 9,8" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />
              <polygon points="-6,15 -4,11 -2,15" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />
              <polygon points="1,15 3,11 5,15" fill="#fde047" stroke="#78350f" strokeWidth="0.5" />

              {/* Frayed Outback Slouch Cork Hat */}
              <g id="titan_cork_hat">
                {/* Crown */}
                <path d="M -14 -6 L -10 -18 L 10 -18 L 14 -6 Z" fill="#a16207" stroke="#290a00" strokeWidth="2" />
                <rect x="-11" y="-10" width="22" height="3" fill="#290a00" />
                
                {/* Wide Curved Brim */}
                <ellipse cx="0" cy="-6" rx="26" ry="5.5" fill="#ca8a04" stroke="#290a00" strokeWidth="2" />

                {/* Dangling Corks on Strings */}
                <g stroke="#290a00" strokeWidth="1">
                  <line x1="-20" y1="-5" x2="-20" y2="4" />
                  <rect x="-22" y="4" width="4" height="5.5" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="0.8" />

                  <line x1="-12" y1="-3" x2="-12" y2="6" />
                  <rect x="-14" y="6" width="4" height="5.5" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="0.8" />

                  <line x1="12" y1="-3" x2="12" y2="6" />
                  <rect x="10" y="6" width="4" height="5.5" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="0.8" />

                  <line x1="20" y1="-5" x2="20" y2="4" />
                  <rect x="18" y="4" width="4" height="5.5" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="0.8" />
                </g>
              </g>
            </g>
          </svg>
        </div>
      );

    case 'golden_meat_pie':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Radiant Golden Sunburst Behind */}
            <g className="animate-spin-slow">
              <line x1="50" y1="6" x2="50" y2="16" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="78" y1="18" x2="70" y2="24" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="92" y1="46" x2="82" y2="46" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="18" x2="30" y2="24" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="8" y1="46" x2="18" y2="46" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Royal Gold Pedestal */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#d97706" stroke="#fef08a" strokeWidth="2" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" stroke="#78350f" strokeWidth="1" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#78350f" fontSize="3.5" fontWeight="900" fontFamily="monospace">GOLDEN PIE</text>

            {/* Royal Gold Winged Chalice Base */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            <path d="M 24 38 C 24 64 76 64 76 38 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            <path d="M 28 40 C 28 58 72 58 72 40 Z" fill="#fde047" />

            {/* Winged Handles */}
            <path d="M 24 42 C 8 42 6 22 26 24" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 76 42 C 92 42 94 22 74 24" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* The Legendary Golden Meat Pie sitting atop */}
            <g transform="translate(50, 32)">
              {/* Golden Pie Crust */}
              <ellipse cx="0" cy="6" rx="26" ry="12" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
              <ellipse cx="0" cy="3" rx="24" ry="10" fill="#f59e0b" />
              <ellipse cx="0" cy="0" rx="20" ry="7" fill="#fbbf24" />

              {/* Flaky Crust Crimping all along edge */}
              <path d="M -22 3 Q -18 -2 -14 3 Q -10 -2 -6 3 Q -2 -2 2 3 Q 6 -2 10 3 Q 14 -2 18 3 Q 22 -2 24 3" stroke="#b45309" strokeWidth="2" fill="none" />

              {/* Rich Red Tomato Sauce Star Pattern on Top */}
              <path d="M 0 -5 L 3 -1 L 7 -1 L 4 2 L 5 6 L 0 3 L -5 6 L -4 2 L -7 -1 L -3 -1 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />

              {/* Rising Hot Delicious Steam */}
              <path d="M -10 -8 Q -16 -18 -8 -26" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
              <path d="M 10 -8 Q 16 -18 8 -26" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.8" strokeLinecap="round" />
              <path d="M 0 -10 Q -6 -20 2 -28" stroke="#fef08a" strokeWidth="2.5" fill="none" opacity="0.9" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );

    case 'pro_void_master':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Cosmic Void Nebula Aura */}
            <circle cx="50" cy="40" r="32" fill="#581c87" opacity="0.6" className="animate-pulse" />
            <circle cx="50" cy="40" r="26" fill="#7e22ce" opacity="0.5" />

            {/* Fractured Gold Pedestal with Purple Void Cracks */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#581c87" stroke="#9333ea" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#a855f7" stroke="#facc15" strokeWidth="2" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#3b0764" fontSize="3.5" fontWeight="900" fontFamily="monospace">VOID TITAN</text>

            {/* Cosmic Swirl Tentacles Holding Void Orb */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <path d="M 28 54 Q 18 36 34 26" stroke="#a855f7" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 72 54 Q 82 36 66 26" stroke="#a855f7" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Void Sphere */}
            <circle cx="50" cy="38" r="22" fill="#0f172a" stroke="#c084fc" strokeWidth="2.5" />
            
            {/* Void Lightning Fractals */}
            <path d="M 38 24 L 46 36 L 42 42 L 58 50" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M 62 24 L 54 34 L 58 40 L 46 48" stroke="#e879f9" strokeWidth="1.5" fill="none" />

            {/* Void Red Sand Gargantuar Fist Silhouette inside Orb */}
            <g transform="translate(50, 38)">
              {/* Menacing Glowing Eyes */}
              <circle cx="-6" cy="-4" r="3" fill="#ec4899" className="animate-ping" />
              <circle cx="-6" cy="-4" r="2" fill="#fff" />
              <circle cx="6" cy="-4" r="3" fill="#ec4899" className="animate-ping" />
              <circle cx="6" cy="-4" r="2" fill="#fff" />
              {/* Massive Stone Hand Silhouette */}
              <path d="M -10 4 L -6 12 L 6 12 L 10 4 L 8 -2 L -8 -2 Z" fill="#9333ea" stroke="#f43f5e" strokeWidth="1" />
            </g>

            {/* Orbiting Cosmic Ring */}
            <ellipse cx="50" cy="38" rx="30" ry="10" stroke="#facc15" strokeWidth="2" strokeDasharray="8,4" fill="none" transform="rotate(-20 50 38)" />
          </svg>
        </div>
      );

    case 'trophy_exe':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Gold Circuit Board Pedestal */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#047857" stroke="#34d399" strokeWidth="2" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#064e3b" fontSize="3.5" fontWeight="900" fontFamily="monospace">TROPHY.EXE</text>

            {/* Motherboard Traces on Pedestal */}
            <path d="M 30 78 L 40 78 L 44 82 M 70 78 L 60 78 L 56 82" stroke="#34d399" strokeWidth="1.5" fill="none" />
            <circle cx="44" cy="82" r="1.5" fill="#facc15" />
            <circle cx="56" cy="82" r="1.5" fill="#facc15" />

            {/* Golden Cyber Pillar Stand */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#d97706" stroke="#78350f" strokeWidth="2" />

            {/* Glowing CRT Green Monitor Aura */}
            <rect x="24" y="16" width="52" height="46" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="3" />
            <rect x="28" y="20" width="44" height="38" rx="4" fill="#064e3b" />

            {/* 3.5" Floppy Disk Trophy Core */}
            <g transform="translate(50, 38)">
              {/* Black Plastic Floppy Shell */}
              <rect x="-16" y="-14" width="32" height="30" rx="3" fill="#0f172a" stroke="#34d399" strokeWidth="1.5" />
              {/* Silver Shutter Slider */}
              <rect x="-10" y="-14" width="20" height="12" rx="1" fill="#94a3b8" stroke="#475569" strokeWidth="1" />
              <rect x="0" y="-12" width="6" height="7" fill="#0f172a" />
              {/* White/Cyan Paper Label */}
              <rect x="-13" y="0" width="26" height="13" rx="1" fill="#f0fdf4" stroke="#86efac" strokeWidth="0.5" />
              <text x="0" y="6" textAnchor="middle" fill="#047857" fontSize="5" fontWeight="900" fontFamily="monospace">TROPHY</text>
              <text x="0" y="11" textAnchor="middle" fill="#2563eb" fontSize="4" fontWeight="bold" fontFamily="monospace">.EXE</text>
            </g>

            {/* Matrix Binary Code Rain (0101) */}
            <text x="32" y="30" fill="#4ade80" fontSize="4" fontFamily="monospace" opacity="0.8">10</text>
            <text x="32" y="44" fill="#4ade80" fontSize="4" fontFamily="monospace" opacity="0.8">01</text>
            <text x="64" y="28" fill="#4ade80" fontSize="4" fontFamily="monospace" opacity="0.8">11</text>
            <text x="64" y="46" fill="#4ade80" fontSize="4" fontFamily="monospace" opacity="0.8">00</text>
          </svg>
        </div>
      );

    case 'punch_coded_gut':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Glitch Grid Shatter Pedestal */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#1e1b4b" fontSize="3.5" fontWeight="900" fontFamily="monospace">CODED GUT KO</text>

            {/* Gold Champion Stand */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#d97706" stroke="#78350f" strokeWidth="2" />

            {/* Glitch Starburst Aura (Cyan & Magenta offset) */}
            <polygon points="50,6 64,22 84,16 76,34 94,44 76,52 82,70 64,64 50,78 36,64 18,70 24,52 6,44 24,34 16,16 36,22" fill="#ec4899" opacity="0.6" transform="translate(2, 2)" />
            <polygon points="50,6 64,22 84,16 76,34 94,44 76,52 82,70 64,64 50,78 36,64 18,70 24,52 6,44 24,34 16,16 36,22" fill="#06b6d4" opacity="0.6" transform="translate(-2, -2)" />
            <polygon points="50,6 64,22 84,16 76,34 94,44 76,52 82,70 64,64 50,78 36,64 18,70 24,52 6,44 24,34 16,16 36,22" fill="#facc15" />

            {/* Crocodile Snout Getting Punched */}
            <g transform="translate(62, 42)">
              <path d="M 0 -8 L 18 -2 L 14 6 L 0 4 Z" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />
              {/* Croc teeth */}
              <polygon points="4,4 6,0 8,4" fill="#fff" />
              <polygon points="10,3 12,-1 14,3" fill="#fff" />
              <circle cx="4" cy="-5" r="1.5" fill="#facc15" />
            </g>

            {/* Giant Gold Boxing Glove Fist */}
            <g transform="translate(42, 38)">
              {/* Fist */}
              <ellipse cx="0" cy="0" rx="16" ry="13" fill="#ea580c" stroke="#7c2d12" strokeWidth="2.5" />
              <ellipse cx="0" cy="-2" rx="13" ry="9" fill="#f97316" />
              {/* Thumb */}
              <ellipse cx="-6" cy="8" rx="8" ry="5" fill="#ea580c" stroke="#7c2d12" strokeWidth="2" />
              {/* Wrist Band */}
              <rect x="-16" y="-6" width="6" height="12" fill="#ffffff" stroke="#7c2d12" strokeWidth="1.5" rx="1" />
            </g>

            {/* Knockout Impact Flash */}
            <polygon points="54,28 62,34 72,30 66,40 76,46 64,48 62,58 54,50 44,54 48,44 40,36 50,38" fill="#ffffff" stroke="#facc15" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case 'unlocked_meatcan':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Royal Gold Pedestal */}
            <polygon points="16,94 84,94 76,82 24,82" fill="#b45309" stroke="#78350f" strokeWidth="2" />
            <rect x="24" y="74" width="52" height="8" fill="#d97706" stroke="#fef08a" strokeWidth="2" rx="1" />
            <rect x="30" y="86" width="40" height="5" fill="#facc15" rx="1" />
            <text x="50" y="90" textAnchor="middle" fill="#78350f" fontSize="3.5" fontWeight="900" fontFamily="monospace">MEATCAN</text>

            {/* Stand */}
            <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />

            {/* Opened Tin Can Body */}
            <g transform="translate(50, 40)">
              {/* Shiny Tin Can Base */}
              <rect x="-18" y="2" width="36" height="24" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="2.5" />
              <rect x="-16" y="6" width="32" height="16" fill="#dc2626" rx="2" />
              <text x="0" y="14" textAnchor="middle" fill="#fef08a" fontSize="6" fontWeight="900" fontFamily="sans-serif">MEAT</text>
              <text x="0" y="20" textAnchor="middle" fill="#ffffff" fontSize="5" fontWeight="900" fontFamily="sans-serif">CAN</text>

              {/* Opened Silver Lid peeled up */}
              <path d="M -18 2 Q -22 -14 -4 -8 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />

              {/* Golden Meat Pie Popping Out */}
              <ellipse cx="2" cy="-2" rx="15" ry="8" fill="#d97706" stroke="#78350f" strokeWidth="2" />
              <ellipse cx="2" cy="-4" rx="12" ry="6" fill="#f59e0b" />
              <path d="M -8 -3 Q -4 -7 0 -3 Q 4 -7 8 -3 Q 12 -7 14 -3" stroke="#b45309" strokeWidth="1.5" fill="none" />

              {/* Delicious Steam */}
              <path d="M -4 -12 Q -8 -20 -2 -26" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
              <path d="M 6 -12 Q 10 -20 4 -26" stroke="#fff" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
            </g>

            {/* Aussie Joe's Secret Scroll Note hanging on right with Red Wax Seal */}
            <g transform="translate(72, 48) rotate(12)">
              <rect x="-8" y="-12" width="16" height="22" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              {/* Scribble lines on letter */}
              <line x1="-5" y1="-8" x2="5" y2="-8" stroke="#92400e" strokeWidth="1" />
              <line x1="-5" y1="-4" x2="4" y2="-4" stroke="#92400e" strokeWidth="1" />
              <line x1="-5" y1="0" x2="3" y2="0" stroke="#92400e" strokeWidth="1" />
              {/* Red Wax Seal */}
              <circle cx="0" cy="5" r="3.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
              <circle cx="0" cy="5" r="1.5" fill="#fca5a5" />
            </g>
          </svg>
        </div>
      );

    case 'cheated_like_a_baby':
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Cracked Crooked Wooden Plank Pedestal */}
            <polygon points="14,94 86,94 78,80 22,80" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <polygon points="20,80 80,78 76,70 24,72" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
            
            {/* Bent Nail sticking out */}
            <line x1="22" y1="84" x2="16" y2="78" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            
            {/* Messy Crayon "BABY" Label */}
            <rect x="28" y="84" width="44" height="7" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" rx="1" />
            <text x="50" y="89" textAnchor="middle" fill="#dc2626" fontSize="4.5" fontWeight="900" fontFamily="sans-serif">CHEATER BABY</text>

            {/* Stink Fumes */}
            <path d="M 32 20 Q 26 8 36 2" stroke="#84cc16" strokeWidth="2" fill="none" strokeDasharray="3,2" opacity="0.8" />
            <path d="M 68 20 Q 74 8 64 2" stroke="#84cc16" strokeWidth="2" fill="none" strokeDasharray="3,2" opacity="0.8" />

            {/* Comical Mud/Poop Swirl Trophy Sculpt */}
            <g transform="translate(50, 45)">
              {/* Bottom Mud Mound Tier */}
              <ellipse cx="0" cy="18" rx="26" ry="12" fill="#78350f" stroke="#451a03" strokeWidth="2.5" />
              {/* Middle Mud Tier */}
              <ellipse cx="0" cy="6" rx="20" ry="10" fill="#92400e" stroke="#451a03" strokeWidth="2.5" />
              {/* Top Swirl Tip */}
              <path d="M -12 -4 C -12 -18 16 -18 10 -4 Z" fill="#a16207" stroke="#451a03" strokeWidth="2" />
              <path d="M 4 -16 Q 16 -24 8 -28" stroke="#a16207" strokeWidth="3.5" fill="none" strokeLinecap="round" />

              {/* Googly Cheater Baby Eyes */}
              <circle cx="-7" cy="4" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
              <circle cx="-6" cy="5" r="2.5" fill="#000000" />
              <circle cx="-5" cy="4" r="1" fill="#ffffff" />
              
              <circle cx="7" cy="4" r="5.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
              <circle cx="6" cy="5" r="2.5" fill="#000000" />
              <circle cx="7" cy="4" r="1" fill="#ffffff" />

              {/* Ruffled Pink Baby Bonnet on top */}
              <path d="M -14 -12 Q 0 -22 14 -12" stroke="#f472b6" strokeWidth="4" fill="none" strokeLinecap="round" />
              {/* Bonnet Lace Frills */}
              <circle cx="-12" cy="-12" r="2" fill="#fbcfe8" />
              <circle cx="-6" cy="-17" r="2" fill="#fbcfe8" />
              <circle cx="0" cy="-19" r="2" fill="#fbcfe8" />
              <circle cx="6" cy="-17" r="2" fill="#fbcfe8" />
              <circle cx="12" cy="-12" r="2" fill="#fbcfe8" />

              {/* Bright Yellow Baby Pacifier stuck in mouth */}
              <ellipse cx="0" cy="14" rx="7" ry="5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="0" cy="14" r="2.5" fill="#f59e0b" />
              <path d="M -4 16 Q 0 22 4 16" stroke="#ca8a04" strokeWidth="2" fill="none" />

              {/* Safety Pin */}
              <ellipse cx="16" cy="16" rx="4" ry="2" fill="#cbd5e1" stroke="#475569" strokeWidth="1" transform="rotate(30 16 16)" />
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`relative ${sizeClasses} flex items-center justify-center ${className}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <polygon points="18,94 82,94 76,82 24,82" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <rect x="26" y="74" width="48" height="8" fill="#92400e" stroke="#b45309" strokeWidth="1.5" rx="1" />
            <path d="M 30 22 C 30 52 70 52 70 22 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
            <ellipse cx="50" cy="22" rx="20" ry="6" fill="#fde047" />
          </svg>
        </div>
      );
  }
});
