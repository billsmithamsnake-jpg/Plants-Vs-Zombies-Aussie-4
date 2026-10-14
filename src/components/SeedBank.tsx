import React, { useEffect } from 'react';
import { PlantConfig, PlantType } from '../types';
import { soundFx } from '../utils/audio';
import { PrawnIcon } from './PVZRenderers';
import { SeedPacket } from './SeedPacket';

interface SeedBankProps {
  sun: number;
  unlockedPlants: PlantConfig[];
  selectedPlant: PlantType | null;
  onSelectPlant: (type: PlantType | null) => void;
  isShovelSelected: boolean;
  onSelectShovel: (selected: boolean) => void;
  cooldowns: Record<PlantType, number>; // remaining cooldown in ms
  onOpenMenu: () => void;
}

export const SeedBank: React.FC<SeedBankProps> = React.memo(({
  sun,
  unlockedPlants,
  selectedPlant,
  onSelectPlant,
  isShovelSelected,
  onSelectShovel,
  cooldowns,
  onOpenMenu,
}) => {
  // Keybind listener for numbers 1 to 8
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= unlockedPlants.length) {
        const targetPlant = unlockedPlants[num - 1];
        if (targetPlant) {
          const cdRemaining = cooldowns[targetPlant.type] || 0;
          if (sun >= targetPlant.cost && cdRemaining <= 0) {
            soundFx.playClick();
            onSelectShovel(false);
            onSelectPlant(selectedPlant === targetPlant.type ? null : targetPlant.type);
          }
        }
      } else if (e.key.toLowerCase() === 's') {
        // 'S' key toggles Shovel
        soundFx.playClick();
        onSelectPlant(null);
        onSelectShovel(!isShovelSelected);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockedPlants, sun, cooldowns, selectedPlant, isShovelSelected, onSelectPlant, onSelectShovel]);

  return (
    <div className="relative w-full bg-[#3d210b] border-b-4 border-amber-950 shadow-2xl p-1.5 px-3 flex items-center justify-between select-none font-serif z-20">
      {/* Seed Packet Strip Container */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {/* Prawn Currency Box */}
        <div className="relative bg-[#200f04] border-2 border-amber-600 rounded-lg p-1.5 px-3 flex items-center gap-2 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] min-w-[110px]">
          <div className="w-8 h-8 animate-bounce-gentle shrink-0">
            <PrawnIcon className="w-8 h-8" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-bold text-amber-400/80 font-mono tracking-widest uppercase">PRAWNS</span>
            <span className="text-xl font-black text-amber-200 font-mono tracking-wider">
              {sun}
            </span>
          </div>
        </div>

        {/* Plant Seed Packets */}
        <div className="flex items-center gap-1.5">
          {unlockedPlants.map((plant, idx) => {
            const isSelected = selectedPlant === plant.type && !isShovelSelected;
            const cdRemaining = cooldowns[plant.type] || 0;
            const isOnCooldown = cdRemaining > 0;

            return (
              <SeedPacket
                key={plant.type}
                plant={plant}
                index={idx}
                sun={sun}
                isSelected={isSelected}
                isOnCooldown={isOnCooldown}
                cdRemainingMs={cdRemaining}
                onSelect={(type) => {
                  onSelectShovel(false);
                  onSelectPlant(selectedPlant === type ? null : type);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Right Controls: Shovel & Menu */}
      <div className="flex items-center gap-2.5">
        {/* Shovel Tool */}
        <button
          onClick={() => {
            soundFx.playClick();
            onSelectPlant(null);
            onSelectShovel(!isShovelSelected);
          }}
          className={`relative w-14 h-14 bg-[#231206] border-2 ${
            isShovelSelected
              ? 'border-yellow-400 ring-4 ring-yellow-400 scale-105'
              : 'border-amber-700 hover:border-amber-400'
          } rounded-xl flex items-center justify-center shadow-lg transition active:scale-95 group`}
          title="Shovel [Hotkey: S] - Dig up plant"
        >
          <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow group-hover:scale-110 transition-transform">
            <path d="M 60 10 L 85 35 L 45 75 L 35 65 Z" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
            <path d="M 38 68 L 15 90 L 10 85 L 33 63 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[9px] font-mono font-bold text-amber-400/80">S</span>
        </button>

        {/* Menu Pause Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenMenu();
          }}
          className="bg-gradient-to-b from-stone-700 to-stone-900 hover:from-stone-600 hover:to-stone-800 border-2 border-stone-500 rounded-xl px-5 py-3 font-extrabold text-lime-400 text-lg tracking-wider uppercase shadow-xl active:scale-95 transition cursor-pointer"
        >
          MENU
        </button>
      </div>
    </div>
  );
});


