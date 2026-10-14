import React from 'react';

export const AussieJoeVector: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 360 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Soft Drop Shadow Filter */}
        <filter id="joeShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
        </filter>

        {/* Glow Effects */}
        <filter id="pieGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Gradients */}
        <linearGradient id="akubraGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a6538" />
          <stop offset="60%" stopColor="#6e4220" />
          <stop offset="100%" stopColor="#452710" />
        </linearGradient>

        <linearGradient id="bandGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="joeSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7c8a0" />
          <stop offset="50%" stopColor="#e5a97a" />
          <stop offset="100%" stopColor="#c88352" />
        </linearGradient>

        <linearGradient id="joeBeard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c2531a" />
          <stop offset="50%" stopColor="#963709" />
          <stop offset="100%" stopColor="#571c02" />
        </linearGradient>

        <linearGradient id="khakiShirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#556b2f" />
          <stop offset="50%" stopColor="#3b4d20" />
          <stop offset="100%" stopColor="#253312" />
        </linearGradient>

        <linearGradient id="pieCrust" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id="canGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="40%" stopColor="#b91c1c" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        <linearGradient id="aviatorLens" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
      </defs>

      <g filter="url(#joeShadow)">
        {/* === BODY & OUTFIT === */}
        {/* Torso Khaki Bush Jacket */}
        <path
          d="M95 185 C120 170 240 170 265 185 L280 360 C240 380 120 380 80 360 Z"
          fill="url(#khakiShirt)"
          stroke="#111"
          strokeWidth="4"
        />

        {/* Jacket Collar */}
        <path d="M140 180 L180 230 L130 220 Z" fill="#435522" stroke="#111" strokeWidth="3" />
        <path d="M220 180 L180 230 L230 220 Z" fill="#435522" stroke="#111" strokeWidth="3" />

        {/* Chest Pockets with Gold Buttons */}
        <rect x="110" y="240" width="48" height="52" rx="6" fill="#435522" stroke="#111" strokeWidth="2.5" />
        <path d="M108 240 L134 254 L160 240 Z" fill="#324118" stroke="#111" strokeWidth="2" />
        <circle cx="134" cy="265" r="4" fill="#f59e0b" stroke="#111" strokeWidth="1.5" />

        <rect x="202" y="240" width="48" height="52" rx="6" fill="#435522" stroke="#111" strokeWidth="2.5" />
        <path d="M200 240 L226 254 L252 240 Z" fill="#324118" stroke="#111" strokeWidth="2" />
        <circle cx="226" cy="265" r="4" fill="#f59e0b" stroke="#111" strokeWidth="1.5" />

        {/* Leather Ammo Strap across Chest */}
        <path d="M100 190 L260 340 L240 355 L80 205 Z" fill="#582d0e" stroke="#111" strokeWidth="3" />
        {/* Bullet/Cork Holders on Strap */}
        <rect x="120" y="220" width="10" height="22" rx="2" fill="#d97706" stroke="#111" strokeWidth="1.5" />
        <rect x="140" y="238" width="10" height="22" rx="2" fill="#d97706" stroke="#111" strokeWidth="1.5" />
        <rect x="160" y="256" width="10" height="22" rx="2" fill="#d97706" stroke="#111" strokeWidth="1.5" />
        <rect x="180" y="274" width="10" height="22" rx="2" fill="#d97706" stroke="#111" strokeWidth="1.5" />

        {/* Australian Flag Patch on Left Sleeve */}
        <g transform="translate(82, 230) rotate(-10)">
          <rect width="28" height="18" rx="2" fill="#00247D" stroke="#111" strokeWidth="2" />
          <path d="M0 0 L12 9 M12 0 L0 9" stroke="#FFF" strokeWidth="2.5" />
          <path d="M0 0 L12 9 M12 0 L0 9" stroke="#CC0000" strokeWidth="1.2" />
          <path d="M6 0 V9 M0 4.5 H12" stroke="#FFF" strokeWidth="3.5" />
          <path d="M6 0 V9 M0 4.5 H12" stroke="#CC0000" strokeWidth="1.8" />
          <circle cx="21" cy="13" r="2" fill="#FFF" />
          <circle cx="18" cy="5" r="1.2" fill="#FFF" />
          <circle cx="24" cy="7" r="1.2" fill="#FFF" />
        </g>

        {/* === RIGHT ARM HOLDING MEAT PIE === */}
        <path d="M260 200 Q310 210 325 260 L295 280 Q275 235 245 220 Z" fill="url(#joeSkin)" stroke="#111" strokeWidth="3.5" />
        {/* Forearm */}
        <path d="M315 260 Q340 275 345 310 L310 320 Q300 285 285 270 Z" fill="url(#joeSkin)" stroke="#111" strokeWidth="3.5" />

        {/* MEAT PIE WITH SAUCE & STEAM */}
        <g transform="translate(290, 275)" filter="url(#pieGlow)">
          {/* Steam Wisp */}
          <path d="M20 -15 Q25 -25 20 -35 M32 -10 Q38 -20 32 -30" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Paper Plate/Napkin */}
          <ellipse cx="25" cy="22" rx="38" ry="14" fill="#f3f4f6" stroke="#111" strokeWidth="2" />
          {/* Pie Base */}
          <path d="M-8 12 Q25 32 58 12 L50 20 Q25 35 -2 20 Z" fill="#92400e" stroke="#111" strokeWidth="2" />
          {/* Golden Crust Lid */}
          <ellipse cx="25" cy="10" rx="32" ry="15" fill="url(#pieCrust)" stroke="#111" strokeWidth="3" />
          {/* Crimped Crust Edge */}
          <ellipse cx="25" cy="7" rx="27" ry="11" fill="#facc15" stroke="#b45309" strokeWidth="2" />
          {/* Tomato Sauce Dollop */}
          <path d="M12 4 Q25 -2 38 4 Q30 12 25 10 Q20 12 12 4 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
        </g>

        {/* === LEFT ARM HOLDING AUSSIE LAGER CAN === */}
        <path d="M100 200 Q50 210 35 260 L65 280 Q85 235 115 220 Z" fill="url(#joeSkin)" stroke="#111" strokeWidth="3.5" />
        {/* Forearm & Hand */}
        <path d="M45 260 Q20 275 15 310 L50 320 Q60 285 75 270 Z" fill="url(#joeSkin)" stroke="#111" strokeWidth="3.5" />

        {/* AUSSIE LAGER CAN */}
        <g transform="translate(5, 275)">
          <rect x="0" y="0" width="32" height="52" rx="6" fill="url(#canGrad)" stroke="#111" strokeWidth="3" />
          <rect x="0" y="14" width="32" height="18" fill="#f59e0b" />
          <text x="16" y="26" fontSize="7" fontWeight="900" fill="#111" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">
            AUSSIE
          </text>
          <text x="16" y="38" fontSize="5.5" fontWeight="900" fill="#fff" textAnchor="middle" fontFamily="sans-serif">
            LAGER
          </text>
          {/* Can Rim */}
          <ellipse cx="16" cy="2" rx="14" ry="4" fill="#9ca3af" stroke="#111" strokeWidth="2" />
        </g>

        {/* === HEAD & NECK === */}
        <rect x="150" y="140" width="60" height="45" rx="12" fill="url(#joeSkin)" stroke="#111" strokeWidth="3.5" />

        {/* BUSHY OUTBACK BEARD & MUSTACHE */}
        <path
          d="M125 110 C110 170 135 210 180 215 C225 210 250 170 235 110 C200 135 160 135 125 110 Z"
          fill="url(#joeBeard)"
          stroke="#111"
          strokeWidth="4"
        />

        {/* Beard Texture Lines */}
        <path d="M145 150 Q150 185 170 200" stroke="#782403" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M215 150 Q210 185 190 200" stroke="#782403" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M180 160 V205" stroke="#782403" strokeWidth="3" strokeLinecap="round" />

        {/* Broad Cheerful Mouth & White Teeth */}
        <path d="M152 142 Q180 168 208 142 Z" fill="#2d0a02" stroke="#111" strokeWidth="2.5" />
        <path d="M158 142 Q180 152 202 142" stroke="#FFF" strokeWidth="5" strokeLinecap="round" />

        {/* Friendly Broad Nose */}
        <ellipse cx="180" cy="120" rx="14" ry="9" fill="#eb9c6f" stroke="#111" strokeWidth="3" />

        {/* EXPRESSIVE COOL AVIATOR SUNGLASSES */}
        <g transform="translate(125, 82)">
          {/* Left Lens */}
          <path d="M8 8 L42 10 L44 32 C44 44 8 44 8 32 Z" fill="url(#aviatorLens)" stroke="#f59e0b" strokeWidth="3.5" />
          {/* Right Lens */}
          <path d="M102 8 L68 10 L66 32 C66 44 102 44 102 32 Z" fill="url(#aviatorLens)" stroke="#f59e0b" strokeWidth="3.5" />
          {/* Bridge */}
          <line x1="42" y1="12" x2="68" y2="12" stroke="#f59e0b" strokeWidth="3.5" />
          <line x1="44" y1="18" x2="66" y2="18" stroke="#f59e0b" strokeWidth="2.5" />
          {/* Lens Reflections */}
          <path d="M14 14 L28 15 L16 34 Z" fill="#FFF" opacity="0.35" />
          <path d="M96 14 L82 15 L94 34 Z" fill="#FFF" opacity="0.35" />
        </g>

        {/* === AKUBRA SLOUCH HAT === */}
        <g transform="translate(45, 10)">
          {/* Hat Crown */}
          <path
            d="M80 80 Q90 20 135 15 Q180 20 190 80 Z"
            fill="url(#akubraGrad)"
            stroke="#111"
            strokeWidth="4"
          />
          {/* Indent on top of Crown */}
          <path d="M110 32 Q135 42 160 32" stroke="#321b0a" strokeWidth="3.5" strokeLinecap="round" />

          {/* Crocodile Tooth / Leather Hatband */}
          <path d="M78 78 Q135 88 192 78 L194 92 Q135 102 76 92 Z" fill="url(#bandGrad)" stroke="#111" strokeWidth="3" />

          {/* Crocodile Teeth on Hatband */}
          <polygon points="92,82 97,94 102,83" fill="#fef3c7" stroke="#111" strokeWidth="1.5" />
          <polygon points="112,84 117,96 122,85" fill="#fef3c7" stroke="#111" strokeWidth="1.5" />
          <polygon points="132,85 137,97 142,86" fill="#fef3c7" stroke="#111" strokeWidth="1.5" />
          <polygon points="152,84 157,96 162,85" fill="#fef3c7" stroke="#111" strokeWidth="1.5" />
          <polygon points="172,82 177,94 182,83" fill="#fef3c7" stroke="#111" strokeWidth="1.5" />

          {/* Wide Slouch Brim with Turned-Up Left Side */}
          <path
            d="M10 90 Q135 108 260 90 C280 85 270 65 240 70 Q135 85 30 70 C5 65 -5 85 10 90 Z"
            fill="url(#akubraGrad)"
            stroke="#111"
            strokeWidth="4"
          />

          {/* Gold Aussie Pin on Hat */}
          <circle cx="210" cy="65" r="8" fill="#f59e0b" stroke="#111" strokeWidth="2" />
          <path d="M206 65 L214 65 M210 61 L210 69" stroke="#111" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
};

