import React from 'react';
import { PRAWN_CURRENCY_IMAGE } from '../assets/images';
import { PlantType, ZombieType } from '../types';

// Plant Component Renderer
export const PlantSprite: React.FC<{
  type: PlantType;
  state?: 'sprouting' | 'armed' | 'chewing';
  hp: number;
  maxHp: number;
  isAnimated?: boolean;
  chewEndTime?: number;
  currentTime?: number;
}> = React.memo(({ type, state, hp, maxHp, isAnimated = true, chewEndTime, currentTime }) => {
  const hpPercent = hp / maxHp;

  switch (type) {
    case 'mini_eucalyptus':
      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Ground Shadow */}
            <ellipse cx="60" cy="118" rx="35" ry="8" fill="#000" opacity="0.45" />

            {/* Gnarled Eucalyptus Trunk with Bark & Grain */}
            <path d="M 52 118 Q 46 88 54 60 Q 66 85 68 118 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            <path d="M 50 118 Q 60 70 72 60 Q 64 90 70 118 Z" fill="#9a3412" opacity="0.7" />
            <path d="M 56 102 Q 58 82 54 65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.8" fill="none" />
            
            {/* Branches */}
            <path d="M 54 75 Q 32 55 22 48" stroke="#451a03" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 54 75 Q 32 55 22 48" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            <path d="M 62 70 Q 88 52 98 44" stroke="#451a03" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 62 70 Q 88 52 98 44" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />
            
            <path d="M 58 60 Q 60 38 60 28" stroke="#78350f" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* Eucalyptus Foliage Clusters (Sickle Gum Leaves) */}
            {/* Left Cluster */}
            <g id="euc_left_leaves">
              <ellipse cx="22" cy="45" rx="20" ry="14" fill="#15803d" stroke="#166534" strokeWidth="2" transform="rotate(-20 22 45)" />
              <ellipse cx="18" cy="42" rx="16" ry="10" fill="#22c55e" transform="rotate(-15 18 42)" />
              <ellipse cx="28" cy="38" rx="14" ry="9" fill="#4ade80" opacity="0.8" />
              <path d="M 8 48 Q 22 36 34 46" stroke="#14532d" strokeWidth="2" fill="none" />
              <path d="M 4 40 Q 18 28 30 38" stroke="#15803d" strokeWidth="1.5" fill="none" />
            </g>

            {/* Right Cluster */}
            <g id="euc_right_leaves">
              <ellipse cx="98" cy="42" rx="20" ry="14" fill="#15803d" stroke="#166534" strokeWidth="2" transform="rotate(20 98 42)" />
              <ellipse cx="102" cy="39" rx="16" ry="10" fill="#22c55e" transform="rotate(15 102 39)" />
              <ellipse cx="92" cy="35" rx="14" ry="9" fill="#4ade80" opacity="0.8" />
              <path d="M 86 44 Q 98 34 112 42" stroke="#14532d" strokeWidth="2" fill="none" />
            </g>

            {/* Center Crown Canopy */}
            <g id="euc_crown">
              <ellipse cx="60" cy="28" rx="28" ry="20" fill="#166534" stroke="#14532d" strokeWidth="3" />
              <ellipse cx="60" cy="24" rx="24" ry="16" fill="#15803d" />
              <ellipse cx="58" cy="20" rx="18" ry="12" fill="#22c55e" />
              <ellipse cx="54" cy="16" rx="12" ry="7" fill="#86efac" opacity="0.9" />

              {/* Red Blossom Tufts (Gum Tree Flowers) */}
              <circle cx="42" cy="18" r="4" fill="#ef4444" />
              <circle cx="42" cy="18" r="2" fill="#fde047" />
              <circle cx="78" cy="22" r="4" fill="#ef4444" />
              <circle cx="78" cy="22" r="2" fill="#fde047" />
              <circle cx="60" cy="10" r="4.5" fill="#f97316" />
              <circle cx="60" cy="10" r="2" fill="#fef08a" />
            </g>

            {/* Tree Face on Trunk */}
            <g id="euc_face">
              <circle cx="53" cy="74" r="3" fill="#000" />
              <circle cx="52" cy="73" r="1" fill="#fff" />
              <circle cx="67" cy="74" r="3" fill="#000" />
              <circle cx="66" cy="73" r="1" fill="#fff" />
              <path d="M 56 82 Q 60 86 64 82" stroke="#000" strokeWidth="2" fill="none" strokeLinecap="round" />
            </g>

            {/* Floating Mini Leaf Aura indicator */}
            <g className="animate-spin-slow">
              <circle cx="20" cy="15" r="2.5" fill="#4ade80" />
              <circle cx="100" cy="18" r="2.5" fill="#4ade80" />
              <circle cx="60" cy="120" r="2" fill="#86efac" />
            </g>
          </svg>
        </div>
      );

    case 'meatcan':
      return (
        <div className={`relative w-12 h-14 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Tin Can Base */}
            <rect x="25" y="45" width="50" height="60" fill="#94a3b8" stroke="#334155" strokeWidth="3" rx="4" />
            <ellipse cx="50" cy="45" rx="25" ry="8" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            <ellipse cx="50" cy="105" rx="25" ry="8" fill="#64748b" stroke="#334155" strokeWidth="2" />
            
            {/* Label */}
            <rect x="25" y="55" width="50" height="38" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1" />
            <text x="50" y="72" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold" fontFamily="monospace">MEAT</text>
            <text x="50" y="85" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif">CAN</text>
            
            {/* Opened Top Lid peeled back */}
            <path d="M 25 45 Q 20 15 45 25 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
            
            {/* Golden Meat Pie sticking out */}
            <ellipse cx="52" cy="40" rx="20" ry="10" fill="#d97706" stroke="#78350f" strokeWidth="2" />
            <ellipse cx="52" cy="38" rx="16" ry="7" fill="#f59e0b" />
            {/* Pie crust crimps */}
            <path d="M 36 38 Q 40 33 44 38 Q 48 33 52 38 Q 56 33 60 38 Q 64 33 68 38" stroke="#b45309" strokeWidth="2" fill="none" />
            
            {/* Happy pie face */}
            <circle cx="46" cy="38" r="2" fill="#000" />
            <circle cx="58" cy="38" r="2" fill="#000" />
            <path d="M 49 42 Q 52 45 55 42" stroke="#000" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      );

    case 'mega_mower':
      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-pulse' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl overflow-visible">
            {/* Matrix Green Aura */}
            <circle cx="50" cy="60" r="45" fill="#22c55e" opacity="0.25" className="animate-ping" />
            
            {/* Lawnmower Body */}
            <rect x="15" y="40" width="70" height="45" fill="#15803d" stroke="#166534" strokeWidth="3" rx="8" />
            <rect x="25" y="30" width="50" height="20" fill="#22c55e" stroke="#15803d" strokeWidth="2" rx="4" />
            
            {/* Metallic Engine Hood */}
            <rect x="30" y="45" width="40" height="25" fill="#0f172a" stroke="#22c55e" strokeWidth="2" rx="4" />
            <text x="50" y="62" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">MEGA</text>
            
            {/* Heavy Tread Wheels */}
            <circle cx="22" cy="88" r="12" fill="#090d16" stroke="#22c55e" strokeWidth="3" />
            <circle cx="78" cy="88" r="12" fill="#090d16" stroke="#22c55e" strokeWidth="3" />
            <circle cx="22" cy="88" r="4" fill="#22c55e" />
            <circle cx="78" cy="88" r="4" fill="#22c55e" />
            
            {/* Spinning Blades under hood */}
            <path d="M 20 85 L 80 85" stroke="#facc15" strokeWidth="4" strokeDasharray="6,4" />
            
            {/* Handle Bar */}
            <path d="M 20 50 L 5 20 M 80 50 L 95 20 M 5 20 L 95 20" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'peashooter':
      return (
        <div className={`relative w-12 h-14 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Prickly Yellowish-Green Weed Base Leaves */}
            <ellipse cx="28" cy="102" rx="16" ry="7" fill="#ca8a04" transform="rotate(-25 28 102)" />
            <polygon points="12,98 18,94 16,104" fill="#854d0e" />
            <ellipse cx="72" cy="102" rx="16" ry="7" fill="#ca8a04" transform="rotate(25 72 102)" />
            <polygon points="88,98 82,94 84,104" fill="#854d0e" />
            <ellipse cx="50" cy="106" rx="18" ry="6" fill="#a16207" />

            {/* Dry Thin Aussie Weed Stem */}
            <path d="M 50 106 Q 42 78 48 48" stroke="#a16207" strokeWidth="9" fill="none" strokeLinecap="round" />
            <path d="M 50 106 Q 42 78 48 48" stroke="#facc15" strokeWidth="2" strokeDasharray="4,6" fill="none" opacity="0.7" />

            {/* Stem prickles */}
            <polygon points="40,82 34,80 41,76" fill="#713f12" />
            <polygon points="54,68 60,66 53,62" fill="#713f12" />

            {/* Yellowish Aussie Weed Head Cannon */}
            <circle cx="48" cy="40" r="23" fill="#facc15" stroke="#a16207" strokeWidth="3.5" />
            
            {/* Dry Weed Head Crest / Prickles on top */}
            <polygon points="38,18 42,6 46,18" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
            <polygon points="48,16 52,4 56,16" fill="#eab308" stroke="#713f12" strokeWidth="1" />
            <polygon points="26,26 22,14 32,22" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />

            {/* Prickly Weed Cannon Muzzle */}
            <ellipse cx="74" cy="40" rx="14" ry="10" fill="#eab308" stroke="#a16207" strokeWidth="3" />
            <ellipse cx="81" cy="40" rx="5" ry="8" fill="#713f12" />

            {/* Small Feisty Eyes */}
            <circle cx="48" cy="32" r="4.5" fill="#000" />
            <circle cx="46.5" cy="30.5" r="1.5" fill="#fff" />
            <circle cx="60" cy="32" r="4.5" fill="#000" />
            <circle cx="58.5" cy="30.5" r="1.5" fill="#fff" />

            {/* Feisty Eyebrow */}
            <path d="M 42 25 L 64 28" stroke="#713f12" strokeWidth="2.5" strokeLinecap="round" />

            {/* Back Head Leaf / Prickle */}
            <path d="M 24 40 Q 12 36 16 24 Q 28 28 28 38 Z" fill="#a16207" />
          </svg>
        </div>
      );

    case 'grillflower':
    case 'sunflower':
      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-pulse-slow' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            {/* Stem */}
            <path d="M 50 110 Q 52 80 50 50" stroke="#15803d" strokeWidth="10" fill="none" strokeLinecap="round" />
            {/* Leaf 1 & 2 */}
            <ellipse cx="30" cy="100" rx="16" ry="7" fill="#16a34a" transform="rotate(-20 30 100)" />
            <ellipse cx="70" cy="100" rx="16" ry="7" fill="#16a34a" transform="rotate(20 70 100)" />
            
            {/* Outer BBQ Grill Ring */}
            <circle cx="50" cy="45" r="32" fill="#27272a" stroke="#52525b" strokeWidth="4" />
            
            {/* Glowing Orange/Red Embers Core */}
            <circle cx="50" cy="45" r="25" fill="#f97316" stroke="#ea580c" strokeWidth="2" />
            <circle cx="50" cy="45" r="18" fill="#ef4444" opacity="0.8" />
            <circle cx="50" cy="45" r="10" fill="#fef08a" opacity="0.9" className="animate-pulse" />

            {/* Metal Grill Bars */}
            <line x1="28" y1="35" x2="72" y2="35" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="25" y1="45" x2="75" y2="45" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="28" y1="55" x2="72" y2="55" stroke="#71717a" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cute Face in center */}
            <circle cx="42" cy="42" r="3.5" fill="#000" />
            <circle cx="41" cy="40.5" r="1.2" fill="#fff" />
            <circle cx="58" cy="42" r="3.5" fill="#000" />
            <circle cx="57" cy="40.5" r="1.2" fill="#fff" />
            <path d="M 43 50 Q 50 56 57 50" stroke="#000" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Grill Side Handles */}
            <rect x="12" y="42" width="6" height="6" fill="#71717a" rx="1" />
            <rect x="82" y="42" width="6" height="6" fill="#71717a" rx="1" />

            {/* Heat Sparks */}
            <circle cx="35" cy="18" r="2" fill="#fde047" className="animate-ping" />
            <circle cx="62" cy="14" r="2.5" fill="#f97316" className="animate-ping" />
          </svg>
        </div>
      );

    case 'potatomine':
      const isArmed = state === 'armed';
      return (
        <div className="relative w-14 h-14 flex flex-col items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
            <defs>
              <linearGradient id="lemonRindGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="45%" stopColor="#facc15" />
                <stop offset="90%" stopColor="#eab308" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
              <linearGradient id="lemonLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86efac" />
                <stop offset="60%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#15803d" />
              </linearGradient>
            </defs>

            {/* Dirt mound */}
            <path d="M 12 82 Q 50 66 88 82 Q 50 96 12 82 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            <ellipse cx="50" cy="83" rx="30" ry="6" fill="#451a03" opacity="0.6" />

            {/* Lemon Body (Oval with distinctive lemon tips) */}
            <g transform={isArmed ? 'translate(0, 0)' : 'translate(0, 14)'}>
              {/* Pointed Left & Right Lemon Nubs */}
              <ellipse cx="50" cy="54" rx="32" ry="22" fill="url(#lemonRindGrad)" stroke="#ca8a04" strokeWidth="3.5" />
              <path d="M 18 54 Q 12 54 15 51 Q 19 49 22 53 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />
              <path d="M 82 54 Q 88 54 85 51 Q 81 49 78 53 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="2.5" />

              {/* Citrus Dimples / Rind Texture */}
              <circle cx="30" cy="46" r="1.2" fill="#ca8a04" opacity="0.4" />
              <circle cx="70" cy="47" r="1.2" fill="#ca8a04" opacity="0.4" />
              <circle cx="50" cy="66" r="1.2" fill="#ca8a04" opacity="0.4" />
              <circle cx="64" cy="62" r="1" fill="#ca8a04" opacity="0.35" />
              <circle cx="36" cy="62" r="1" fill="#ca8a04" opacity="0.35" />

              {/* Lemon Rind Highlight Glaze */}
              <path d="M 28 42 Q 50 36 72 42" stroke="#fef9c3" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />

              {/* Green Citrus Leaves on Top */}
              <path d="M 44 34 C 36 28 32 20 40 18 C 47 22 47 30 46 34 Z" fill="url(#lemonLeafGrad)" stroke="#166534" strokeWidth="1.5" />
              <path d="M 54 34 C 62 28 66 20 58 18 C 51 22 51 30 52 34 Z" fill="url(#lemonLeafGrad)" stroke="#166534" strokeWidth="1.5" />

              {/* Big Expressive Eyes */}
              <ellipse cx="38" cy="50" rx="5" ry="6" fill="#000" />
              <ellipse cx="62" cy="50" rx="5" ry="6" fill="#000" />
              <circle cx="36.5" cy="48" r="2" fill="#fff" />
              <circle cx="60.5" cy="48" r="2" fill="#fff" />
              <circle cx="40" cy="53" r="0.8" fill="#fff" />
              <circle cx="64" cy="53" r="0.8" fill="#fff" />

              {/* Rosy Sour Cheeks */}
              <ellipse cx="30" cy="56" rx="3.5" ry="2" fill="#f97316" opacity="0.45" />
              <ellipse cx="70" cy="56" rx="3.5" ry="2" fill="#f97316" opacity="0.45" />

              {/* Mouth & Buck Teeth */}
              <path d="M 42 60 Q 50 66 58 60" stroke="#713f12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <rect x="46" y="60" width="3.5" height="4" fill="#fff" stroke="#ca8a04" strokeWidth="0.8" rx="0.8" />
              <rect x="50.5" y="60" width="3.5" height="4" fill="#fff" stroke="#ca8a04" strokeWidth="0.8" rx="0.8" />

              {/* Antenna / Beacon Fuse */}
              <path d="M 50 34 L 50 16" stroke="#451a03" strokeWidth="3" strokeLinecap="round" />
              <circle
                cx="50"
                cy="12"
                r={isArmed ? "7" : "5"}
                fill={isArmed ? '#ef4444' : '#a1a1aa'}
                stroke={isArmed ? '#991b1b' : '#52525b'}
                strokeWidth="1.5"
                className={isArmed ? 'animate-ping-fast' : ''}
              />
              {isArmed && (
                <>
                  <circle cx="50" cy="12" r="3" fill="#fef08a" />
                  {/* Flashing Sour Sparkles */}
                  <line x1="42" y1="12" x2="38" y2="12" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                  <line x1="58" y1="12" x2="62" y2="12" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                  <line x1="50" y1="4" x2="50" y2="1" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </g>
          </svg>
        </div>
      );

    case 'walnut': {
      // 4 Progressive Damage Phases:
      // Phase 1 (1.0 - 0.75): Pristine Classic Wall-nut with cute Wallaby Mask & Costume
      // Phase 2 (0.75 - 0.50): Light Scuffs, Mask Askew, Seams Ripping with Exposed Fluff
      // Phase 3 (0.50 - 0.25): Heavily Torn Costume, Mask Hanging by Neck, Shell Cracked
      // Phase 4 (0.25 - 0.0): Shredded Tatters, Broken Mask, Classic PvZ Low-HP Crying Nut
      const phase = hpPercent > 0.75 ? 1 : hpPercent > 0.50 ? 2 : hpPercent > 0.25 ? 3 : 4;

      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-sway' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md overflow-visible">
            <defs>
              {/* Classic PvZ Smooth Nut Shell Gradient */}
              <linearGradient id="classicNutGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="25%" stopColor="#b45309" />
                <stop offset="60%" stopColor="#92400e" />
                <stop offset="90%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>

              {/* Nut Shell Highlight Gradient */}
              <linearGradient id="classicNutHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#d97706" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
              </linearGradient>

              {/* Wallaby Costume Fabric Gradient */}
              <linearGradient id="wallabyCostumeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a16207" />
                <stop offset="50%" stopColor="#854d0e" />
                <stop offset="100%" stopColor="#58290c" />
              </linearGradient>

              {/* Exposed Nut Meat Gradient (Bite Damage) */}
              <radialGradient id="classicNutMeatGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#78350f" />
              </radialGradient>
            </defs>

            {/* ========================================================
                1. BASE ASSET: THE CLASSIC ICONIC PVZ WALL-NUT
               ======================================================== */}
            {/* Classic Smooth Oblong PvZ Wall-nut Shell */}
            <path
              d="M 50 16 
                 C 73 16, 86 30, 85 54 
                 C 84 76, 82 94, 73 104 
                 C 63 113, 37 113, 27 104 
                 C 18 94, 16 76, 15 54 
                 C 14 30, 27 16, 50 16 Z"
              fill="url(#classicNutGrad)"
              stroke="#381504"
              strokeWidth="3.8"
              strokeLinejoin="round"
            />

            {/* Classic Nut Specular Highlight & Soft Belly Glow */}
            <path
              d="M 48 20 C 66 20, 78 32, 77 48 C 76 60, 68 66, 50 66 C 32 66, 24 58, 23 46 C 22 32, 34 20, 48 20 Z"
              fill="url(#classicNutHighlight)"
              opacity="0.75"
            />
            <ellipse cx="50" cy="62" rx="24" ry="32" fill="#d97706" opacity="0.3" />

            {/* Subtle Classic Nut Shell Contour Lines */}
            <path d="M 32 24 Q 48 28 66 24" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
            <path d="M 22 56 Q 20 78 28 94" stroke="#451a03" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />
            <path d="M 78 56 Q 80 78 72 94" stroke="#451a03" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.4" />

            {/* Rosy Cheeks (Visible in all phases) */}
            <ellipse cx="26" cy="50" rx="4.5" ry="3" fill="#ea580c" opacity="0.4" />
            <ellipse cx="74" cy="50" rx="4.5" ry="3" fill="#ea580c" opacity="0.4" />

            {/* ========================================================
                2. CLASSIC NUT DAMAGE: BITES & CRACKS (Phases 3 & 4)
               ======================================================== */}
            {/* Phase 3: Classic Upper-Right Bite & Crack */}
            {phase === 3 && (
              <g>
                {/* Bite missing on right shoulder */}
                <path
                  d="M 74 34 Q 66 38 68 46 Q 64 54 75 58 Q 83 48 85 40 Z"
                  fill="url(#classicNutMeatGrad)"
                  stroke="#381504"
                  strokeWidth="2.5"
                />
                <path d="M 68 46 L 60 50 L 62 58" stroke="#292524" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Aussie Band-Aid on lower left */}
                <rect x="20" y="80" width="16" height="7" rx="2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" transform="rotate(20 28 83)" />
                <circle cx="28" cy="83.5" r="1.2" fill="#ca8a04" />
              </g>
            )}

            {/* Phase 4: Classic Dual Severe Bites & Deep Fractures */}
            {phase === 4 && (
              <g>
                {/* Large Missing Chunk on Right Shoulder */}
                <path
                  d="M 70 30 Q 58 36 62 48 Q 56 60 74 64 Q 86 52 86 38 Z"
                  fill="url(#classicNutMeatGrad)"
                  stroke="#381504"
                  strokeWidth="2.5"
                />
                {/* Missing Chunk on Left Flank */}
                <path
                  d="M 16 62 Q 26 66 24 78 Q 18 86 14 76 Z"
                  fill="url(#classicNutMeatGrad)"
                  stroke="#381504"
                  strokeWidth="2.5"
                />
                {/* Deep Fracture Lines */}
                <path d="M 62 48 L 52 54 L 54 66" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 24 78 L 34 84 L 30 96" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 46 16 L 52 24 L 48 30" stroke="#1c1917" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Desperate Bandages */}
                <rect x="64" y="76" width="16" height="7" rx="2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" transform="rotate(-25 72 79)" />
                <rect x="20" y="84" width="16" height="7" rx="2" fill="#fde047" stroke="#ca8a04" strokeWidth="1" transform="rotate(25 28 87)" />
              </g>
            )}

            {/* ========================================================
                3. CLASSIC PVZ WALL-NUT EYES & FACIAL EXPRESSIONS
               ======================================================== */}
            {/* Phase 1: Classic Goofy Staring Eyes & Smile */}
            {phase === 1 && (
              <g>
                {/* Left Eye */}
                <ellipse cx="36" cy="40" rx="8.5" ry="11.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <ellipse cx="38" cy="41" rx="4.5" ry="6.5" fill="#1c1917" />
                <circle cx="36" cy="38" r="2.2" fill="#ffffff" />
                <circle cx="40" cy="43" r="1.2" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="62" cy="40" rx="8.5" ry="11.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <ellipse cx="64" cy="41" rx="4.5" ry="6.5" fill="#1c1917" />
                <circle cx="62" cy="38" r="2.2" fill="#ffffff" />
                <circle cx="66" cy="43" r="1.2" fill="#ffffff" />

                {/* Cute Goofy Smile */}
                <path d="M 44 58 Q 50 64 56 58" stroke="#381504" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Phase 2: Bravely Gritted / Nervous Smile */}
            {phase === 2 && (
              <g>
                {/* Left Eye */}
                <ellipse cx="36" cy="40" rx="8.5" ry="11.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <ellipse cx="38.5" cy="41.5" rx="4.5" ry="6" fill="#1c1917" />
                <circle cx="36.5" cy="39" r="2" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="62" cy="40" rx="8.5" ry="11.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <ellipse cx="64.5" cy="41.5" rx="4.5" ry="6" fill="#1c1917" />
                <circle cx="62.5" cy="39" r="2" fill="#ffffff" />

                {/* Nervous Straight/Wavy Smile */}
                <path d="M 43 59 Q 50 62 57 59" stroke="#381504" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Tiny Sweat Drop */}
                <path d="M 74 34 Q 72 40 75 42 Q 78 40 76 34 Z" fill="#60a5fa" opacity="0.8" />
              </g>
            )}

            {/* Phase 3: Worried / Pained Face with Tear Droplet */}
            {phase === 3 && (
              <g>
                {/* Angled Strained Eyebrows */}
                <path d="M 28 28 L 43 25" stroke="#381504" strokeWidth="3" strokeLinecap="round" />
                <path d="M 70 28 L 55 25" stroke="#381504" strokeWidth="3" strokeLinecap="round" />

                {/* Left Eye */}
                <ellipse cx="36" cy="41" rx="8.5" ry="10.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <path d="M 28 41 Q 36 34 44 42" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />

                {/* Right Eye */}
                <ellipse cx="62" cy="41" rx="8.5" ry="10.5" fill="#ffffff" stroke="#381504" strokeWidth="2.2" />
                <path d="M 70 41 Q 62 34 54 42" stroke="#1c1917" strokeWidth="3.5" fill="none" strokeLinecap="round" />

                {/* Single Tear Drop */}
                <path d="M 33 48 Q 30 55 33 58 Q 36 55 33 48 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <circle cx="32.5" cy="55" r="1" fill="#ffffff" />

                {/* Trembling Mouth */}
                <path d="M 43 59 Q 47 56 50 58 Q 53 56 57 59" stroke="#381504" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}

            {/* Phase 4: CLASSIC PVZ LOW-HP WALL-NUT (Waterfalls of Tears & Open Agonized Mouth) */}
            {phase === 4 && (
              <g>
                {/* Desperate Anguished Eyebrows */}
                <path d="M 27 28 L 43 21" stroke="#2e1103" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 71 28 L 55 21" stroke="#2e1103" strokeWidth="3.5" strokeLinecap="round" />

                {/* Left Eye with dilated panicked pupil */}
                <ellipse cx="36" cy="40" rx="9" ry="11" fill="#ffffff" stroke="#2e1103" strokeWidth="2.5" />
                <ellipse cx="37" cy="42" rx="4" ry="5" fill="#1c1917" />
                <circle cx="35" cy="39" r="1.5" fill="#ffffff" />
                <path d="M 27 47 Q 36 52 45 47" stroke="#581c87" strokeWidth="1.5" fill="none" opacity="0.6" />

                {/* Right Eye */}
                <ellipse cx="62" cy="40" rx="9" ry="11" fill="#ffffff" stroke="#2e1103" strokeWidth="2.5" />
                <ellipse cx="61" cy="42" rx="4" ry="5" fill="#1c1917" />
                <circle cx="59" cy="39" r="1.5" fill="#ffffff" />
                <path d="M 53 47 Q 62 52 71 47" stroke="#581c87" strokeWidth="1.5" fill="none" opacity="0.6" />

                {/* Cascading Streams of Tears */}
                <path d="M 33 48 Q 28 60 32 68 Q 37 60 34 48 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <circle cx="31" cy="72" r="2" fill="#38bdf8" />
                <path d="M 65 48 Q 70 60 66 68 Q 61 60 64 48 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <circle cx="67" cy="72" r="2" fill="#38bdf8" />

                {/* Classic PvZ Wide Open Gasping Mouth */}
                <path d="M 40 57 Q 50 50 60 57 Q 50 69 40 57 Z" fill="#1c1917" stroke="#451a03" strokeWidth="2" />
                <ellipse cx="50" cy="62" rx="4" ry="2.5" fill="#f87171" />
              </g>
            )}

            {/* ========================================================
                4. WALLABY COSTUME & MASK (Progressively Ripping Layers)
               ======================================================== */}

            {/* --- PHASE 1: Pristine Wallaby Mask & Furry Vest Costume --- */}
            {phase === 1 && (
              <g>
                {/* Wallaby Headband & Mask Straps */}
                <path d="M 18 30 Q 50 22 82 30" stroke="#713f12" strokeWidth="3" fill="none" />
                <path d="M 20 30 Q 50 22 80 30" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />

                {/* Wallaby Plush Ears */}
                {/* Left Ear */}
                <g transform="rotate(-12 30 18)">
                  <path d="M 22 24 C 12 6 16 -4 28 0 C 36 4 36 15 33 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 23 20 C 17 8 20 2 27 5 C 31 8 31 15 29 22 Z" fill="#fda4af" />
                  <path d="M 20 24 L 34 26" stroke="#fde047" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>
                {/* Right Ear */}
                <g transform="rotate(12 70 18)">
                  <path d="M 78 24 C 88 6 84 -4 72 0 C 64 4 64 15 67 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 77 20 C 83 8 80 2 73 5 C 69 8 69 15 71 22 Z" fill="#fda4af" />
                  <path d="M 66 26 L 80 24" stroke="#fde047" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>

                {/* Wallaby Snout Mask with Whiskers */}
                <ellipse cx="50" cy="52" rx="11" ry="7.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.8" />
                <path d="M 46 47 Q 50 45 54 47 Q 50 51 46 47 Z" fill="#1c1917" stroke="#0c0a09" strokeWidth="1" />
                {/* Whiskers */}
                <path d="M 38 50 L 26 48 M 38 53 L 25 54" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 62 50 L 74 48 M 62 53 L 75 54" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />

                {/* Wallaby Furry Vest & Pouch around lower body */}
                <path
                  d="M 22 68 
                     C 18 82, 22 100, 50 106 
                     C 78 100, 82 82, 78 68 
                     C 68 73, 32 73, 22 68 Z"
                  fill="url(#wallabyCostumeGrad)"
                  stroke="#451a03"
                  strokeWidth="2.8"
                />
                {/* Yellow Stitches along neckline */}
                <path d="M 24 69 Q 50 74 76 69" stroke="#fde047" strokeWidth="1.8" strokeDasharray="4 3" fill="none" />

                {/* Costume Belly Pouch with joey pocket */}
                <ellipse cx="50" cy="88" rx="20" ry="14" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                <path d="M 39 88 Q 50 93 61 88" stroke="#92400e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 38 89 Q 50 94 62 89" stroke="#fde047" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

                {/* Costume Paws */}
                <ellipse cx="34" cy="74" rx="5" ry="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" transform="rotate(-15 34 74)" />
                <ellipse cx="66" cy="74" rx="5" ry="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" transform="rotate(15 66 74)" />
              </g>
            )}

            {/* --- PHASE 2: Light Rips & Scuffs (Seams tearing, stuffing poking out) --- */}
            {phase === 2 && (
              <g>
                {/* Headband Fraying on Left */}
                <path d="M 18 30 Q 50 22 82 30" stroke="#713f12" strokeWidth="3" fill="none" />
                <path d="M 24 30 Q 50 22 78 30" stroke="#fde047" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
                {/* Dangling thread */}
                <path d="M 20 31 Q 14 36 17 40" stroke="#fde047" strokeWidth="1.2" fill="none" />

                {/* Wallaby Ears (Right ear tilting sideways) */}
                <g transform="rotate(-12 30 18)">
                  <path d="M 22 24 C 12 6 16 -4 28 0 C 36 4 36 15 33 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 23 20 C 17 8 20 2 27 5 C 31 8 31 15 29 22 Z" fill="#fda4af" />
                  <path d="M 20 24 L 34 26" stroke="#fde047" strokeWidth="1.5" strokeDasharray="2 2" />
                </g>
                <g transform="rotate(26 70 20)">
                  <path d="M 78 24 C 88 6 84 -4 72 0 C 64 4 64 15 67 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 77 20 C 83 8 80 2 73 5 C 69 8 69 15 71 22 Z" fill="#fda4af" />
                  {/* Torn stitch at base */}
                  <path d="M 68 26 L 76 25" stroke="#451a03" strokeWidth="2" />
                </g>

                {/* Mask slightly crooked */}
                <g transform="rotate(6 50 52)">
                  <ellipse cx="50" cy="52" rx="11" ry="7.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.8" />
                  <path d="M 46 47 Q 50 45 54 47 Q 50 51 46 47 Z" fill="#1c1917" stroke="#0c0a09" strokeWidth="1" />
                  <path d="M 38 50 L 26 48 M 38 53 L 25 54" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 62 50 L 74 48 M 62 53 L 75 54" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />
                </g>

                {/* Wallaby Vest with First Rips on Left Flank */}
                <path
                  d="M 22 68 
                     L 26 74 L 18 80 L 25 88
                     C 28 98, 38 104, 50 106 
                     C 78 100, 82 82, 78 68 
                     C 68 73, 32 73, 22 68 Z"
                  fill="url(#wallabyCostumeGrad)"
                  stroke="#451a03"
                  strokeWidth="2.8"
                />
                {/* Exposed Cotton Fluff / Stuffing poking out of the tear */}
                <circle cx="18" cy="80" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="21" cy="77" r="2.5" fill="#fef9c3" />
                <path d="M 26 74 Q 18 82 22 88" stroke="#fde047" strokeWidth="1.5" fill="none" />

                {/* Belly Pouch with small tear */}
                <ellipse cx="50" cy="88" rx="20" ry="14" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                <path d="M 39 88 Q 50 93 61 88" stroke="#92400e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 44 88 L 48 94" stroke="#451a03" strokeWidth="1.8" />

                {/* Costume Paws */}
                <ellipse cx="34" cy="74" rx="5" ry="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" transform="rotate(-25 34 74)" />
                <ellipse cx="66" cy="74" rx="5" ry="3.5" fill="#78350f" stroke="#451a03" strokeWidth="1.5" transform="rotate(15 66 74)" />
              </g>
            )}

            {/* --- PHASE 3: Heavily Torn Costume (Mask hanging off neck, ears dangling, large holes) --- */}
            {phase === 3 && (
              <g>
                {/* Snapped Headband Clinging */}
                <path d="M 32 28 Q 50 22 72 26" stroke="#713f12" strokeWidth="2.5" fill="none" />
                <path d="M 72 26 Q 78 32 74 38" stroke="#fde047" strokeWidth="1.5" fill="none" />

                {/* Left Ear Dangling Sideways by a Thread */}
                <g transform="rotate(-48 26 24)">
                  <path d="M 22 24 C 12 6 16 -4 28 0 C 36 4 36 15 33 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 23 20 C 17 8 20 2 27 5 C 31 8 31 15 29 22 Z" fill="#fda4af" />
                  {/* Fraying Thread */}
                  <path d="M 28 26 Q 34 32 30 38" stroke="#fde047" strokeWidth="1.5" fill="none" />
                </g>

                {/* Right Ear Flopped Over */}
                <g transform="rotate(50 72 24)">
                  <path d="M 78 24 C 88 6 84 -4 72 0 C 64 4 64 15 67 26 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2.5" />
                  <path d="M 77 20 C 83 8 80 2 73 5 C 69 8 69 15 71 22 Z" fill="#fda4af" />
                </g>

                {/* Snout Mask Pulled Down Around Neck / Hanging Crookedly */}
                <g transform="rotate(22 54 68)">
                  <ellipse cx="54" cy="68" rx="9.5" ry="6.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" opacity="0.9" />
                  <path d="M 51 64 Q 54 62 57 64 Q 54 68 51 64 Z" fill="#1c1917" />
                  <path d="M 44 66 L 34 64" stroke="#451a03" strokeWidth="1.2" />
                  <path d="M 64 66 L 74 64" stroke="#451a03" strokeWidth="1.2" />
                </g>

                {/* Tattered Ripped Vest Flaps */}
                <path
                  d="M 28 72 
                     L 24 82 L 32 88 L 26 98
                     C 36 104, 44 105, 50 106 
                     C 62 104, 72 98, 76 86 
                     L 68 80 L 76 74 
                     C 66 76, 42 74, 28 72 Z"
                  fill="url(#wallabyCostumeGrad)"
                  stroke="#451a03"
                  strokeWidth="2.5"
                />
                {/* Fluff Clumps Bursting Out of Rips */}
                <circle cx="24" cy="82" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="72" cy="82" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                <circle cx="74" cy="80" r="2.5" fill="#fef9c3" />

                {/* Ripped Pouch Remnant */}
                <path d="M 38 88 Q 50 82 62 88 Q 58 98 50 99 Q 42 98 38 88 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="1.8" />
                <path d="M 48 88 L 54 96" stroke="#451a03" strokeWidth="1.8" />
              </g>
            )}

            {/* --- PHASE 4: Shredded Costume Tatters (Ragged scraps & strings clinging to Wall-nut) --- */}
            {phase === 4 && (
              <g>
                {/* Broken Mask Hanging Pathetically at the Bottom */}
                <g transform="rotate(35 60 88)">
                  <ellipse cx="60" cy="88" rx="8" ry="5.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" opacity="0.85" />
                  <path d="M 57 85 Q 60 83 63 85 Q 60 89 57 85 Z" fill="#1c1917" />
                  <path d="M 52 87 L 44 85" stroke="#451a03" strokeWidth="1" />
                </g>

                {/* Shredded Fabric Rags Clinging to Flanks */}
                <path d="M 18 52 L 26 58 L 19 66 L 14 60 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2" />
                <path d="M 80 54 L 72 60 L 78 68 L 84 62 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2" />
                <path d="M 34 94 L 44 92 L 40 102 L 30 100 Z" fill="url(#wallabyCostumeGrad)" stroke="#451a03" strokeWidth="2" />

                {/* Fluff Clumps */}
                <circle cx="21" cy="62" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />
                <circle cx="76" cy="64" r="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.8" />

                {/* Loose Dangling Threads */}
                <path d="M 19 66 Q 14 76 18 82" stroke="#fde047" strokeWidth="1.4" fill="none" />
                <path d="M 78 68 Q 84 78 80 84" stroke="#fde047" strokeWidth="1.4" fill="none" />
                <path d="M 28 26 Q 22 32 25 38" stroke="#fde047" strokeWidth="1.4" fill="none" />
                <path d="M 72 26 Q 78 32 75 38" stroke="#fde047" strokeWidth="1.4" fill="none" />

                {/* Ear Stubs / Torn off remnants */}
                <path d="M 26 24 Q 20 28 24 32" stroke="#451a03" strokeWidth="2.5" fill="#854d0e" />
                <path d="M 74 24 Q 80 28 76 32" stroke="#451a03" strokeWidth="2.5" fill="#854d0e" />
              </g>
            )}
          </svg>
        </div>
      );
    }

    case 'repeater':
      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Prickly Yellowish-Green Weed Base Leaves */}
            <ellipse cx="28" cy="102" rx="18" ry="8" fill="#ca8a04" transform="rotate(-25 28 102)" />
            <polygon points="10,98 17,92 14,105" fill="#854d0e" />
            <ellipse cx="72" cy="102" rx="18" ry="8" fill="#ca8a04" transform="rotate(25 72 102)" />
            <polygon points="90,98 83,92 86,105" fill="#854d0e" />
            <ellipse cx="50" cy="106" rx="20" ry="7" fill="#a16207" />

            {/* Dry Aussie Weed Stem */}
            <path d="M 50 106 Q 42 78 48 48" stroke="#a16207" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 50 106 Q 42 78 48 48" stroke="#facc15" strokeWidth="2.5" strokeDasharray="4,6" fill="none" opacity="0.8" />

            {/* Stem prickles */}
            <polygon points="38,84 30,82 39,77" fill="#713f12" />
            <polygon points="56,70 64,68 55,63" fill="#713f12" />

            {/* Yellowish Aussie Weed Head Cannon */}
            <circle cx="48" cy="40" r="26" fill="#facc15" stroke="#a16207" strokeWidth="4" />

            {/* Dual Back Weed Foliage / Tuft */}
            <path d="M 22 36 Q 4 30 8 14 Q 24 18 25 32 Z" fill="#a16207" />
            <path d="M 20 44 Q 6 48 10 58 Q 24 50 24 42 Z" fill="#854d0e" />

            {/* Weed Head Crest Spikes (Dual Repeater Crests) */}
            <polygon points="34,16 38,2 44,15" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />
            <polygon points="46,14 50,0 56,13" fill="#eab308" stroke="#713f12" strokeWidth="1" />
            <polygon points="58,16 63,4 67,18" fill="#ca8a04" stroke="#713f12" strokeWidth="1" />

            {/* Dual Weed Cannon Snout */}
            <ellipse cx="76" cy="40" rx="16" ry="12" fill="#eab308" stroke="#a16207" strokeWidth="3.5" />
            <ellipse cx="86" cy="40" rx="6" ry="9" fill="#713f12" />
            <ellipse cx="74" cy="40" rx="10" ry="7" fill="#ca8a04" opacity="0.4" />

            {/* Determined Feisty Brow & Eyes */}
            <path d="M 38 23 L 64 27" stroke="#713f12" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="46" cy="31" r="5" fill="#000" />
            <circle cx="44.5" cy="29.5" r="1.5" fill="#fff" />
            <circle cx="60" cy="32" r="5" fill="#000" />
            <circle cx="58.5" cy="30.5" r="1.5" fill="#fff" />
          </svg>
        </div>
      );

    case 'snowpea':
      return (
        <div className={`relative w-14 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
            {/* Stem */}
            <path d="M 50 110 Q 45 80 50 50" stroke="#0369a1" strokeWidth="12" fill="none" strokeLinecap="round" />
            <ellipse cx="30" cy="100" rx="18" ry="8" fill="#0284c7" transform="rotate(-20 30 100)" />
            <ellipse cx="70" cy="100" rx="18" ry="8" fill="#0284c7" transform="rotate(20 70 100)" />
            {/* Head (Icy Cyan/Blue) */}
            <circle cx="50" cy="40" r="28" fill="#38bdf8" stroke="#0284c7" strokeWidth="4" />
            {/* Ice Crystals Back */}
            <polygon points="18,30 28,38 12,48 26,48 18,60 32,52" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Snout */}
            <ellipse cx="78" cy="40" rx="16" ry="12" fill="#0284c7" stroke="#0369a1" strokeWidth="4" />
            <ellipse cx="86" cy="40" rx="6" ry="10" fill="#0c4a6e" />
            {/* Eyes */}
            <circle cx="52" cy="30" r="5" fill="#000" />
            <circle cx="50" cy="28" r="1.5" fill="#fff" />
            <circle cx="64" cy="30" r="5" fill="#000" />
            <circle cx="62" cy="28" r="1.5" fill="#fff" />
          </svg>
        </div>
      );

    case 'cherrybomb':
      return (
        <div className="relative w-16 h-16 flex items-center justify-center animate-wiggle">
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-lg">
            {/* Fuse */}
            <path d="M 60 45 Q 60 20 75 10" stroke="#78350f" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="76" cy="9" r="4" fill="#ef4444" className="animate-ping" />
            {/* Cherry 1 */}
            <circle cx="42" cy="65" r="26" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
            <ellipse cx="34" cy="55" rx="6" ry="10" fill="#fca5a5" transform="rotate(-30 34 55)" opacity="0.6" />
            {/* Angry Face Cherry 1 */}
            <path d="M 32 58 L 44 62" stroke="#450a0a" strokeWidth="4" />
            <circle cx="36" cy="65" r="3" fill="#000" />
            <circle cx="48" cy="67" r="3" fill="#000" />

            {/* Cherry 2 */}
            <circle cx="78" cy="65" r="26" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
            <ellipse cx="70" cy="55" rx="6" ry="10" fill="#fca5a5" transform="rotate(-30 70 55)" opacity="0.6" />
            {/* Angry Face Cherry 2 */}
            <path d="M 82 58 L 70 62" stroke="#450a0a" strokeWidth="4" />
            <circle cx="72" cy="67" r="3" fill="#000" />
            <circle cx="84" cy="65" r="3" fill="#000" />
          </svg>
        </div>
      );

    case 'chomper':
      const isChewing = state === 'chewing';
      let chewProgress = 0;
      let chewSecs = 0;
      if (isChewing && chewEndTime) {
        const now = currentTime !== undefined ? currentTime : performance.now();
        const remainingMs = Math.max(0, chewEndTime - now);
        chewSecs = Math.ceil(remainingMs / 1000);
        chewProgress = Math.min(100, Math.max(0, ((6000 - remainingMs) / 6000) * 100));
      }
      return (
        <div className={`relative w-18 h-20 flex flex-col items-center justify-center ${isAnimated && !isChewing ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 110 120" className="w-full h-full drop-shadow-xl overflow-visible">
            {/* Ground Leaf Base */}
            <ellipse cx="30" cy="110" rx="22" ry="7" fill="#15803d" transform="rotate(-15 30 110)" />
            <ellipse cx="70" cy="110" rx="22" ry="7" fill="#15803d" transform="rotate(15 70 110)" />
            <ellipse cx="50" cy="113" rx="26" ry="6" fill="#166534" />

            {/* Purple Vine Stem */}
            <path d="M 45 110 Q 38 80 44 55" stroke="#7e22ce" strokeWidth="12" fill="none" strokeLinecap="round" />
            <path d="M 45 110 Q 38 80 44 55" stroke="#a855f7" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />

            {/* Blue Australian Flag Bandana tied around stem */}
            <g transform="translate(22, 46)">
              {/* Knot */}
              <circle cx="20" cy="12" r="5" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1" />
              {/* Triangular hanging scarf */}
              <path d="M 20 12 L 2 34 Q 18 38 34 28 Z" fill="#1d4ed8" stroke="#1e40af" strokeWidth="1.5" />
              {/* Southern Cross White Stars on Bandana */}
              <circle cx="12" cy="22" r="1.5" fill="#fff" />
              <circle cx="20" cy="24" r="1.5" fill="#fff" />
              <circle cx="26" cy="20" r="1.5" fill="#fff" />
              <circle cx="18" cy="29" r="1.2" fill="#fff" />
            </g>

            {isChewing ? (
              /* CHEWING STATE: Dingo head gulping down zombie arm! */
              <g className="animate-pulse">
                {/* Dingo Outer Head Structure */}
                <path d="M 18 35 C 18 10, 60 5, 88 28 C 95 38, 75 58, 50 58 C 28 58, 18 50, 18 35 Z" fill="#d97706" stroke="#78350f" strokeWidth="3" />
                {/* Lighter Cream Fur Underbelly */}
                <path d="M 22 42 Q 50 56 82 38 Q 60 55 22 42 Z" fill="#fde047" opacity="0.9" />

                {/* Pointed Dingo Ears */}
                <polygon points="32,18 20,-8 42,8" fill="#ea580c" stroke="#78350f" strokeWidth="2.5" />
                <polygon points="30,16 22,-2 38,8" fill="#fca5a5" />

                {/* Dangling Aussie Cork on Ear */}
                <path d="M 22 -2 Q 14 2 12 12" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <rect x="8" y="12" width="7" height="9" fill="#d97706" stroke="#78350f" strokeWidth="1" rx="1.5" />

                {/* Clamped Jaw Seam */}
                <path d="M 32 42 Q 60 48 86 32" stroke="#450a0a" strokeWidth="3.5" strokeLinecap="round" />

                {/* Fangs interlocking */}
                <polygon points="40,38 43,44 46,38" fill="#fff" />
                <polygon points="52,40 55,47 58,40" fill="#fff" />
                <polygon points="66,38 69,45 72,38" fill="#fff" />

                {/* ZOMBIE ARM HANGING OUT OF MOUTH */}
                <g transform="translate(62, 30) rotate(15)">
                  {/* Tattered Sleeve */}
                  <path d="M 0 0 L 18 4 L 16 12 L 0 8 Z" fill="#334155" stroke="#0f172a" strokeWidth="1" />
                  {/* Decaying Green Arm */}
                  <rect x="14" y="3" width="22" height="7" fill="#65a30d" rx="2" stroke="#3f6212" strokeWidth="1" />
                  {/* Zombie Hand Fingers */}
                  <path d="M 36 3 L 42 1 L 40 5 L 43 7 L 39 9 L 36 10" stroke="#3f6212" strokeWidth="1.5" fill="#65a30d" />
                </g>

                {/* Sly Satisfied Eye */}
                <ellipse cx="54" cy="22" rx="6" ry="3.5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="55" cy="22" r="2" fill="#000" />
                <path d="M 46 18 Q 55 16 62 20" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Black Nose */}
                <ellipse cx="88" cy="26" rx="4.5" ry="3.5" fill="#27272a" />
              </g>
            ) : (
              /* IDLE STATE: Wide Gaping Maw Facing Right! */
              <g>
                {/* Upper Dingo Head / Jaw */}
                <path d="M 18 35 C 18 8, 60 2, 92 20 L 80 40 C 55 32, 30 38, 18 35 Z" fill="#d97706" stroke="#78350f" strokeWidth="3" />
                
                {/* Furry Highlights / Cream Fur Snout Accent */}
                <path d="M 45 16 C 65 10, 85 16, 92 20 L 82 32 C 65 24, 48 26, 45 16 Z" fill="#fde047" opacity="0.85" />

                {/* Pointed Dingo Ears */}
                <polygon points="32,18 20,-8 42,8" fill="#ea580c" stroke="#78350f" strokeWidth="2.5" />
                <polygon points="30,16 22,-2 38,8" fill="#fca5a5" />

                {/* Dangling Aussie Cork on Ear */}
                <path d="M 22 -2 Q 14 2 12 12" stroke="#d97706" strokeWidth="1.5" fill="none" />
                <rect x="8" y="12" width="7" height="9" fill="#d97706" stroke="#78350f" strokeWidth="1" rx="1.5" />

                {/* Dark Inner Mouth Cavity */}
                <path d="M 25 36 C 45 32, 75 35, 92 22 C 85 52, 60 62, 30 52 C 24 46, 22 40, 25 36 Z" fill="#4c0519" stroke="#701a75" strokeWidth="2" />
                
                {/* Pink Tongue inside mouth */}
                <path d="M 38 48 Q 58 40 76 44 Q 60 56 38 48 Z" fill="#f43f5e" />

                {/* Lower Jaw (Cream & Amber Fur) */}
                <path d="M 25 48 C 35 55, 60 65, 88 42 L 95 48 C 70 75, 30 65, 20 48 Z" fill="#d97706" stroke="#78350f" strokeWidth="2.5" />
                <path d="M 30 52 C 45 58, 65 64, 88 42 L 92 46 C 70 70, 35 62, 30 52 Z" fill="#fde047" />

                {/* Sharp Upper Fangs */}
                <polygon points="32,36 36,46 40,36" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="44,35 49,49 54,35" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="58,33 63,48 68,33" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="72,30 77,45 82,29" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="84,26 88,38 92,23" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

                {/* Sharp Lower Fangs */}
                <polygon points="38,48 42,38 46,48" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="50,50 55,36 60,50" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="64,48 69,35 74,47" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />
                <polygon points="78,44 82,34 86,42" fill="#fff" stroke="#d4d4d8" strokeWidth="1" />

                {/* Menacing Cunning Eye (Sly Hooded Lid) */}
                <ellipse cx="56" cy="18" rx="6" ry="4" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
                <circle cx="57" cy="18" r="2.2" fill="#000" />
                <circle cx="58" cy="17" r="0.8" fill="#fff" />
                <path d="M 48 14 Q 57 12 64 16" stroke="#451a03" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                {/* Black Leather Dingo Nose */}
                <ellipse cx="92" cy="19" rx="4.5" ry="3.5" fill="#27272a" />
              </g>
            )}
          </svg>

          {isChewing && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-max bg-amber-950/90 border border-amber-500 rounded px-1 py-0.5 text-[8px] font-mono font-bold text-amber-200 shadow-lg flex flex-col items-center z-30 pointer-events-none">
              <span className="leading-none text-yellow-300 font-extrabold tracking-tighter">
                DIGESTING ({chewSecs}s)
              </span>
              <div className="w-12 h-1.5 bg-stone-900 border border-amber-600 rounded-full mt-0.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-500 to-emerald-400 transition-all duration-100"
                  style={{ width: `${chewProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      );

    case 'threepeater':
      return (
        <div className={`relative w-16 h-16 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Prickly Weed Base Leaves */}
            <path d="M 60 110 Q 55 85 60 65" stroke="#a16207" strokeWidth="10" fill="none" strokeLinecap="round" />
            <ellipse cx="36" cy="105" rx="20" ry="8" fill="#ca8a04" transform="rotate(-25 36 105)" />
            <polygon points="18,100 25,95 22,107" fill="#854d0e" />
            <ellipse cx="84" cy="105" rx="20" ry="8" fill="#ca8a04" transform="rotate(25 84 105)" />
            <polygon points="102,100 95,95 98,107" fill="#854d0e" />
            <ellipse cx="60" cy="108" rx="22" ry="7" fill="#a16207" />

            {/* Braided Branching Aussie Weed Stems to 3 Heads */}
            {/* Top Stem */}
            <path d="M 58 75 Q 38 52 36 34" stroke="#a16207" strokeWidth="7" fill="none" strokeLinecap="round" />
            <polygon points="44,60 38,58 45,54" fill="#713f12" />
            {/* Middle Stem */}
            <path d="M 60 75 Q 65 58 68 48" stroke="#a16207" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Bottom Stem */}
            <path d="M 62 75 Q 82 62 84 45" stroke="#a16207" strokeWidth="7" fill="none" strokeLinecap="round" />
            <polygon points="74,64 80,62 75,58" fill="#713f12" />

            {/* Head 1: Top Weed Head (Tilted slightly upward) */}
            <g transform="translate(-10, -10)">
              {/* Back Weed Tuft */}
              <path d="M 28 32 Q 18 28 20 18 Q 30 22 30 30 Z" fill="#a16207" />
              {/* Head Cannon */}
              <circle cx="45" cy="32" r="17" fill="#facc15" stroke="#a16207" strokeWidth="2.5" />
              {/* Crest Thorns */}
              <polygon points="38,16 42,6 46,16" fill="#ca8a04" stroke="#713f12" strokeWidth="0.8" />
              {/* Snout */}
              <ellipse cx="62" cy="28" rx="10" ry="7" fill="#eab308" stroke="#a16207" strokeWidth="2.5" transform="rotate(-15 62 28)" />
              <ellipse cx="68" cy="26" rx="4" ry="6" fill="#713f12" transform="rotate(-15 68 26)" />
              {/* Eyes & Brow */}
              <circle cx="44" cy="26" r="3.5" fill="#000" />
              <circle cx="43" cy="25" r="1" fill="#fff" />
              <path d="M 38 21 L 52 23" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Head 2: Center Weed Head (Pointing straight forward) */}
            <g transform="translate(5, 5)">
              {/* Back Weed Tuft */}
              <path d="M 44 45 Q 34 40 36 28 Q 48 32 46 43 Z" fill="#a16207" />
              {/* Head Cannon */}
              <circle cx="62" cy="45" r="18" fill="#facc15" stroke="#a16207" strokeWidth="2.5" />
              {/* Crest Thorns */}
              <polygon points="54,28 58,18 63,28" fill="#ca8a04" stroke="#713f12" strokeWidth="0.8" />
              <polygon points="63,27 67,17 71,28" fill="#eab308" stroke="#713f12" strokeWidth="0.8" />
              {/* Snout */}
              <ellipse cx="80" cy="45" rx="11" ry="8" fill="#eab308" stroke="#a16207" strokeWidth="2.5" />
              <ellipse cx="86" cy="45" rx="4.5" ry="7" fill="#713f12" />
              {/* Eyes & Brow */}
              <circle cx="60" cy="38" r="3.8" fill="#000" />
              <circle cx="59" cy="37" r="1" fill="#fff" />
              <circle cx="70" cy="38" r="3.8" fill="#000" />
              <circle cx="69" cy="37" r="1" fill="#fff" />
              <path d="M 54 32 L 74 34" stroke="#713f12" strokeWidth="2.2" strokeLinecap="round" />
            </g>

            {/* Head 3: Lower Weed Head (Tilted slightly downward) */}
            <g transform="translate(18, 12)">
              {/* Back Weed Tuft */}
              <path d="M 48 52 Q 38 50 40 40 Q 50 44 50 51 Z" fill="#a16207" />
              {/* Head Cannon */}
              <circle cx="65" cy="52" r="16" fill="#facc15" stroke="#a16207" strokeWidth="2.5" />
              {/* Crest Thorns */}
              <polygon points="58,38 62,28 66,38" fill="#ca8a04" stroke="#713f12" strokeWidth="0.8" />
              {/* Snout */}
              <ellipse cx="81" cy="57" rx="10" ry="7" fill="#eab308" stroke="#a16207" strokeWidth="2.5" transform="rotate(15 81 57)" />
              <ellipse cx="87" cy="59" rx="4" ry="6" fill="#713f12" transform="rotate(15 87 59)" />
              {/* Eyes & Brow */}
              <circle cx="64" cy="47" r="3.5" fill="#000" />
              <circle cx="63" cy="46" r="1" fill="#fff" />
              <path d="M 58 42 L 72 45" stroke="#713f12" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      );

    case 'rottenbabytomato':
      return (
        <div className={`relative w-12 h-14 flex flex-col items-center justify-center ${isAnimated ? 'animate-bounce-gentle' : ''}`}>
          <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg overflow-visible">
            {/* Stinky Stench Clouds */}
            <circle cx="20" cy="20" r="8" fill="#a3e635" opacity="0.4" className="animate-pulse" />
            <circle cx="80" cy="25" r="10" fill="#a3e635" opacity="0.3" className="animate-pulse" />
            <circle cx="50" cy="10" r="12" fill="#84cc16" opacity="0.35" className="animate-pulse" />

            {/* Baby Bonnet / Diaper Frills */}
            <path d="M 18 65 Q 50 30 82 65 Q 88 100 50 105 Q 12 100 18 65 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="4" />
            <circle cx="50" cy="65" r="32" fill="#dc2626" />

            {/* Dirty Rotten Patches */}
            <circle cx="32" cy="72" r="7" fill="#7f1d1d" opacity="0.7" />
            <circle cx="68" cy="60" r="8" fill="#7f1d1d" opacity="0.7" />

            {/* Green Stem & Bonnet Knot */}
            <path d="M 50 34 C 40 20, 30 25, 25 15" stroke="#65a30d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 50 34 C 60 20, 70 25, 75 15" stroke="#65a30d" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Crying Baby Eyes */}
            <path d="M 34 56 Q 42 50 44 60" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M 66 56 Q 58 50 56 60" stroke="#000" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Tears */}
            <path d="M 32 62 Q 26 70 28 78" stroke="#38bdf8" strokeWidth="3" fill="none" className="animate-pulse" />
            <path d="M 68 62 Q 74 70 72 78" stroke="#38bdf8" strokeWidth="3" fill="none" className="animate-pulse" />

            {/* Baby Pacifier in mouth */}
            <circle cx="50" cy="76" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
            <circle cx="50" cy="76" r="3" fill="#f59e0b" />
            <path d="M 44 80 Q 50 88 56 80" stroke="#ca8a04" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      );

    default:
      return null;
  }
});

