import React, { useState } from 'react';
import { ALL_PLANTS, ZOMBIE_TYPES } from '../data/pvzData';
import { soundFx } from '../utils/audio';
import { PlantSprite, ZombieSprite } from './PVZRenderers';

interface OzAlmanacModalProps {
  highestLevelUnlocked?: number;
  onClose: () => void;
}

export const OzAlmanacModal: React.FC<OzAlmanacModalProps> = ({
  highestLevelUnlocked = 1,
  onClose,
}) => {
  const [tab, setTab] = useState<'plants' | 'zombies'>('plants');
  const [selectedPlant, setSelectedPlant] = useState(ALL_PLANTS[0].type);
  const [selectedZombie, setSelectedZombie] = useState(ZOMBIE_TYPES[0].type);

  const activePlantObj = ALL_PLANTS.find((p) => p.type === selectedPlant) || ALL_PLANTS[0];
  const activeZombieObj = ZOMBIE_TYPES.find((z) => z.type === selectedZombie) || ZOMBIE_TYPES[0];

  const isPlantUnlocked = activePlantObj.unlockedAtLevel <= highestLevelUnlocked;
  const isZombieUnlocked = (activeZombieObj.introducedAtLevel || 1) <= highestLevelUnlocked;

  const unlockedPlantsCount = ALL_PLANTS.filter((p) => p.unlockedAtLevel <= highestLevelUnlocked).length;
  const unlockedZombiesCount = ZOMBIE_TYPES.filter((z) => (z.introducedAtLevel || 1) <= highestLevelUnlocked).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-amber-950 border-4 border-amber-600 rounded-3xl shadow-2xl p-6 text-amber-100 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header with Outback Book theme */}
        <div className="flex items-center justify-between border-b-2 border-amber-700 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-800 border-2 border-amber-500 rounded-lg flex items-center justify-center text-2xl">
              🦘
            </div>
            <div>
              <h2 className="text-2xl font-black text-amber-300 tracking-wider font-serif uppercase">
                OZ ALMANAC OF OUTBACK FLORA & ZOMBIES
              </h2>
              <p className="text-xs text-amber-400">G'day mate! Field guide to defend yer lawn.</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="w-10 h-10 bg-red-800 hover:bg-red-700 border-2 border-red-500 rounded-full font-black text-white text-xl flex items-center justify-center shadow transition active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => {
              soundFx.playClick();
              setTab('plants');
            }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-lg tracking-wider uppercase border-2 transition ${
              tab === 'plants'
                ? 'bg-gradient-to-b from-green-700 to-green-900 border-green-400 text-green-200 shadow-lg'
                : 'bg-amber-900/60 hover:bg-amber-800/80 border-amber-700 text-amber-400'
            }`}
          >
            🌱 Outback Plants ({unlockedPlantsCount}/{ALL_PLANTS.length})
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setTab('zombies');
            }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-lg tracking-wider uppercase border-2 transition ${
              tab === 'zombies'
                ? 'bg-gradient-to-b from-red-800 to-red-950 border-red-400 text-red-200 shadow-lg'
                : 'bg-amber-900/60 hover:bg-amber-800/80 border-amber-700 text-amber-400'
            }`}
          >
            🧟 Aussie Zombies ({unlockedZombiesCount}/{ZOMBIE_TYPES.length})
          </button>
        </div>

        {/* Main Content Split: List on Left, Preview Card on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden flex-1">
          {/* Left: Scrollable Selection Grid */}
          <div className="bg-amber-900/40 border-2 border-amber-800 rounded-2xl p-3 overflow-y-auto max-h-[380px] grid grid-cols-2 gap-2">
            {tab === 'plants'
              ? ALL_PLANTS.map((plant) => {
                  const isUnlocked = plant.unlockedAtLevel <= highestLevelUnlocked;
                  return (
                    <button
                      key={plant.type}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedPlant(plant.type);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 transition ${
                        selectedPlant === plant.type
                          ? isUnlocked
                            ? 'bg-green-900/80 border-lime-400 shadow-md'
                            : 'bg-stone-900/90 border-amber-600 shadow-md'
                          : isUnlocked
                          ? 'bg-amber-950/60 hover:bg-amber-900/60 border-amber-800'
                          : 'bg-stone-950/70 opacity-60 hover:opacity-80 border-stone-800'
                      }`}
                    >
                      <div className="w-12 h-12 bg-stone-900 rounded-lg flex items-center justify-center p-1 shrink-0 border border-amber-700 relative overflow-hidden">
                        {isUnlocked ? (
                          <PlantSprite type={plant.type} hp={plant.maxHp} maxHp={plant.maxHp} isAnimated={false} />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-stone-500 font-black">
                            <span className="text-lg">🔒</span>
                          </div>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <div className={`font-extrabold text-sm truncate ${isUnlocked ? 'text-amber-200' : 'text-stone-400'}`}>
                          {isUnlocked ? plant.name : '???'}
                        </div>
                        <div className="text-xs text-lime-400 font-bold">
                          {isUnlocked ? `🦐 ${plant.cost}` : `Lvl ${plant.unlockedAtLevel}`}
                        </div>
                      </div>
                    </button>
                  );
                })
              : ZOMBIE_TYPES.map((zombie) => {
                  const isUnlocked = (zombie.introducedAtLevel || 1) <= highestLevelUnlocked;
                  return (
                    <button
                      key={zombie.type}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedZombie(zombie.type);
                      }}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border-2 transition ${
                        selectedZombie === zombie.type
                          ? isUnlocked
                            ? 'bg-red-950/80 border-red-400 shadow-md'
                            : 'bg-stone-900/90 border-amber-600 shadow-md'
                          : isUnlocked
                          ? 'bg-amber-950/60 hover:bg-amber-900/60 border-amber-800'
                          : 'bg-stone-950/70 opacity-60 hover:opacity-80 border-stone-800'
                      }`}
                    >
                      <div className="w-12 h-12 bg-stone-900 rounded-lg flex items-center justify-center p-1 shrink-0 border border-amber-700 relative overflow-hidden">
                        {isUnlocked ? (
                          <ZombieSprite type={zombie.type} hp={zombie.maxHp} maxHp={zombie.maxHp} isEating={false} />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-stone-500 font-black">
                            <span className="text-lg">🔒</span>
                          </div>
                        )}
                      </div>
                      <div className="text-left overflow-hidden">
                        <div className={`font-extrabold text-sm truncate ${isUnlocked ? 'text-amber-200' : 'text-stone-400'}`}>
                          {isUnlocked ? zombie.name : '???'}
                        </div>
                        <div className="text-xs text-red-300 font-bold">
                          {isUnlocked ? `HP: ${zombie.maxHp}` : `Lvl ${zombie.introducedAtLevel || 1}`}
                        </div>
                      </div>
                    </button>
                  );
                })}
          </div>

          {/* Right: Detailed Card View */}
          <div className="bg-amber-900/80 border-2 border-amber-700 rounded-2xl p-4 flex flex-col items-center text-center overflow-y-auto">
            {tab === 'plants' ? (
              isPlantUnlocked ? (
                <>
                  <div className="w-24 h-24 bg-amber-950 border-2 border-amber-600 rounded-2xl flex items-center justify-center mb-3 shadow-inner p-2">
                    <PlantSprite type={activePlantObj.type} hp={activePlantObj.maxHp} maxHp={activePlantObj.maxHp} isAnimated={true} />
                  </div>
                  <h3 className="text-2xl font-black text-amber-200 mb-1">{activePlantObj.name}</h3>
                  <div className="flex gap-4 text-xs font-bold text-amber-300 mb-3 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-800">
                    <span>Prawn Cost: 🦐 {activePlantObj.cost}</span>
                    <span>Cooldown: ⏱️ {activePlantObj.cooldown}s</span>
                    <span>Health: ❤️ {activePlantObj.maxHp}</span>
                  </div>
                  <p className="text-amber-100 text-sm italic leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/60">
                    "{activePlantObj.description}"
                  </p>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 bg-stone-950 border-2 border-stone-700 rounded-2xl flex flex-col items-center justify-center mb-3 shadow-inner p-2 text-stone-500">
                    <span className="text-4xl">🔒</span>
                  </div>
                  <h3 className="text-2xl font-black text-stone-400 mb-1">??? (Locked Plant)</h3>
                  <div className="flex gap-4 text-xs font-bold text-amber-400 mb-3 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-800">
                    <span>🔒 Unlocks at Level {activePlantObj.unlockedAtLevel}</span>
                  </div>
                  <p className="text-stone-400 text-sm italic leading-relaxed bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                    "G'day mate! You haven't discovered this Outback plant yet. Complete Level {activePlantObj.unlockedAtLevel - 1} to unveil this entry in your Oz Almanac!"
                  </p>
                </>
              )
            ) : isZombieUnlocked ? (
              <>
                <div className="w-24 h-24 bg-amber-950 border-2 border-amber-600 rounded-2xl flex items-center justify-center mb-3 shadow-inner p-2">
                  <ZombieSprite type={activeZombieObj.type} hp={activeZombieObj.maxHp} maxHp={activeZombieObj.maxHp} isEating={false} />
                </div>
                <h3 className="text-2xl font-black text-amber-200 mb-1">{activeZombieObj.name}</h3>
                <div className="flex gap-4 text-xs font-bold text-red-300 mb-3 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-800">
                  <span>Toughness: ❤️ {activeZombieObj.maxHp}</span>
                  <span>Speed: ⚡ {activeZombieObj.speed}</span>
                </div>
                <p className="text-amber-100 text-sm italic leading-relaxed bg-amber-950/40 p-3 rounded-xl border border-amber-800/60">
                  "{activeZombieObj.description}"
                </p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 bg-stone-950 border-2 border-stone-700 rounded-2xl flex flex-col items-center justify-center mb-3 shadow-inner p-2 text-stone-500">
                  <span className="text-4xl">🔒</span>
                </div>
                <h3 className="text-2xl font-black text-stone-400 mb-1">??? (Unknown Zombie)</h3>
                <div className="flex gap-4 text-xs font-bold text-red-400 mb-3 bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-800">
                  <span>🔒 Encounters at Level {activeZombieObj.introducedAtLevel || 1}</span>
                </div>
                <p className="text-stone-400 text-sm italic leading-relaxed bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                  "G'day mate! This zombie entry is locked. Battle your way to Level {activeZombieObj.introducedAtLevel || 1} in your Outback adventure to encounter this menace!"
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-amber-800 flex justify-end">
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-b from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 border-2 border-amber-500 rounded-xl font-bold text-amber-100 uppercase shadow active:scale-95 transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
