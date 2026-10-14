import React from 'react';
import { PlantConfig, PlantType } from '../types';
import { soundFx } from '../utils/audio';
import { PlantSprite, PrawnIcon } from './PVZRenderers';

interface SeedPacketProps {
  plant: PlantConfig;
  index: number; // 0-based index for hotkey 1-8
  sun: number;
  isSelected: boolean;
  isOnCooldown: boolean;
  cdRemainingMs: number;
  onSelect: (type: PlantType) => void;
  compact?: boolean;
}

export const SeedPacket: React.FC<SeedPacketProps> = React.memo(({
  plant,
  index,
  sun,
  isSelected,
  isOnCooldown,
  cdRemainingMs,
  onSelect,
  compact = false,
}) => {
  const canAfford = sun >= plant.cost;
  const activeCooldown = isOnCooldown || cdRemainingMs > 30;
  const isAvailable = canAfford && !activeCooldown;
  const cdPercentage = (cdRemainingMs / (plant.cooldown * 1000)) * 100;

  if (compact) {
    return (
      <button
        type="button"
        disabled={!isAvailable}
        onClick={() => {
          if (isAvailable) {
            soundFx.playClick();
            onSelect(plant.type);
          }
        }}
        className={`relative w-[42px] h-[54px] rounded flex flex-col justify-between p-0.5 transition-all duration-150 select-none group cursor-pointer ${
          isSelected
            ? 'ring-2 ring-yellow-400 border-2 border-amber-200 scale-110 z-20 shadow-[0_0_12px_rgba(250,204,21,0.9)] bg-[#fde68a]'
            : isAvailable
            ? 'hover:scale-105 hover:border-amber-300 active:scale-95 shadow-md border border-amber-900 bg-[#ebdcb9]'
            : 'opacity-70 cursor-not-allowed border border-stone-800 bg-[#786850]'
        }`}
        title={`${plant.name} - Cost: ${plant.cost} Prawns [Hotkey: ${index === 9 ? '0' : index + 1}]`}
      >
        {/* Hotkey Badge */}
        <div className="absolute top-0 left-0.5 z-10 bg-amber-950/80 border border-amber-600/80 rounded-br px-0.5 text-[7px] font-mono font-bold text-amber-300 leading-none">
          {index === 9 ? '0' : index + 1}
        </div>

        {/* Center Plant Art */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pt-1">
          <div className={`transform scale-65 ${isAvailable ? 'group-hover:scale-75' : 'filter grayscale opacity-60'}`}>
            <PlantSprite type={plant.type} hp={100} maxHp={100} isAnimated={isAvailable} />
          </div>
        </div>

        {/* Bottom Prawn Cost Tag */}
        <div className="w-full bg-[#2a170a] border-t border-amber-800 flex items-center justify-between px-0.5 py-0.2 rounded-b-xs leading-none">
          <PrawnIcon className="w-3 h-3 shrink-0" />
          <span
            className={`text-[9px] font-black font-mono tracking-tighter ${
              canAfford ? 'text-amber-200' : 'text-red-400'
            }`}
          >
            {plant.cost}
          </span>
        </div>

        {/* Unaffordable Overlay */}
        {!canAfford && !activeCooldown && (
          <div className="absolute inset-0 bg-black/50 rounded pointer-events-none flex items-center justify-center z-10">
            <span className="text-[7px] font-mono font-black text-red-300">NO PRAWNS</span>
          </div>
        )}

        {/* Cooldown Sweep Translucent Overlay */}
        {activeCooldown && (
          <div className="absolute inset-0 rounded overflow-hidden pointer-events-none z-20">
            <div
              className="w-full bg-stone-900/85 backdrop-blur-[1px] transition-all duration-75 flex items-center justify-center"
              style={{
                height: `${Math.min(100, Math.max(0, cdPercentage))}%`,
              }}
            >
              <span className="text-amber-300 font-mono text-[9px] font-black drop-shadow">
                {Math.ceil(cdRemainingMs / 1000)}s
              </span>
            </div>
          </div>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={!isAvailable}
      onClick={() => {
        if (isAvailable) {
          soundFx.playClick();
          onSelect(plant.type);
        }
      }}
      className={`relative w-[68px] h-[92px] rounded-md flex flex-col justify-between p-1 transition-all duration-150 select-none group cursor-pointer ${
        isSelected
          ? 'ring-4 ring-yellow-400 border-2 border-amber-300 scale-105 z-20 shadow-[0_0_15px_rgba(250,204,21,0.8)]'
          : isAvailable
          ? 'hover:scale-102 hover:border-amber-400 active:scale-95 shadow-md border-2 border-amber-900/80 bg-[#d8c39d]'
          : 'opacity-75 cursor-not-allowed border-2 border-stone-700 bg-[#8c7b60]'
      }`}
      style={{
        background: isAvailable
          ? 'linear-gradient(to bottom, #ebdcb9, #c9b48c)'
          : '#786850',
      }}
      title={`${plant.name} - Cost: ${plant.cost} Prawns (Press ${index + 1})`}
    >
      {/* Outer Cardboard Border & Bevel */}
      <div className="absolute inset-0 border border-amber-950/40 rounded-md pointer-events-none" />

      {/* Top Header: Plant Name Tag */}
      <div className="w-full bg-[#3d2312] border-b border-amber-700/60 rounded-t-sm px-0.5 py-0.5 text-center leading-none">
        <span className="text-[9px] font-black font-sans text-amber-200 uppercase tracking-tighter block truncate">
          {plant.name}
        </span>
      </div>

      {/* Hotkey Number Badge (Top-Left) */}
      <div className="absolute top-0.5 left-0.5 z-10 bg-amber-950/80 border border-amber-600/80 rounded-br px-1 text-[8px] font-mono font-bold text-amber-300">
        {index + 1}
      </div>

      {/* Center Plant Art Illustration */}
      <div className="relative flex-1 w-full flex items-center justify-center my-0.5 overflow-hidden">
        <div className={`transform transition-transform ${isAvailable ? 'group-hover:scale-110' : 'filter grayscale opacity-60'}`}>
          <PlantSprite type={plant.type} hp={100} maxHp={100} isAnimated={isAvailable} />
        </div>
      </div>

      {/* Bottom Prawn Cost Badge Tag */}
      <div className="w-full bg-[#2a170a] border-t border-amber-800 flex items-center justify-between px-1 py-0.5 rounded-b-sm">
        {/* Little Prawn Icon */}
        <div className="w-4 h-4 flex items-center justify-center">
          <PrawnIcon className="w-3.5 h-3.5" />
        </div>

        {/* Cost Number */}
        <span
          className={`text-xs font-black font-mono tracking-tight ${
            canAfford ? 'text-amber-200' : 'text-red-400 font-bold'
          }`}
        >
          {plant.cost}
        </span>
      </div>

      {/* Unaffordable Overlay */}
      {!canAfford && !activeCooldown && (
        <div className="absolute inset-0 bg-black/40 rounded-md pointer-events-none flex items-center justify-center">
          <span className="text-[9px] font-mono font-black text-red-300 bg-black/80 px-1 rounded">
            NO PRAWNS
          </span>
        </div>
      )}

      {/* Cooldown Sweep Translucent Overlay */}
      {activeCooldown && (
        <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none z-10">
          <div
            className="w-full bg-stone-900/85 backdrop-blur-[1px] transition-all duration-75 flex items-center justify-center"
            style={{
              height: `${Math.min(100, Math.max(0, cdPercentage))}%`,
            }}
          >
            <span className="text-amber-300 font-mono text-xs font-black drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              {Math.ceil(cdRemainingMs / 1000)}s
            </span>
          </div>
        </div>
      )}
    </button>
  );
});