// Zombie Renderer Component
export const ZombieSprite: React.FC<{
  type: ZombieType;
  hp: number;
  maxHp: number;
  isEating?: boolean;
  isSlowed?: boolean;
  isVaulting?: boolean;
  hasEucalyptusShield?: boolean;
  isVoid?: boolean;
  isJoeFace?: boolean;
}> = React.memo(({ type, hp, maxHp, isEating = false, isSlowed = false, isVaulting = false, hasEucalyptusShield = false, isVoid = false, isJoeFace = false }) => {
  const hpPercent = hp / maxHp;
  const isDamaged = hpPercent < 0.5;
  const isSeverelyDamaged = hpPercent < 0.25;

  const voidClass = isVoid
    ? 'filter hue-rotate-270 saturate-200 invert-[0.8] contrast-125 drop-shadow-[0_0_22px_rgba(168,85,247,0.95)]'
    : '';

  if (type === 'red_sand_gargantuar') {
    return (
      <div
        className={`relative w-44 h-48 flex flex-col items-center justify-end transition-all ${voidClass} ${
          isSlowed ? 'filter hue-rotate-180 brightness-110 drop-shadow-[0_0_20px_rgba(6,182,212,0.95)]' : ''
        } ${isEating ? 'animate-eat-shake scale-110' : 'animate-zombie-walk'}`}
      >
        {/* SVG Red Sand Gargantuar */}
        <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            {/* Sandstone Rock Textures & Shading Gradients */}
            <linearGradient id="gargStonePrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="35%" stopColor="#c2410c" />
              <stop offset="75%" stopColor="#9a3412" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            <linearGradient id="gargStoneHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#9a3412" />
            </linearGradient>

            <linearGradient id="gargStoneDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="70%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#290a00" />
            </linearGradient>

            <linearGradient id="bagCanvasGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#eab308" />
              <stop offset="80%" stopColor="#ca8a04" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>

            <linearGradient id="signYellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="60%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#a16207" />
            </linearGradient>

            <filter id="rockGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ground Shadow & Red Desert Dust Cloud */}
          <ellipse cx="100" cy="210" rx="75" ry="10" fill="#000" opacity="0.55" />
          <ellipse cx="100" cy="208" rx="88" ry="6" fill="#78350f" opacity="0.3" />
          <path d="M 25 205 Q 60 198 100 207 Q 140 198 175 205" stroke="#ea580c" strokeWidth="4" opacity="0.3" strokeLinecap="round" />

          {/* ==================== LEFT BACK LEG ==================== */}
          <g id="garg_left_leg">
            {/* Upper Thigh Sandstone Block */}
            <path d="M 52 135 L 38 180 L 72 184 L 80 138 Z" fill="url(#gargStoneDark)" stroke="#290a00" strokeWidth="4" />
            <path d="M 54 137 L 44 178 L 58 180 Z" fill="url(#gargStoneHighlight)" opacity="0.6" />
            
            {/* Calf & Foot Blocks */}
            <path d="M 32 176 L 22 204 L 70 206 L 74 180 Z" fill="url(#gargStonePrimary)" stroke="#290a00" strokeWidth="4" />
            
            {/* Sandstone Toes */}
            <path d="M 16 198 Q 28 190 68 202 L 64 212 L 14 208 Z" fill="#9a3412" stroke="#290a00" strokeWidth="3" />
            <line x1="28" y1="198" x2="26" y2="210" stroke="#290a00" strokeWidth="2.5" />
            <line x1="40" y1="200" x2="38" y2="211" stroke="#290a00" strokeWidth="2.5" />
            <line x1="52" y1="202" x2="50" y2="211" stroke="#290a00" strokeWidth="2.5" />
          </g>

          {/* ==================== RIGHT FRONT LEG ==================== */}
          <g id="garg_right_leg">
            <path d="M 120 135 L 108 180 L 142 184 L 148 138 Z" fill="url(#gargStonePrimary)" stroke="#290a00" strokeWidth="4" />
            <path d="M 122 137 L 114 178 L 128 180 Z" fill="url(#gargStoneHighlight)" opacity="0.6" />

            <path d="M 102 176 L 92 204 L 140 206 L 144 180 Z" fill="url(#gargStonePrimary)" stroke="#290a00" strokeWidth="4" />

            {/* Sandstone Toes */}
            <path d="M 86 198 Q 98 190 138 202 L 134 212 L 84 208 Z" fill="#9a3412" stroke="#290a00" strokeWidth="3" />
            <line x1="98" y1="198" x2="96" y2="210" stroke="#290a00" strokeWidth="2.5" />
            <line x1="110" y1="200" x2="108" y2="211" stroke="#290a00" strokeWidth="2.5" />
            <line x1="122" y1="202" x2="120" y2="211" stroke="#290a00" strokeWidth="2.5" />
          </g>

          {/* Bush Vines Binding Legs */}
          <path d="M 38 148 Q 72 158 48 185" stroke="#166534" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 38 148 Q 72 158 48 185" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 108 148 Q 142 158 118 185" stroke="#166534" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M 108 148 Q 142 158 118 185" stroke="#22c55e" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* ==================== CRAGGY TORSO & ABS ==================== */}
          <g id="garg_torso">
            {/* Main Boulder Torso */}
            <path d="M 36 78 Q 100 60 164 78 L 150 144 Q 100 152 50 144 Z" fill="url(#gargStoneHighlight)" stroke="#290a00" strokeWidth="5" />

            {/* Faceted Rock Plates (Chest & Abs) */}
            <polygon points="56,88 100,78 144,88 138,102 100,98 62,102" fill="url(#gargStonePrimary)" stroke="#290a00" strokeWidth="3" />
            <polygon points="62,104 100,100 138,104 132,118 100,116 68,118" fill="url(#gargStonePrimary)" stroke="#290a00" strokeWidth="3" />
            <polygon points="68,120 100,118 132,120 126,134 100,134 74,134" fill="url(#gargStoneDark)" stroke="#290a00" strokeWidth="3" />

            {/* Rock Cracks on Chest */}
            <path d="M 100 78 L 100 140" stroke="#290a00" strokeWidth="4" />
            <path d="M 72 90 L 88 96" stroke="#290a00" strokeWidth="3" />
            <path d="M 128 90 L 112 96" stroke="#290a00" strokeWidth="3" />
            <path d="M 76 110 L 90 114" stroke="#290a00" strokeWidth="3" />
            <path d="M 124 110 L 110 114" stroke="#290a00" strokeWidth="3" />
          </g>

          {/* Bush Vines Binding Torso & Shoulders */}
          <g id="torso_vines">
            <path d="M 32 88 Q 100 108 168 88" stroke="#14532d" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 32 88 Q 100 108 168 88" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />

            <path d="M 42 118 Q 100 134 158 116" stroke="#166534" strokeWidth="7" fill="none" strokeLinecap="round" />
            <path d="M 42 118 Q 100 134 158 116" stroke="#4ade80" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            <path d="M 52 74 Q 32 105 45 135" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 148 74 Q 168 105 155 135" stroke="#15803d" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Leaf Clusters on Vines */}
            <polygon points="60,102 68,94 65,108" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" />
            <polygon points="135,96 144,90 140,104" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" />
            <polygon points="85,124 94,118 90,130" fill="#22c55e" stroke="#14532d" strokeWidth="1.5" />
          </g>

          {/* ==================== AUSTRALIA POST MAIL BAG ==================== */}
          <g id="garg_post_bag">
            {/* Thick Leather Shoulder Strap */}
            <path d="M 44 76 L 138 132" stroke="#290a00" strokeWidth="8" strokeLinecap="round" />
            <path d="M 44 76 L 138 132" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />

            {/* Canvas Mail Bag Body */}
            <rect x="58" y="110" width="68" height="48" rx="8" fill="url(#bagCanvasGrad)" stroke="#290a00" strokeWidth="4" />
            
            {/* Bag Flap */}
            <path d="M 58 110 Q 92 126 126 110 L 126 118 Q 92 134 58 118 Z" fill="#ca8a04" stroke="#290a00" strokeWidth="2.5" />

            {/* Australia Map Shape / Post Logo */}
            <path d="M 68 126 Q 74 122 82 128 Q 78 138 68 134 Z" fill="#78350f" opacity="0.8" />

            {/* 'POST' Bold Stencil Text */}
            <text x="96" y="142" textAnchor="middle" fill="#290a00" fontSize="13" fontStyle="italic" fontWeight="900" letterSpacing="1">
              POST
            </text>

            {/* Stitching lines */}
            <path d="M 62 114 L 62 152" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3,3" />
            <path d="M 122 114 L 122 152" stroke="#78350f" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* RED SAND IMP PEEKING OUT OF MAIL BAG */}
            {hp > maxHp * 0.4 && (
              <g id="bag_imp" className="animate-bounce-gentle">
                {/* Tiny Imp Hands gripping bag rim */}
                <circle cx="68" cy="108" r="4" fill="#ea580c" stroke="#290a00" strokeWidth="1.5" />
                <circle cx="74" cy="107" r="4" fill="#ea580c" stroke="#290a00" strokeWidth="1.5" />
                <circle cx="110" cy="107" r="4" fill="#ea580c" stroke="#290a00" strokeWidth="1.5" />
                <circle cx="116" cy="108" r="4" fill="#ea580c" stroke="#290a00" strokeWidth="1.5" />

                {/* Imp Head peeking out */}
                <ellipse cx="92" cy="94" rx="16" ry="14" fill="#ea580c" stroke="#290a00" strokeWidth="2.5" />

                {/* Crazed Imp Eyes */}
                <circle cx="85" cy="91" r="4.5" fill="#fef08a" stroke="#000" strokeWidth="1.5" />
                <circle cx="85" cy="91" r="1.8" fill="#000" />
                <circle cx="99" cy="91" r="4.5" fill="#fef08a" stroke="#000" strokeWidth="1.5" />
                <circle cx="99" cy="91" r="1.8" fill="#000" />

                {/* Mischievous Imp Grin */}
                <path d="M 83 99 Q 92 106 101 99" stroke="#290a00" strokeWidth="2" fill="none" />

                {/* Postman Cork Hat on Imp */}
                <ellipse cx="92" cy="83" rx="18" ry="5" fill="#ca8a04" stroke="#290a00" strokeWidth="2" />
                <rect x="83" y="75" width="18" height="9" fill="#a16207" stroke="#290a00" strokeWidth="2" rx="1.5" />

                {/* Goggles on Hat */}
                <ellipse cx="87" cy="80" rx="3.5" ry="2.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1" />
                <ellipse cx="97" cy="80" rx="3.5" ry="2.5" fill="#38bdf8" stroke="#1e293b" strokeWidth="1" />

                {/* Dangling Corks */}
                <line x1="76" y1="84" x2="76" y2="92" stroke="#290a00" strokeWidth="1" />
                <rect x="74" y="92" width="4" height="5" fill="#d97706" rx="0.5" />
                <line x1="108" y1="84" x2="108" y2="92" stroke="#290a00" strokeWidth="1" />
                <rect x="106" y="92" width="4" height="5" fill="#d97706" rx="0.5" />
              </g>
            )}
          </g>

          {/* ==================== LEFT MASSIVE SANDSTONE BICEP & ARM ==================== */}
          <g id="garg_left_arm">
            {/* Shoulder Boulder */}
            <circle cx="28" cy="80" r="20" fill="url(#gargStoneHighlight)" stroke="#290a00" strokeWidth="4" />

            {/* Bicep & Forearm */}
            <path d="M 22 88 Q 5 118 16 154" stroke="#c2410c" strokeWidth="22" strokeLinecap="round" fill="none" />
            <path d="M 22 88 Q 5 118 16 154" stroke="#290a00" strokeWidth="22" strokeDasharray="4,16" strokeLinecap="round" fill="none" opacity="0.3" />

            {/* Vines on Left Arm */}
            <path d="M 26 78 Q 2 118 20 150" stroke="#166534" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Massive Sandstone Fist */}
            <circle cx="16" cy="154" r="17" fill="url(#gargStoneDark)" stroke="#290a00" strokeWidth="4" />
            <path d="M 4 148 Q 16 142 28 152" stroke="#290a00" strokeWidth="2.5" fill="none" />
            <path d="M 6 156 Q 16 150 28 160" stroke="#290a00" strokeWidth="2.5" fill="none" />
          </g>

          {/* ==================== RIGHT ARM & KANGAROO CROSSING WEAPON ==================== */}
          <g id="garg_right_arm">
            {/* Right Shoulder Boulder */}
            <circle cx="172" cy="80" r="20" fill="url(#gargStoneHighlight)" stroke="#290a00" strokeWidth="4" />

            {/* Right Bicep */}
            <path d="M 172 88 Q 186 115 174 144" stroke="#c2410c" strokeWidth="22" strokeLinecap="round" fill="none" />
            <circle cx="174" cy="144" r="17" fill="url(#gargStoneDark)" stroke="#290a00" strokeWidth="4" />

            {/* Vines on Right Arm */}
            <path d="M 172 78 Q 192 115 172 144" stroke="#166534" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Gnarled Tree Branch Pole */}
            <path
              d={isEating ? "M 165 148 L 60 210" : "M 174 148 L 196 14"}
              stroke="#290a00"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d={isEating ? "M 165 148 L 60 210" : "M 174 148 L 196 14"}
              stroke="#78350f"
              strokeWidth="9"
              strokeLinecap="round"
            />
            <path
              d={isEating ? "M 115 178 L 102 162" : "M 186 75 L 202 62"}
              stroke="#290a00"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* RUSTED DIAMOND KANGAROO CROSSING ROAD SIGN */}
            <g transform={isEating ? "translate(38, 185) rotate(-42)" : "translate(196, 2) rotate(18)"}>
              {/* Outer Sign Plate */}
              <polygon points="0,-36 36,0 0,36 -36,0" fill="url(#signYellowGrad)" stroke="#290a00" strokeWidth="5" />
              <polygon points="0,-30 30,0 0,30 -30,0" fill="none" stroke="#78350f" strokeWidth="2.5" />

              {/* Rusted Corner Patches */}
              <path d="M -36 0 L -22 -14 L -18 0 Z" fill="#78350f" />
              <path d="M 0 36 L 14 22 L 0 18 Z" fill="#78350f" />
              <circle cx="22" cy="-8" r="4" fill="#451a03" />

              {/* Leaping Kangaroo Black Silhouette */}
              <g transform="translate(-2, -4)">
                <path d="M -14 4 Q -8 -12 6 -6 Q 14 2 18 8 Q 8 4 -4 12 Q -10 10 -14 4 Z" fill="#1c1917" />
                <path d="M -4 12 L -16 22" stroke="#1c1917" strokeWidth="3" strokeLinecap="round" />
                <path d="M 4 10 L 10 24" stroke="#1c1917" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M -10 -4 L -18 -8" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* 'CROSSING' Text */}
              <text x="0" y="-14" textAnchor="middle" fill="#1c1917" fontSize="8" fontWeight="900" letterSpacing="0.8">
                CROSSING
              </text>

              {/* Rusted Mud Splatters */}
              <circle cx="-20" cy="8" r="5" fill="#78350f" opacity="0.85" />
              <circle cx="16" cy="-20" r="4" fill="#78350f" opacity="0.85" />
              <path d="M 26 -6 Q 32 6 26 16 Z" fill="#9a3412" opacity="0.75" />
            </g>
          </g>

          {/* ==================== MENACING SANDSTONE HEAD & FACE ==================== */}
          <g id="garg_head">
            {/* Heavy Rocky Jaw & Skull */}
            <path d="M 60 28 L 140 28 L 132 82 L 68 82 Z" fill="url(#gargStoneHighlight)" stroke="#290a00" strokeWidth="5" />

            {/* Brow Overhang Shadow */}
            <path d="M 64 40 L 136 40 L 130 50 L 70 50 Z" fill="#290a00" />

            {/* Glowing Sinister Yellow Eyes */}
            <g>
              <ellipse cx="82" cy="50" rx="7.5" ry="6" fill="#fef08a" stroke="#78350f" strokeWidth="2" />
              <circle cx="82" cy="50" r="3" fill="#000" />
              <ellipse cx="118" cy="50" rx="7.5" ry="6" fill="#fef08a" stroke="#78350f" strokeWidth="2" />
              <circle cx="118" cy="50" r="3" fill="#000" />
            </g>

            {/* Snarling Jagged Zombie Mouth */}
            <path d="M 72 64 Q 100 58 128 64 L 122 78 Q 100 84 78 78 Z" fill="#1c1917" stroke="#290a00" strokeWidth="3" />
            
            {/* Sharp Sandstone Teeth */}
            <polygon points="76,64 81,72 86,64" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <polygon points="92,63 97,73 102,63" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <polygon points="108,63 113,72 118,63" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <polygon points="84,78 89,70 94,78" fill="#fde047" stroke="#78350f" strokeWidth="1" />
            <polygon points="102,78 107,70 112,78" fill="#fde047" stroke="#78350f" strokeWidth="1" />

            {/* FRAYED OUTBACK CORK HAT */}
            <g id="garg_cork_hat">
              {/* Hat Crown */}
              <path d="M 68 28 L 76 6 L 124 6 L 132 28 Z" fill="#a16207" stroke="#290a00" strokeWidth="4" />
              <rect x="76" y="20" width="48" height="7" fill="#290a00" />

              {/* Hat Brim */}
              <ellipse cx="100" cy="28" rx="62" ry="11" fill="#ca8a04" stroke="#290a00" strokeWidth="4" />

              {/* Dangling Corks on Strings around Brim */}
              <g stroke="#290a00" strokeWidth="2">
                <line x1="46" y1="30" x2="46" y2="48" />
                <rect x="42" y="48" width="8" height="11" fill="#d97706" rx="1.5" stroke="#290a00" strokeWidth="1.5" />

                <line x1="64" y1="33" x2="64" y2="52" />
                <rect x="60" y="52" width="8" height="11" fill="#d97706" rx="1.5" stroke="#290a00" strokeWidth="1.5" />

                <line x1="136" y1="33" x2="136" y2="52" />
                <rect x="132" y="52" width="8" height="11" fill="#d97706" rx="1.5" stroke="#290a00" strokeWidth="1.5" />

                <line x1="154" y1="30" x2="154" y2="48" />
                <rect x="150" y="48" width="8" height="11" fill="#d97706" rx="1.5" stroke="#290a00" strokeWidth="1.5" />
              </g>
            </g>
          </g>

          {/* Severe Damage Cracks & Crumbling Rock Particles when HP < 50% */}
          {isDamaged && (
            <g stroke="#290a00" strokeWidth="4" fill="none">
              <path d="M 72 42 L 88 58 L 80 76" />
              <path d="M 110 102 L 126 128 L 116 148" />
              <path d="M 50 162 L 64 182" />
              <circle cx="58" cy="188" r="3" fill="#9a3412" />
              <circle cx="128" cy="178" r="3.5" fill="#9a3412" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  if (type === 'red_sand_imp') {
    return (
      <div
        className={`relative w-26 h-30 flex flex-col items-center justify-end transition-all ${voidClass} ${
          isSlowed ? 'filter hue-rotate-180 brightness-110 drop-shadow-[0_0_14px_rgba(6,182,212,0.9)]' : ''
        } ${isEating ? 'animate-eat-shake' : 'animate-zombie-walk'}`}
      >
        <svg viewBox="0 0 130 150" className="w-full h-full drop-shadow-2xl overflow-visible">
          <defs>
            <linearGradient id="impSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>

            <linearGradient id="boomerangGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Ground Shadow & Desert Dust Trail */}
          <ellipse cx="65" cy="142" rx="36" ry="8" fill="#000" opacity="0.5" />
          <path d="M 20 140 Q 65 134 110 140" stroke="#ea580c" strokeWidth="3" opacity="0.35" strokeLinecap="round" />

          {/* Bare Red Sand Feet & Legs */}
          <g id="imp_legs">
            <rect x="46" y="106" width="12" height="26" fill="url(#impSkinGrad)" rx="3" stroke="#290a00" strokeWidth="2.5" />
            <rect x="72" y="106" width="12" height="26" fill="url(#impSkinGrad)" rx="3" stroke="#290a00" strokeWidth="2.5" />
            <ellipse cx="48" cy="134" rx="10" ry="6" fill="#c2410c" stroke="#290a00" strokeWidth="2" />
            <ellipse cx="80" cy="134" rx="10" ry="6" fill="#c2410c" stroke="#290a00" strokeWidth="2" />
          </g>

          {/* Postman Uniform Body */}
          <g id="imp_body">
            {/* Short-Sleeve Button-Up Shirt */}
            <rect x="38" y="70" width="54" height="42" rx="6" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
            
            {/* Shirt Collar & Placket */}
            <path d="M 38 70 L 65 88 L 92 70" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <line x1="65" y1="88" x2="65" y2="112" stroke="#94a3b8" strokeWidth="2.5" />

            {/* Australia Post Shield Badge ('P') */}
            <path d="M 72 78 L 84 78 L 84 90 L 78 95 L 72 90 Z" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
            <text x="78" y="89" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">P</text>

            {/* Red Outback Dust Smudges on Shirt */}
            <path d="M 40 92 Q 50 86 56 98 Z" fill="#ea580c" opacity="0.55" />
            <path d="M 74 98 Q 84 94 88 104 Z" fill="#ea580c" opacity="0.55" />

            {/* Ragged Shorts */}
            <path d="M 38 104 L 92 104 L 86 114 L 44 114 Z" fill="#451a03" stroke="#290a00" strokeWidth="2.5" />
          </g>

          {/* Dusty Red Imp Head & Crazed Expression */}
          <g id="imp_head">
            <ellipse cx="65" cy="48" rx="30" ry="26" fill="url(#impSkinGrad)" stroke="#290a00" strokeWidth="3.5" />

            {/* Wild Asymmetric Glowing Yellow Eyes */}
            <g>
              <circle cx="50" cy="44" r="9" fill="#fef08a" stroke="#000" strokeWidth="2" />
              <circle cx="50" cy="44" r="3.5" fill="#000" />
              <circle cx="51" cy="42" r="1.2" fill="#fff" />

              <circle cx="78" cy="46" r="11" fill="#fef08a" stroke="#000" strokeWidth="2" />
              <circle cx="78" cy="46" r="4" fill="#000" />
              <circle cx="80" cy="44" r="1.5" fill="#fff" />
            </g>

            {/* Wide Maniacal Tooth Grin */}
            <path d="M 44 58 Q 65 74 86 57 L 80 67 Q 65 80 50 67 Z" fill="#1c1917" stroke="#290a00" strokeWidth="2.5" />
            <polygon points="52,59 56,65 60,59" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <polygon points="64,60 68,67 72,60" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />
            <polygon points="76,59 80,65 84,59" fill="#fef08a" stroke="#78350f" strokeWidth="0.8" />

            {/* FRAYED CORK HAT WITH AVIATOR GOGGLES */}
            <g id="imp_cork_hat">
              {/* Brim */}
              <ellipse cx="65" cy="24" rx="38" ry="8" fill="#ca8a04" stroke="#290a00" strokeWidth="3" />
              {/* Crown */}
              <rect x="46" y="9" width="38" height="16" fill="#a16207" stroke="#290a00" strokeWidth="3" rx="2" />

              {/* Aviator Goggles resting on hat */}
              <rect x="44" y="16" width="42" height="4" fill="#0f172a" />
              <ellipse cx="56" cy="18" rx="8" ry="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="56" cy="18" rx="4" ry="3" fill="#e0f2fe" opacity="0.85" />
              <ellipse cx="74" cy="18" rx="8" ry="6" fill="#38bdf8" stroke="#0f172a" strokeWidth="2" />
              <ellipse cx="74" cy="18" rx="4" ry="3" fill="#e0f2fe" opacity="0.85" />

              {/* Dangling Cork Strings */}
              <line x1="32" y1="26" x2="32" y2="40" stroke="#290a00" strokeWidth="2" />
              <rect x="28" y="40" width="7" height="9" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="1.2" />

              <line x1="98" y1="26" x2="98" y2="40" stroke="#290a00" strokeWidth="2" />
              <rect x="94" y="40" width="7" height="9" fill="#d97706" rx="1" stroke="#290a00" strokeWidth="1.2" />
            </g>
          </g>

          {/* Right Hand Holding Aussie Boomerang */}
          <g id="imp_boomerang" transform="translate(90, 60) rotate(18)">
            <path d="M 0 0 Q 18 -15 34 -5 Q 24 14 0 24 Q -5 12 0 0 Z" fill="url(#boomerangGrad)" stroke="#290a00" strokeWidth="3" />
            
            {/* Boomerang Markings & 'Z' Logo */}
            <path d="M 10 -2 L 15 15" stroke="#ea580c" strokeWidth="2.5" />
            <path d="M 22 -5 L 27 10" stroke="#fde047" strokeWidth="2.5" />
            <text x="18" y="11" fill="#fde047" fontSize="10" fontWeight="900">Z</text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'koala_imp') {
    return (
      <div
        className={`relative w-20 h-24 flex flex-col items-center justify-end transition-all ${voidClass} ${
          isSlowed ? 'filter hue-rotate-180 brightness-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]' : ''
        } ${isEating ? 'animate-eat-shake' : 'animate-zombie-walk'}`}
      >
        {/* Eucalyptus Shield Badge */}
        {hasEucalyptusShield && (
          <div className="absolute -top-3 z-20 bg-emerald-950/95 border border-emerald-400 text-emerald-300 text-[10px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
            <span>🌿</span>
            <span>SHIELD</span>
          </div>
        )}

        {/* SVG Koala Imp Vector Character */}
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-xl overflow-visible">
          {/* Soft Shadow */}
          <ellipse cx="50" cy="115" rx="26" ry="6" fill="#000" opacity="0.4" />

          {/* Short Stubbly Onesie Legs & Feet */}
          <rect x="36" y="90" width="10" height="20" fill="#64748b" rx="3" />
          <rect x="54" y="90" width="10" height="20" fill="#64748b" rx="3" />
          <ellipse cx="38" cy="110" rx="8" ry="5" fill="#475569" />
          <ellipse cx="62" cy="110" rx="8" ry="5" fill="#475569" />

          {/* Round Grey Koala Onesie Body */}
          <ellipse cx="50" cy="72" rx="26" ry="24" fill="#64748b" stroke="#334155" strokeWidth="3" />
          {/* Lighter Fluffy Belly Patch */}
          <ellipse cx="50" cy="75" rx="16" ry="15" fill="#cbd5e1" />

          {/* Stubbly Onesie Arms */}
          {isEating ? (
            <g className="animate-pulse">
              <path d="M 28 68 L 48 62 L 48 72 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
              <path d="M 72 68 L 52 62 L 52 72 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
            </g>
          ) : (
            <g>
              <path d="M 26 65 L 8 72 L 12 78 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
              <path d="M 74 65 L 92 72 L 88 78 Z" fill="#64748b" stroke="#334155" strokeWidth="2" />
            </g>
          )}

          {/* Oversized Koala Hood & Head */}
          <circle cx="50" cy="38" r="28" fill="#64748b" stroke="#334155" strokeWidth="3" />

          {/* Round Fluffy Koala Ears */}
          <circle cx="20" cy="20" r="14" fill="#64748b" stroke="#334155" strokeWidth="3" />
          <circle cx="20" cy="20" r="8" fill="#f1f5f9" />
          <circle cx="80" cy="20" r="14" fill="#64748b" stroke="#334155" strokeWidth="3" />
          <circle cx="80" cy="20" r="8" fill="#f1f5f9" />

          {/* Big Oval Black Leather Koala Nose on Forehead */}
          <ellipse cx="50" cy="22" rx="9" ry="6" fill="#0f172a" />
          <ellipse cx="48" cy="20" rx="3" ry="2" fill="#94a3b8" opacity="0.6" />

          {/* Exposed Green Zombie Face inside hood opening */}
          <ellipse cx="50" cy="42" rx="20" ry="17" fill="#528816" stroke="#2e5209" strokeWidth="2" />

          {/* Asymmetrical Crazy Imp Eyes */}
          <circle cx="41" cy="38" r="6" fill="#fef08a" stroke="#000" strokeWidth="1.5" />
          <circle cx="41" cy="38" r="2.5" fill="#000" />
          <circle cx="40" cy="37" r="1" fill="#fff" />

          <circle cx="59" cy="40" r="7.5" fill="#fef08a" stroke="#000" strokeWidth="1.5" />
          <circle cx="59" cy="40" r="3" fill="#000" />
          <circle cx="58" cy="39" r="1" fill="#fff" />

          {/* Imp Mouth with Jagged Teeth */}
          <path d="M 38 49 Q 50 56 62 48" stroke="#1c1917" strokeWidth="2" fill="none" />
          <rect x="42" y="49" width="3" height="4" fill="#fef08a" rx="0.5" />
          <rect x="52" y="48" width="3" height="4" fill="#fef08a" rx="0.5" />
        </svg>
      </div>
    );
  }

  if (type === 'aussie_joe_boss') {
    const hpPercent = Math.max(0, Math.min(1, hp / maxHp));
    return (
      <div
        className={`relative w-full h-full flex flex-col items-center justify-end transition-all ${
          isSlowed ? 'filter hue-rotate-180 brightness-110 drop-shadow-[0_0_20px_rgba(6,182,212,0.9)]' : ''
        } ${isEating ? 'animate-eat-shake' : 'animate-bounce-gentle'}`}
      >
        {/* Overhead Boss Title & Health Bar */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 w-64 bg-black/95 border-2 border-amber-500 rounded-xl p-1.5 shadow-[0_0_20px_rgba(245,158,11,0.6)] flex flex-col items-center pointer-events-none">
          <div className="flex items-center justify-between w-full px-1 text-[10px] font-mono font-black text-amber-300 uppercase tracking-widest">
            <span>🐊 AUSSIE JOE & CROC</span>
            <span>{Math.ceil(hpPercent * 100)}%</span>
          </div>
          <div className="w-full bg-stone-900 h-3 rounded-full overflow-hidden border border-stone-700 p-0.5 mt-0.5">
            <div
              className="bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 h-full rounded-full transition-all duration-300 shadow"
              style={{ width: `${hpPercent * 100}%` }}
            />
          </div>
        </div>

        <svg viewBox="0 0 320 380" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)] overflow-visible">
          <defs>
            <linearGradient id="crocSkin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#166534" />
              <stop offset="50%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#0f5132" />
            </linearGradient>
            <linearGradient id="crocBelly" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Ground Dust & Stomp Aura */}
          <ellipse cx="160" cy="365" rx="140" ry="18" fill="#000" opacity="0.6" />
          <ellipse cx="130" cy="365" rx="100" ry="12" fill="#78350f" opacity="0.5" className="animate-pulse" />

          {/* GIANT OUTBACK SALTWATER CROCODILE BODY (Spans full 5 lanes) */}
          <g id="giant_croc_body">
            {/* Massive Thick Tail */}
            <path d="M 230 290 Q 300 270 320 310 Q 280 340 210 330 Z" fill="url(#crocSkin)" stroke="#14532d" strokeWidth="5" />
            <path d="M 240 280 Q 280 270 305 300" stroke="#facc15" strokeWidth="4" fill="none" />
            <polygon points="250,280 260,260 270,282" fill="#14532d" />
            <polygon points="275,285 285,265 295,288" fill="#14532d" />

            {/* Giant Armored Main Crocodile Body */}
            <path d="M 40 250 C 40 190, 230 190, 240 270 C 240 340, 50 350, 40 250 Z" fill="url(#crocSkin)" stroke="#14532d" strokeWidth="6" />

            {/* Bright Yellow Scaly Underbelly */}
            <path d="M 60 305 Q 140 335 220 305 Q 140 320 60 305 Z" fill="url(#crocBelly)" stroke="#ca8a04" strokeWidth="4" />

            {/* Spiked Ridge Scales along Back */}
            <polygon points="70,210 82,185 94,210" fill="#0f5132" stroke="#14532d" strokeWidth="2" />
            <polygon points="105,200 117,175 129,200" fill="#0f5132" stroke="#14532d" strokeWidth="2" />
            <polygon points="140,195 152,170 164,195" fill="#0f5132" stroke="#14532d" strokeWidth="2" />
            <polygon points="175,200 187,175 199,200" fill="#0f5132" stroke="#14532d" strokeWidth="2" />
            <polygon points="210,215 222,190 234,215" fill="#0f5132" stroke="#14532d" strokeWidth="2" />

            {/* Massive Claws & Heavy Stomping Feet */}
            <path d="M 60 280 Q 30 300 20 335 Q 45 345 65 325 Z" fill="#166534" stroke="#14532d" strokeWidth="4" />
            <polygon points="15,335 20,348 26,335" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />
            <polygon points="27,338 32,350 38,338" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />
            <polygon points="39,335 44,347 50,335" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />

            <path d="M 190 280 Q 220 300 230 335 Q 205 345 185 325 Z" fill="#166534" stroke="#14532d" strokeWidth="4" />
            <polygon points="218,335 223,348 229,335" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />
            <polygon points="205,338 210,350 216,338" fill="#fef08a" stroke="#854d0e" strokeWidth="1" />

            {/* MASSIVE ROARING CROCODILE HEAD & JAWS (Snapping at plants ahead!) */}
            <g id="giant_croc_head">
              {/* Upper Snout with nostrils & scales */}
              <path d="M 70 240 Q 10 230 -30 255 Q 10 265 70 265 Z" fill="url(#crocSkin)" stroke="#14532d" strokeWidth="5" />
              {/* Lower Jaw */}
              <path d="M 70 265 Q -10 290 -35 305 Q 10 315 70 285 Z" fill="#166534" stroke="#14532d" strokeWidth="5" />
              {/* Dark Red Mouth Interior */}
              <path d="M 65 248 Q -10 265 65 280 Z" fill="#450a0a" />

              {/* Sharp Razor Teeth */}
              <polygon points="-10,252 -15,263 0,256" fill="#fff" stroke="#713f12" strokeWidth="1" />
              <polygon points="15,248 10,260 25,251" fill="#fff" stroke="#713f12" strokeWidth="1" />
              <polygon points="40,245 35,258 50,248" fill="#fff" stroke="#713f12" strokeWidth="1" />
              <polygon points="-15,298 -25,286 -5,292" fill="#fff" stroke="#713f12" strokeWidth="1" />
              <polygon points="15,290 8,278 25,285" fill="#fff" stroke="#713f12" strokeWidth="1" />
              <polygon points="40,282 33,270 50,277" fill="#fff" stroke="#713f12" strokeWidth="1" />

              {/* Glowing Fierce Eyes */}
              <circle cx="55" cy="228" r="12" fill="#facc15" stroke="#14532d" strokeWidth="3" filter="url(#glowGold)" />
              <line x1="55" y1="218" x2="55" y2="238" stroke="#000" strokeWidth="4" />
            </g>
          </g>

          {/* COLOSSAL AUSSIE JOE RIDING HIGH ON TOP */}
          <g id="colossal_aussie_joe" transform="translate(80, 20)">
            {/* Legs astride */}
            <path d="M 40 120 L 20 170 L 45 180 L 65 130 Z" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <path d="M 90 120 L 110 170 L 85 180 L 65 130 Z" fill="#78350f" stroke="#451a03" strokeWidth="4" />

            {/* Torso - Khaki Outback Vest & Leather Bandolier */}
            <rect x="35" y="55" width="60" height="70" fill="#a16207" stroke="#451a03" strokeWidth="4" rx="8" />
            <rect x="42" y="65" width="18" height="20" fill="#ca8a04" stroke="#451a03" strokeWidth="2" rx="3" />
            <rect x="70" y="65" width="18" height="20" fill="#ca8a04" stroke="#451a03" strokeWidth="2" rx="3" />
            
            {/* Ammo Bandolier */}
            <path d="M 38 60 L 92 120" stroke="#451a03" strokeWidth="8" />
            <circle cx="50" cy="73" r="3" fill="#fef08a" />
            <circle cx="65" cy="90" r="3" fill="#fef08a" />
            <circle cx="80" cy="107" r="3" fill="#fef08a" />

            {/* Powerful Arms holding Reins & Golden Boomerang */}
            <path d="M 35 70 L -10 100 M 95 70 L 130 95" stroke="#9a3412" strokeWidth="8" strokeLinecap="round" />
            {/* Reins attached to croc head */}
            <path d="M -10 100 L -80 210" stroke="#fef08a" strokeWidth="3.5" />

            {/* Golden Boomerang in Right Hand */}
            <path d="M 130 95 Q 160 60 140 30 Q 120 70 130 95 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="3" filter="url(#glowGold)" />

            {/* Aussie Joe Head */}
            <circle cx="65" cy="35" r="22" fill="#fde047" stroke="#ca8a04" strokeWidth="3" />

            {/* Cool Aviator Sunglasses */}
            <rect x="48" y="25" width="34" height="12" fill="#0f172a" stroke="#facc15" strokeWidth="2" rx="3" />

            {/* Bushy Outback Blonde Mustache */}
            <path d="M 45 44 Q 65 54 85 44 Q 65 35 45 44 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />

            {/* Akubra Bush Slouch Hat with Hanging Corks & Aussie Pin */}
            <path d="M 15 22 Q 65 -15 115 22 Z" fill="#78350f" stroke="#451a03" strokeWidth="4" />
            <rect x="35" y="0" width="60" height="20" fill="#9a3412" rx="3" />

            {/* Hanging Corks */}
            <path d="M 22 22 L 22 38" stroke="#d97706" strokeWidth="2" />
            <rect x="18" y="38" width="8" height="10" fill="#d97706" rx="2" />
            <path d="M 108 22 L 108 38" stroke="#d97706" strokeWidth="2" />
            <rect x="104" y="38" width="8" height="10" fill="#d97706" rx="2" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative w-20 h-24 flex flex-col items-center justify-end transition-all ${voidClass} ${
        isSlowed ? 'filter hue-rotate-180 brightness-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.9)]' : ''
      } ${isEating ? 'animate-eat-shake' : 'animate-zombie-walk'} ${isVaulting ? 'animate-vault' : ''}`}
    >
      <svg viewBox="0 0 100 138" className="w-full h-full drop-shadow-xl overflow-visible">
        {/* Soft Drop Shadow beneath feet */}
        <ellipse cx="50" cy="130" rx="34" ry="7" fill="#000" opacity="0.4" />

        {/* Zombie Feet & Tattered Pants */}
        <g>
          {/* Left Leg */}
          <path d="M 35 124 L 35 90 L 47 90 L 47 124 Z" fill="#1e293b" />
          {/* Right Leg */}
          <path d="M 53 124 L 53 90 L 65 90 L 65 124 Z" fill="#1e293b" />
          
          {/* Tattered Torn Knees */}
          {isDamaged && (
            <g>
              <ellipse cx="41" cy="104" rx="4" ry="3" fill="#528816" />
              <path d="M 37 101 L 45 107" stroke="#0f172a" strokeWidth="1" />
            </g>
          )}

          {/* Dark Leather Shoes */}
          <ellipse cx="32" cy="124" rx="10" ry="5" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
          <ellipse cx="68" cy="124" rx="10" ry="5" fill="#090d16" stroke="#1e293b" strokeWidth="1" />
          <ellipse cx="30" cy="123" rx="4" ry="2" fill="#334155" opacity="0.6" />
          <ellipse cx="66" cy="123" rx="4" ry="2" fill="#334155" opacity="0.6" />
        </g>

        {/* Torso & Suit / Athletic Outfit */}
        {type === 'polevaulter' ? (
          <g>
            {/* Red Athletic Tank Top & Shorts */}
            <path d="M 26 56 L 74 56 L 68 94 L 32 94 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
            <polygon points="40,56 60,56 50,72" fill="#450a0a" />
            <path d="M 30 56 L 30 94" stroke="#f8fafc" strokeWidth="2.5" />
            <path d="M 70 56 L 70 94" stroke="#f8fafc" strokeWidth="2.5" />
          </g>
        ) : (
          <g>
            {/* Brown Tattered Suit Coat */}
            <path d="M 26 54 L 74 54 L 69 94 L 31 94 Z" fill="#6b3410" stroke="#3b1a04" strokeWidth="3" />
            {/* White Collared Shirt */}
            <polygon points="43,54 57,54 50,72" fill="#f1f5f9" />
            {/* Red Necktie */}
            <polygon points="48,54 52,54 54,78 46,78" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
            {/* Suit Lapels & Buttons */}
            <path d="M 30 54 L 43 68 L 34 84" stroke="#3b1a04" strokeWidth="2.5" fill="none" />
            <path d="M 70 54 L 57 68 L 66 84" stroke="#3b1a04" strokeWidth="2.5" fill="none" />
            <circle cx="50" cy="82" r="2" fill="#f59e0b" />
            {/* Patchwork detail */}
            <rect x="58" y="76" width="7" height="6" fill="#854d0e" stroke="#3b1a04" strokeWidth="1" rx="1" />
          </g>
        )}

        {/* Arms & Hands */}
        {type === 'polevaulter' ? (
          /* Pole Vaulter holding long pole */
          <g>
            <path d="M 28 60 L 10 68 L 8 72 L 26 66 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
            <path d="M 72 60 L 90 64 L 92 68 L 70 66 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
            {/* Vaulting Pole */}
            <path d="M -12 132 L 98 8" stroke="#b45309" strokeWidth="6" strokeLinecap="round" />
            <path d="M -12 132 L 98 8" stroke="#fef08a" strokeWidth="2" strokeDasharray="7,7" strokeLinecap="round" />
          </g>
        ) : isEating ? (
          /* Chomping Arms position */
          <g className="animate-pulse">
            <path d="M 28 60 L 56 56 L 53 63 L 26 67 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
            <path d="M 72 60 L 48 56 L 51 63 L 70 67 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
          </g>
        ) : (
          /* Classic Outstretched Zombie Arms */
          <g>
            {!isSeverelyDamaged && (
              <g>
                <path d="M 28 58 L 4 66 L 2 70 L 26 64 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
                {/* Claw Fingers */}
                <path d="M 2 70 L -2 68 M 2 70 L -3 72 M 2 70 L -1 75" stroke="#2e5209" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            )}
            <g>
              <path d="M 72 58 L 96 62 L 98 66 L 70 64 Z" fill="#528816" stroke="#2e5209" strokeWidth="2" />
              {/* Claw Fingers */}
              <path d="M 98 66 L 103 64 M 98 66 L 104 68 M 98 66 L 102 71" stroke="#2e5209" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* Flag Zombie Pole & Flag */}
        {type === 'flag' && (
          <g>
            <line x1="22" y1="95" x2="22" y2="-22" stroke="#78350f" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="22" cy="-24" r="3.5" fill="#f59e0b" />
            {/* Tattered Red Flag */}
            <path d="M 22 -22 Q 46 -26 70 -12 Q 46 -4 22 4 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
            {/* Brain Emblem */}
            <ellipse cx="44" cy="-10" rx="7" ry="5" fill="#fca5a5" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M 40 -10 Q 44 -13 48 -10" stroke="#e11d48" strokeWidth="1" fill="none" />
          </g>
        )}

        {/* Head Base */}
        <g>
          {/* Tattered Ears */}
          <ellipse cx="28" cy="38" rx="4" ry="6" fill="#528816" stroke="#2e5209" strokeWidth="1.5" />
          <ellipse cx="72" cy="38" rx="4" ry="6" fill="#528816" stroke="#2e5209" strokeWidth="1.5" />

          {/* Main Green Head Canvas */}
          <ellipse cx="50" cy="36" rx="22" ry="26" fill="#528816" stroke="#2e5209" strokeWidth="3" />
          {/* Jaw Contour Line */}
          <path d="M 32 42 Q 50 56 68 42" stroke="#2e5209" strokeWidth="2" fill="none" opacity="0.6" />

          {/* White Sports Headband for Pole Vaulter */}
          {type === 'polevaulter' && (
            <rect x="26" y="16" width="48" height="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
          )}

          {/* Bulging Asymmetrical Crazy Eyes */}
          <g>
            {/* Left Eye */}
            <circle cx="37" cy="30" r="7.5" fill="#fef08a" stroke="#1c1917" strokeWidth="2" />
            <circle cx="37" cy="30" r="3" fill="#000" />
            <circle cx="35.5" cy="28.5" r="1.2" fill="#fff" />

            {/* Right Eye */}
            <circle cx="59" cy="32" r="9.5" fill="#fef08a" stroke="#1c1917" strokeWidth="2" />
            <circle cx="59" cy="32" r="3.8" fill="#000" />
            <circle cx="57" cy="29.5" r="1.5" fill="#fff" />
          </g>

          {/* Open Mouth with Yellow Crooked Teeth & Saliva */}
          <g>
            <path d="M 34 48 Q 50 58 66 46 Q 50 62 34 48 Z" fill="#180e04" stroke="#2e5209" strokeWidth="2" />
            {/* Teeth */}
            <rect x="38" y="47" width="4" height="5" fill="#fef08a" rx="0.5" stroke="#713f12" strokeWidth="0.5" />
            <rect x="52" y="45" width="4" height="5" fill="#fef08a" rx="0.5" stroke="#713f12" strokeWidth="0.5" />
            <rect x="45" y="53" width="3.5" height="4" fill="#fef08a" rx="0.5" stroke="#713f12" strokeWidth="0.5" />
            {/* Saliva Drip */}
            <path d="M 43 53 Q 41 62 43 64" stroke="#e0f2fe" strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>

          {/* Lone Hair Strands */}
          <path d="M 46 10 Q 42 -2 52 2" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 52 10 Q 56 0 62 4" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Aussie Joe Face Overlay when isJoeFace is true */}
          {isJoeFace && (
            <g id="joe_face_overlay">
              {/* Sunglasses */}
              <rect x="30" y="24" width="40" height="12" fill="#0f172a" rx="3" stroke="#facc15" strokeWidth="1" />
              {/* Blonde Bush Mustache */}
              <path d="M 32 46 Q 50 56 68 46 Q 50 38 32 46 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Mini Akubra Bush Hat */}
              <path d="M 20 20 Q 50 -5 80 20 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
              <rect x="32" y="8" width="36" height="10" fill="#9a3412" rx="2" />
            </g>
          )}
        </g>

        {/* Conehead Headgear (3D Traffic Cone) */}
        {type === 'conehead' && (
          <g>
            {hpPercent > 0.66 ? (
              /* Full Intact Cone */
              <g>
                <polygon points="26,20 50,-22 74,20" fill="#f97316" stroke="#c2410c" strokeWidth="3" />
                <ellipse cx="50" cy="20" rx="24" ry="6" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
                <path d="M 34 6 L 66 6" stroke="#ffffff" strokeWidth="5" />
                <path d="M 37 -7 L 63 -7" stroke="#ffffff" strokeWidth="3.5" />
                {/* Metallic Base Lip */}
                <ellipse cx="50" cy="20" rx="22" ry="3" fill="#9a3412" opacity="0.4" />
              </g>
            ) : hpPercent > 0.33 ? (
              /* Damaged Cone */
              <g>
                <polygon points="28,20 52,-14 70,20" fill="#f97316" stroke="#c2410c" strokeWidth="3" />
                <ellipse cx="50" cy="20" rx="22" ry="5" fill="#ea580c" />
                <path d="M 36 8 L 64 8" stroke="#ffffff" strokeWidth="4" />
                <path d="M 40 2 L 48 16" stroke="#451a03" strokeWidth="3" />
              </g>
            ) : null}
          </g>
        )}

        {/* Buckethead Headgear (Steel Bucket) */}
        {type === 'buckethead' && (
          <g>
            {hpPercent > 0.66 ? (
              /* Intact Shiny Galvanized Bucket */
              <g>
                <path d="M 24 20 L 28 -16 L 72 -16 L 76 20 Z" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
                <ellipse cx="50" cy="-16" rx="22" ry="6" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
                <path d="M 26 18 Q 50 25 74 18" stroke="#1e293b" strokeWidth="3" fill="none" />
                <circle cx="26" cy="16" r="3.5" fill="#0f172a" />
                <circle cx="74" cy="16" r="3.5" fill="#0f172a" />
                {/* Shiny Reflection */}
                <path d="M 36 -10 L 42 16" stroke="#ffffff" strokeWidth="3.5" opacity="0.7" strokeLinecap="round" />
              </g>
            ) : hpPercent > 0.25 ? (
              /* Dented Rust Bucket */
              <g>
                <path d="M 26 20 L 30 -12 L 70 -12 L 74 20 Z" fill="#64748b" stroke="#1e293b" strokeWidth="3" />
                <ellipse cx="50" cy="-12" rx="20" ry="5" fill="#94a3b8" />
                <path d="M 28 18 Q 50 24 72 18" stroke="#0f172a" strokeWidth="3" fill="none" />
                {/* Dent cracks */}
                <path d="M 40 -6 L 52 6 L 46 16" stroke="#451a03" strokeWidth="3" fill="none" />
              </g>
            ) : null}
          </g>
        )}
      </svg>
    </div>
  );
});


// Projectile (Green Pea, Frozen Pea, Eucalyptus Leaf, or Meat Pie)
export const ProjectileSprite: React.FC<{ type: 'pea' | 'frozenPea' | 'eucalyptus_leaf' | 'meat_pie' }> = React.memo(({ type }) => {
  if (type === 'meat_pie') {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center animate-spin-slow drop-shadow-[0_2px_10px_rgba(217,119,6,0.9)]">
        <svg viewBox="0 0 50 50" className="w-full h-full">
          <ellipse cx="25" cy="25" rx="20" ry="14" fill="#d97706" stroke="#78350f" strokeWidth="2" />
          <ellipse cx="25" cy="22" rx="16" ry="10" fill="#f59e0b" />
          <path d="M 12 22 Q 18 18 25 22 Q 32 18 38 22" stroke="#b45309" strokeWidth="2" fill="none" />
          <circle cx="20" cy="12" r="1.5" fill="#fef08a" opacity="0.8" />
          <circle cx="28" cy="10" r="2" fill="#fef08a" opacity="0.8" />
        </svg>
      </div>
    );
  }

  if (type === 'eucalyptus_leaf') {
    return (
      <div className="relative w-6 h-6 flex items-center justify-center animate-spin-slow drop-shadow-[0_2px_8px_rgba(34,197,94,0.8)]">
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <ellipse cx="20" cy="20" rx="16" ry="8" fill="#22c55e" stroke="#14532d" strokeWidth="2" transform="rotate(-30 20 20)" />
          <path d="M 6 26 Q 20 18 34 14" stroke="#86efac" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="20" cy="20" r="2" fill="#fde047" className="animate-ping" />
        </svg>
      </div>
    );
  }

  if (type === 'frozenPea') {
    return (
      <div className="w-5 h-5 rounded-full bg-cyan-300 border-2 border-cyan-600 shadow-md flex items-center justify-center animate-pulse">
        <div className="w-2 h-2 rounded-full bg-white opacity-80" />
      </div>
    );
  }

  return (
    <div className="relative w-5 h-5 flex items-center justify-center drop-shadow">
      <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-amber-800 shadow-sm flex items-center justify-center relative">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-100 opacity-90" />
        <div className="absolute -top-0.5 w-1 h-1 bg-amber-700 rotate-45" />
        <div className="absolute -bottom-0.5 w-1 h-1 bg-amber-700 rotate-45" />
        <div className="absolute -left-0.5 w-1 h-1 bg-amber-700 rotate-45" />
        <div className="absolute -right-0.5 w-1 h-1 bg-amber-700 rotate-45" />
      </div>
    </div>
  );
});

// Prawn Currency Icon Component
export const PrawnIcon: React.FC<{ className?: string }> = React.memo(({ className = 'w-6 h-6' }) => (
  <img
    src={PRAWN_CURRENCY_IMAGE}
    alt="Prawn"
    className={`rounded-full border border-amber-500 object-cover shadow-sm ${className}`}
  />
));

// Prawn Collectable Component (Falls from sky / Produced by Sunflowers)
export const SunSprite: React.FC<{ onClick: () => void }> = React.memo(({ onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="relative w-14 h-14 cursor-pointer transition-transform hover:scale-125 active:scale-90 animate-bounce-gentle drop-shadow-[0_8px_16px_rgba(249,115,22,0.7)] group"
      title="Click to collect Prawn currency!"
    >
      {/* Outer Glowing Pulsing Aura */}
      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-300 opacity-75 blur-sm animate-pulse pointer-events-none" />
      
      {/* Prawn Coin Badge */}
      <div className="relative w-full h-full rounded-full border-2 border-amber-300 bg-amber-950/80 p-0.5 overflow-hidden shadow-2xl">
        <img
          src={PRAWN_CURRENCY_IMAGE}
          alt="Prawn Currency"
          className="w-full h-full rounded-full object-cover group-hover:scale-110 transition-transform duration-200"
        />
      </div>
    </button>
  );
});

// LawnMower Component
export const LawnMowerSprite: React.FC<{ isTriggered: boolean }> = React.memo(({ isTriggered }) => {
  return (
    <div className={`relative w-14 h-12 drop-shadow-lg ${isTriggered ? 'animate-vibrate' : ''}`}>
      <svg viewBox="0 0 120 100" className="w-full h-full">
        {/* Wheels */}
        <circle cx="30" cy="80" r="14" fill="#334155" stroke="#0f172a" strokeWidth="4" />
        <circle cx="30" cy="80" r="5" fill="#94a3b8" />
        <circle cx="90" cy="80" r="14" fill="#334155" stroke="#0f172a" strokeWidth="4" />
        <circle cx="90" cy="80" r="5" fill="#94a3b8" />

        {/* Red Main Engine Body */}
        <rect x="20" y="45" width="80" height="30" rx="8" fill="#dc2626" stroke="#991b1b" strokeWidth="4" />
        <rect x="40" y="30" width="40" height="20" rx="4" fill="#475569" stroke="#1e293b" strokeWidth="3" />

        {/* Handle Bar */}
        <path d="M 30 50 L 10 15 L 0 15" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="0" cy="15" r="5" fill="#dc2626" />

        {/* Exhaust fumes when triggered */}
        {isTriggered && (
          <g className="animate-ping">
            <circle cx="10" cy="50" r="6" fill="#94a3b8" opacity="0.7" />
            <circle cx="-5" cy="55" r="10" fill="#cbd5e1" opacity="0.5" />
          </g>
        )}
      </svg>
    </div>
  );
});

// Floppy Disc Sprite for Secret Glitch Level Save File
export const FloppyDiscSprite: React.FC = React.memo(() => (
  <div className="relative w-16 h-16 flex flex-col items-center justify-center animate-pulse drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Black 3.5" Floppy Plastic Shell */}
      <rect x="5" y="5" width="90" height="90" fill="#1e293b" stroke="#0284c7" strokeWidth="3" rx="6" />
      {/* Top Silver Metal Slider Shutter */}
      <rect x="25" y="5" width="50" height="35" fill="#94a3b8" stroke="#475569" strokeWidth="2" rx="2" />
      <rect x="55" y="12" width="12" height="20" fill="#0f172a" rx="1" />
      {/* White Paper Label */}
      <rect x="15" y="45" width="70" height="45" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="3" />
      {/* Red/Blue Banner on Label */}
      <rect x="15" y="45" width="70" height="12" fill="#ef4444" />
      <text x="50" y="54" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">SAVE FILE</text>
      <text x="50" y="72" textAnchor="middle" fill="#0284c7" fontSize="8" fontWeight="black" fontFamily="monospace">PROTECT</text>
      {/* Matrix Code lines on label */}
      <path d="M 20 80 L 80 80" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,2" />
    </svg>
  </div>
));
