import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BATTLEFIELD_BG_IMAGE } from '../assets/images';
import {
  LevelConfig,
  PlantConfig,
  PlantedPlant,
  PlantType,
  Projectile,
  Sun,
  Zombie,
  ZombieType,
  LawnMower,
  VisualEffect,
} from '../types';
import { soundFx, outbackMusic } from '../utils/audio';
import { AussieJoeDialog, AUSSIE_JOE_VICTORY_DIALOGUE, AUSSIE_JOE_ROAST_DIALOGUE } from './AussieJoeDialog';
import {
  LawnMowerSprite,
  PlantSprite,
  ProjectileSprite,
  SunSprite,
  ZombieSprite,
  PrawnIcon,
  FloppyDiscSprite,
} from './PVZRenderers';
import { SeedPacket } from './SeedPacket';
import { ExplosionEffect } from './ExplosionEffect';
import { BeeRFlyover, BeeRSprite } from './BeeRFlyover';
import {
  PlayerStats,
  getPlayerStats,
  recordPlantLost,
  recordPlantPlanted,
  recordSunCollected,
  recordTimePlayed,
  recordZombieKills,
  markBeeRRoastSeen,
} from '../utils/playerStats';

interface GameBoardProps {
  level: LevelConfig;
  allPlants: PlantConfig[];
  initialSun?: number;
  initialPlants?: PlantedPlant[];
  initialZombies?: Zombie[];
  initialMowers?: LawnMower[];
  unlockedAchievements?: string[];
  unlockAchievement?: (id: string) => void;
  isTesterMode?: boolean;
  isPaused?: boolean;
  playerStats?: PlayerStats;
  onStatsUpdate?: (stats: PlayerStats) => void;
  onPause: () => void;
  onVictory: (sunLeft: number) => void;
  onGameOver: () => void;
  onStateUpdate?: (plants: PlantedPlant[], zombies: Zombie[], sun: number) => void;
}

const ROW_COUNT = 5;
const COL_COUNT = 9;
const TILE_WIDTH = 69.44; // px (625px / 9 cols)
const TILE_HEIGHT = 76; // px (380px / 5 rows)

export const GameBoard: React.FC<GameBoardProps> = React.memo(({
  level,
  allPlants,
  initialSun = 150,
  initialPlants = [],
  initialZombies = [],
  initialMowers,
  unlockedAchievements = [],
  unlockAchievement,
  isTesterMode = false,
  isPaused = false,
  playerStats,
  onStatsUpdate,
  onPause,
  onVictory,
  onGameOver,
  onStateUpdate,
}) => {
  // Synchronous game refs for atomic tick execution
  const plantsRef = useRef<PlantedPlant[]>(initialPlants);
  const zombiesRef = useRef<Zombie[]>(initialZombies);
  const projectilesRef = useRef<Projectile[]>([]);
  const sunsRef = useRef<Sun[]>([]);
  const mowersRef = useRef<LawnMower[]>(
    initialMowers ||
      Array.from({ length: 5 }, (_, i) => ({
        row: i,
        x: 0,
        state: 'idle',
      }))
  );
  const effectsRef = useRef<VisualEffect[]>([]);
  const startingSun = level.levelNumber === 99 ? 2500 : initialSun;
  const sunRef = useRef<number>(startingSun);
  const zombiesDefeatedRef = useRef<number>(0);
  const zombiesSpawnedRef = useRef<number>(initialZombies.length);
  const gargantuarSpawnedRef = useRef<boolean>(false);
  const totalPrawnsCollectedRef = useRef<number>(0);
  const bucketheadKillsRef = useRef<number>(0);
  const cooldownsRef = useRef<Record<PlantType, number>>({
    peashooter: 0,
    grillflower: 0,
    sunflower: 0,
    potatomine: 0,
    walnut: 0,
    repeater: 0,
    snowpea: 0,
    cherrybomb: 0,
    chomper: 0,
    threepeater: 0,
    rottenbabytomato: 0,
    mini_eucalyptus: 0,
  });

  // UI Mirror state for React rendering
  const [sun, setSun] = useState<number>(startingSun);
  const [plants, setPlants] = useState<PlantedPlant[]>(initialPlants);
  const [zombies, setZombies] = useState<Zombie[]>(initialZombies);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [suns, setSuns] = useState<Sun[]>([]);
  const [mowers, setMowers] = useState<LawnMower[]>(mowersRef.current);
  const [effects, setEffects] = useState<VisualEffect[]>([]);
  const [cooldowns, setCooldowns] = useState<Record<PlantType, number>>(cooldownsRef.current);
  const [zombiesDefeated, setZombiesDefeated] = useState<number>(0);

  const [selectedPlant, setSelectedPlant] = useState<PlantType | null>(null);
  const [isShovelSelected, setIsShovelSelected] = useState<boolean>(false);
  const [isFastForward, setIsFastForward] = useState<boolean>(false);
  const isFastForwardRef = useRef<boolean>(false);
  isFastForwardRef.current = isFastForward;
  const [hoverTile, setHoverTile] = useState<{ row: number; col: number } | null>(null);
  const [hugeWaveBanner, setHugeWaveBanner] = useState<boolean>(false);

  // Aussie Joe Dialogue state
  const [showAussieJoeIntro, setShowAussieJoeIntro] = useState<boolean>(true);
  const [showAussieJoeVictory, setShowAussieJoeVictory] = useState<boolean>(false);
  const [showVictoryOverlay, setShowVictoryOverlay] = useState<boolean>(false);
  const [victoryTriggered, setVictoryTriggered] = useState<boolean>(false);
  const victoryTriggeredRef = useRef<boolean>(false);

  // Level 99 States
  const [level99Countdown, setLevel99Countdown] = useState<number | null>(null);
  const [showLevel99JoeDialogue, setShowLevel99JoeDialogue] = useState<boolean>(false);
  const level99JoePhaseStartedRef = useRef<boolean>(false);
  const level99JoeBossSpawnedRef = useRef<boolean>(false);
  const level99JoeDefeatedRef = useRef<boolean>(false);
  const [megaMowerAvailable, setMegaMowerAvailable] = useState<boolean>(false);
  const [megaMowerPlanted, setMegaMowerPlanted] = useState<boolean>(false);

  const showAussieJoeIntroRef = useRef(showAussieJoeIntro);
  showAussieJoeIntroRef.current = showAussieJoeIntro;
  const showAussieJoeVictoryRef = useRef(showAussieJoeVictory);
  showAussieJoeVictoryRef.current = showAussieJoeVictory;
  const showLevel99JoeDialogueRef = useRef(showLevel99JoeDialogue);
  showLevel99JoeDialogueRef.current = showLevel99JoeDialogue;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Aussie Joe 150 Leaves Roast Dialogue state
  const [showAussieJoeRoast, setShowAussieJoeRoast] = useState<boolean>(false);
  const showAussieJoeRoastRef = useRef(showAussieJoeRoast);
  showAussieJoeRoastRef.current = showAussieJoeRoast;

  // Bee-R Power-Up & Cooldown (60 seconds)
  const [beeRCooldown, setBeeRCooldown] = useState<number>(0);
  const beeRCooldownRef = useRef<number>(0);
  const [isBeeRFlying, setIsBeeRFlying] = useState<boolean>(false);
  const isBeeRFlyingRef = useRef<boolean>(false);
  isBeeRFlyingRef.current = isBeeRFlying;

  // Leaves currency & Bee-R status
  const [currentLeaves, setCurrentLeaves] = useState<number>(() => (playerStats?.leaves ?? getPlayerStats().leaves));
  const [hasUnlockedBeeR, setHasUnlockedBeeR] = useState<boolean>(() => (playerStats?.hasUnlockedBeeR ?? getPlayerStats().hasUnlockedBeeR));
  const hasUnlockedBeeRRef = useRef<boolean>(hasUnlockedBeeR);
  hasUnlockedBeeRRef.current = hasUnlockedBeeR;
  const playTimeAccRef = useRef<number>(0);

  // Sync with prop updates
  useEffect(() => {
    if (playerStats) {
      setCurrentLeaves(playerStats.leaves);
      setHasUnlockedBeeR(playerStats.hasUnlockedBeeR);
      hasUnlockedBeeRRef.current = playerStats.hasUnlockedBeeR;
    }
  }, [playerStats]);

  // Clean-up play time recording on unmount
  useEffect(() => {
    return () => {
      if (playTimeAccRef.current > 0) {
        recordTimePlayed(playTimeAccRef.current);
      }
    };
  }, []);

  const handleTriggerBeeRRef = useRef<() => void>(() => {});

  // Deploy massive Bee-R screen-clearing power-up
  const handleTriggerBeeR = () => {
    if (!hasUnlockedBeeRRef.current && !hasUnlockedBeeR) return;
    if (beeRCooldownRef.current > 0 || isBeeRFlyingRef.current) return;

    soundFx.playBeerOpen();
    setTimeout(() => soundFx.playBeerBuzz(), 120);

    beeRCooldownRef.current = 60;
    setBeeRCooldown(60);
    setIsBeeRFlying(true);

    // Mid-flight impact wipes every zombie on screen
    setTimeout(() => {
      let killedCount = 0;
      zombiesRef.current.forEach((z) => {
        if (z.hp > 0) {
          killedCount++;
          if (z.type === 'aussie_joe_boss') {
            z.hp -= 3500;
          } else {
            z.hp = 0;
          }
          effectsRef.current.push({
            id: `eff_beer_${Date.now()}_${Math.random()}`,
            x: z.x,
            y: z.row * TILE_HEIGHT + 10,
            type: 'splat',
            text: 'STUNG! 🍺',
            createdTime: gameTimeRef.current,
            duration: 1200,
          });
        }
      });

      if (killedCount > 0) {
        soundFx.playCherryExplode();
        recordZombieKills(killedCount);
        zombiesDefeatedRef.current += killedCount;
        setZombiesDefeated(zombiesDefeatedRef.current);
      }
    }, 650);
  };
  handleTriggerBeeRRef.current = handleTriggerBeeR;

  const effectiveUnlockedPlants = useMemo(() => {
    const list = [...level.unlockedPlants];
    if (unlockedAchievements?.includes('cheated_like_a_baby') && !list.includes('rottenbabytomato')) {
      list.push('rottenbabytomato');
    }
    if (unlockedAchievements?.includes('unlocked_meatcan') && !list.includes('meatcan')) {
      list.push('meatcan');
    }
    if (level.levelNumber === 99) {
      const babyIdx = list.indexOf('rottenbabytomato');
      if (babyIdx !== -1) list.splice(babyIdx, 1);
      const meatIdx = list.indexOf('meatcan');
      if (meatIdx !== -1) list.splice(meatIdx, 1);
    }
    return list;
  }, [level.unlockedPlants, level.levelNumber, unlockedAchievements]);

  const level99IntroLines = useMemo(() => {
    if (isTesterMode) {
      return [
        "TESTER MODE ACTIVATED! 149 out of 150 zombies defeated!",
        "Defeat the 1 final zombie remaining to trigger Phase 2 immediately!",
        "Begin!",
      ];
    }
    if (unlockedAchievements?.includes('cheated_like_a_baby')) {
      return [
        "G'day mate... so you made it to Level 99.",
        "Wait a second... I saw your OP plant you cheated in! It's deleted!",
        "I don't want cheats to face me, just real winners. If you relied on it the whole game then sorry.",
        "That thing you're protecting behind you... that's your save file.",
        "If you lose to me and don't stop what's coming, your save file will be corrupted!",
        "Which means you'll lose ALL your data forever!",
        "Don't worry, I know this is difficult for you to come to terms with, but I just need you to stay here forever.",
        "Win, and not only will you get the final achievement, but a special admin code that will give you a special plant to celebrate your victory.",
        "Begin!",
      ];
    }
    return [
      "G'day mate... so you made it all the way to Level 99.",
      "That thing you're protecting behind you... that's your save file.",
      "If you lose to me and don't stop what's coming, your save file will be corrupted!",
      "Which means you'll lose ALL your data forever!",
      "Don't worry, I know this is difficult for you to come to terms with, but I just need you to stay here forever.",
      "Win, and not only will you get the final achievement, but a special admin code that will give you a special plant to celebrate your victory.",
      "Begin!",
    ];
  }, [unlockedAchievements, isTesterMode]);

  // Seed Picker State when level has more than 6 unlocked plants
  const [selectedSeedTypes, setSelectedSeedTypes] = useState<PlantType[]>(() => {
    return effectiveUnlockedPlants.slice(0, 6);
  });
  const [showSeedPicker, setShowSeedPicker] = useState<boolean>(false);
  const showSeedPickerRef = useRef(showSeedPicker);
  showSeedPickerRef.current = showSeedPicker;

  const [eucalyptusBonusSlot, setEucalyptusBonusSlot] = useState<boolean>(false);

  const activePlantTypes = useMemo(() => {
    if (level.levelNumber === 99) {
      const list = [...effectiveUnlockedPlants];
      if (megaMowerAvailable && !megaMowerPlanted && !list.includes('mega_mower')) {
        list.push('mega_mower');
      }
      return list;
    }
    const base = effectiveUnlockedPlants.length > 6 ? selectedSeedTypes : effectiveUnlockedPlants.slice(0, 6);
    if (eucalyptusBonusSlot && !base.includes('mini_eucalyptus')) {
      return [...base, 'mini_eucalyptus'];
    }
    return base;
  }, [level.levelNumber, effectiveUnlockedPlants, selectedSeedTypes, eucalyptusBonusSlot, megaMowerAvailable, megaMowerPlanted]);

  const unlockedPlantConfigs = activePlantTypes
    .map((type) => allPlants.find((p) => p.type === type))
    .filter((p): p is PlantConfig => p !== undefined);

  // Keybind listener for numbers 1 to 10 ('0' for 10th), 'S' for shovel, and 'B' for Bee-R
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (showSeedPickerRef.current) return;
      let num = parseInt(e.key, 10);
      if (e.key === '0') num = 10;
      if (!isNaN(num) && num >= 1 && num <= unlockedPlantConfigs.length) {
        const targetPlant = unlockedPlantConfigs[num - 1];
        if (targetPlant) {
          const cdRemaining = cooldownsRef.current[targetPlant.type] || 0;
          if (sunRef.current >= targetPlant.cost && cdRemaining <= 0) {
            soundFx.playClick();
            setIsShovelSelected(false);
            setSelectedPlant((prev) => (prev === targetPlant.type ? null : targetPlant.type));
          }
        }
      } else if (e.key.toLowerCase() === 's') {
        soundFx.playClick();
        setSelectedPlant(null);
        setIsShovelSelected((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        soundFx.playClick();
        setIsFastForward((prev) => !prev);
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        soundFx.playClick();
        handleOpenPauseMenu();
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleTriggerBeeRRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [unlockedPlantConfigs]);

  const requestRef = useRef<number | null>(null);
  const lastRealTimeRef = useRef<number>(performance.now());
  const gameTimeRef = useRef<number>(performance.now());
  const lastUiSyncRef = useRef<number>(0);
  const wasCdActiveRef = useRef<boolean>(false);
  const nextSunSpawnTimeRef = useRef<number>(performance.now() + 4000);
  const nextZombieSpawnTimeRef = useRef<number>(performance.now() + 3500);

  const onStateUpdateRef = useRef(onStateUpdate);
  onStateUpdateRef.current = onStateUpdate;
  const onGameOverRef = useRef(onGameOver);
  onGameOverRef.current = onGameOver;
  const onVictoryRef = useRef(onVictory);
  onVictoryRef.current = onVictory;

  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(outbackMusic.isMuted);
  const [musicVolume, setMusicVolume] = useState<number>(outbackMusic.volume);
  const [isMusicActive, setIsMusicActive] = useState<boolean>(false);

  // Outback Music Lifecycle (Daytime for Levels 1-6, Nighttime in the Outback for Pro Levels 7-12)
  useEffect(() => {
    const isNightLevel = level.levelNumber >= 7;
    const trackType: 'day' | 'night' = isNightLevel ? 'night' : 'day';

    outbackMusic.play(trackType);
    setIsMusicActive(true);

    const handleUserInteraction = () => {
      outbackMusic.resumeContextIfNeeded();
      if (!outbackMusic.getIsPlaying()) {
        outbackMusic.play(trackType);
      }
      setIsMusicActive(outbackMusic.getIsPlaying());
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      outbackMusic.stop();
      setIsMusicActive(false);
    };
  }, [level.levelNumber]);

  const handleToggleFastForward = () => {
    soundFx.playClick();
    setIsFastForward((prev) => !prev);
  };

  const handleToggleMusic = () => {
    const muted = outbackMusic.toggleMute();
    setIsMusicMuted(muted);
    if (!muted && !outbackMusic.getIsPlaying()) {
      const isNightLevel = level.levelNumber >= 7;
      outbackMusic.play(isNightLevel ? 'night' : 'day');
      setIsMusicActive(true);
    }
  };

  const handleOpenPauseMenu = () => {
    outbackMusic.pause();
    setIsMusicActive(false);
    if (onStateUpdateRef.current) {
      onStateUpdateRef.current(plantsRef.current, zombiesRef.current, sunRef.current);
    }
    onPause();
  };

  // Main 60 FPS Game Loop
  useEffect(() => {
    lastRealTimeRef.current = performance.now();
    gameTimeRef.current = performance.now();
    gargantuarSpawnedRef.current = false;
    level99JoePhaseStartedRef.current = false;
    level99JoeBossSpawnedRef.current = false;
    level99JoeDefeatedRef.current = false;

    if (level.levelNumber === 99 && isTesterMode) {
      zombiesDefeatedRef.current = 149;
      zombiesSpawnedRef.current = 149;
      zombiesRef.current = [
        {
          id: 'tester_zombie_final',
          type: 'basic',
          row: 2,
          x: 480,
          hp: 40,
          maxHp: 200,
          speed: 12,
          isEating: false,
        },
      ];
      setZombies(zombiesRef.current);
      setZombiesDefeated(149);
    }

    const updateGame = (realTime: number) => {
      if (isPausedRef.current) {
        lastRealTimeRef.current = realTime;
        requestRef.current = requestAnimationFrame(updateGame);
        return;
      }

      if (showSeedPickerRef.current || showAussieJoeIntroRef.current || showAussieJoeVictoryRef.current || showLevel99JoeDialogueRef.current || showAussieJoeRoastRef.current) {
        lastRealTimeRef.current = realTime;
        nextSunSpawnTimeRef.current = gameTimeRef.current + 4000;
        nextZombieSpawnTimeRef.current = gameTimeRef.current + 3500;
        requestRef.current = requestAnimationFrame(updateGame);
        return;
      }

      const realDelta = Math.min((realTime - lastRealTimeRef.current) / 1000, 0.1); // seconds
      lastRealTimeRef.current = realTime;

      const speedMultiplier = isFastForwardRef.current ? 2.0 : 1.0;
      const delta = realDelta * speedMultiplier; // accelerated seconds
      gameTimeRef.current += delta * 1000; // virtual game time in ms
      const time = gameTimeRef.current;

      // Update Bee-R Cooldown (60 seconds)
      if (beeRCooldownRef.current > 0) {
        beeRCooldownRef.current = Math.max(0, beeRCooldownRef.current - delta);
        setBeeRCooldown(Math.ceil(beeRCooldownRef.current));
      }

      // Track gameplay duration
      playTimeAccRef.current += delta;
      if (playTimeAccRef.current >= 5) {
        recordTimePlayed(playTimeAccRef.current);
        playTimeAccRef.current = 0;
      }

      // 1. Update Cooldowns
      let cdUpdated = false;
      for (const k in cooldownsRef.current) {
        const key = k as PlantType;
        if (cooldownsRef.current[key] > 0) {
          cooldownsRef.current[key] = Math.max(0, cooldownsRef.current[key] - delta * 1000);
          cdUpdated = true;
        }
      }

      // 2. Spawn Sun from Sky
      if (time > nextSunSpawnTimeRef.current) {
        nextSunSpawnTimeRef.current = time + level.sunDropInterval * 1000;
        const randomCol = Math.floor(Math.random() * COL_COUNT);
        const randomTargetY = Math.floor(Math.random() * 320) + 60;
        sunsRef.current.push({
          id: `sun_sky_${Date.now()}_${Math.random()}`,
          x: randomCol * TILE_WIDTH + 30,
          y: 0,
          targetY: randomTargetY,
          value: 50,
          spawnTime: time,
        });
      }

      // Level 99 Countdown Timer
      if (level99Countdown !== null && level99Countdown > 0) {
        setLevel99Countdown((prev) => (prev !== null && prev > 0 ? Math.max(0, prev - delta) : 0));
      }

      // Check Level 99 150 Zombies Defeated trigger
      if (
        level.levelNumber === 99 &&
        zombiesDefeatedRef.current >= 150 &&
        !level99JoePhaseStartedRef.current
      ) {
        level99JoePhaseStartedRef.current = true;
        setShowLevel99JoeDialogue(true);
      }

      // 3. Fall Suns to target Y
      sunsRef.current = sunsRef.current.map((s) => {
        if (s.y < s.targetY) {
          return { ...s, y: Math.min(s.targetY, s.y + delta * 80) };
        }
        return s;
      });

      // 4. Spawn Zombies continuously and seamlessly
      const activeZombieCount = zombiesRef.current.length;
      const canSpawnMore =
        zombiesSpawnedRef.current < level.totalZombies ||
        (activeZombieCount === 0 && zombiesDefeatedRef.current < level.totalZombies);

      if (canSpawnMore && time > nextZombieSpawnTimeRef.current) {
        const waveThreshold = Math.max(2, Math.floor(level.totalZombies / level.waveCount));
        const isWaveTrigger =
          zombiesSpawnedRef.current > 0 &&
          zombiesSpawnedRef.current % waveThreshold === 0;

        if (isWaveTrigger && !hugeWaveBanner) {
          setHugeWaveBanner(true);
          soundFx.playHugeWave();
          setTimeout(() => setHugeWaveBanner(false), 3500);
        }

        const currentWaveIndex = Math.floor(zombiesSpawnedRef.current / waveThreshold);
        const isFinalWave = isWaveTrigger && currentWaveIndex >= level.waveCount - 1;

        // Level 6 or Level 12 "Titan" Boss Spawn on Final Wave
        if (
          (level.levelNumber === 6 || level.levelNumber === 12) &&
          (isFinalWave || zombiesSpawnedRef.current >= level.totalZombies - 2) &&
          !gargantuarSpawnedRef.current
        ) {
          gargantuarSpawnedRef.current = true;
          const bossRow = Math.floor(Math.random() * 3) + 1; // Middle lanes: 1, 2, or 3
          const isPro = level.isProMode || level.levelNumber >= 7 || level.background === 'void';
          const bossHp = isPro ? 7200 : 3600;

          zombiesRef.current.push({
            id: `boss_red_sand_garg_${Date.now()}`,
            type: 'red_sand_gargantuar',
            row: bossRow,
            x: 650,
            hp: bossHp,
            maxHp: bossHp,
            speed: 11, // Heavy slow walk
            isEating: false,
            hasThrownImp: false,
          });

          effectsRef.current.push({
            id: `eff_boss_${Date.now()}`,
            x: 220,
            y: bossRow * TILE_HEIGHT + 20,
            type: 'spudow',
            text: isPro ? 'PRO BOSS: VOID SANDSTONE TITAN!' : 'BOSS: RED SAND GARGANTUAR!',
            createdTime: time,
            duration: 3000,
          });
        }

        const remainingToSpawn = Math.max(1, level.totalZombies - zombiesSpawnedRef.current);
        const countToSpawn = isWaveTrigger ? Math.min(3, remainingToSpawn) : 1;

        const usedRows = new Set<number>();
        const spawnableTypes = level.zombieTypes.filter(
          (t) => t !== 'red_sand_gargantuar' && t !== 'red_sand_imp' && t !== 'aussie_joe_boss'
        );

        for (let i = 0; i < countToSpawn; i++) {
          let randomRow = Math.floor(Math.random() * ROW_COUNT);
          if (usedRows.has(randomRow) && usedRows.size < ROW_COUNT) {
            while (usedRows.has(randomRow)) {
              randomRow = Math.floor(Math.random() * ROW_COUNT);
            }
          }
          usedRows.add(randomRow);

          let zType: ZombieType = spawnableTypes[Math.floor(Math.random() * spawnableTypes.length)] || 'basic';
          if (isWaveTrigger && i === 0 && level.zombieTypes.includes('flag')) {
            zType = 'flag';
          }

          let baseHp = 200;
          let speed = 16; // px/sec (reduced speed for regular zombies)
          let hasEucalyptusShield = false;

          if (zType === 'conehead') {
            baseHp = 560;
          } else if (zType === 'buckethead') {
            baseHp = 1300;
          } else if (zType === 'polevaulter') {
            baseHp = 500;
            speed = 32; // px/sec
          } else if (zType === 'flag') {
            baseHp = 300;
            speed = 22; // px/sec
          } else if (zType === 'koala_imp') {
            baseHp = 200;
            speed = 36; // Fast Imp speed
            hasEucalyptusShield = true;
          }

          const isPro = level.isProMode || level.levelNumber >= 7 || level.background === 'void';
          const hp = isPro ? baseHp * 2 : baseHp;

          let spawnX = 620 + i * 30;

          // Drop Bear Ambush: Koala Imps can drop directly into mid-lawn (col 3-6)
          if (zType === 'koala_imp' && (Math.random() < 0.45 || isWaveTrigger)) {
            const dropCol = Math.floor(Math.random() * 4) + 3; // Col 3, 4, 5, or 6
            spawnX = dropCol * TILE_WIDTH + 15;

            // Stun adjacent plants for 1 second
            plantsRef.current = plantsRef.current.map((p) => {
              if (Math.abs(p.col - dropCol) <= 1 && Math.abs(p.row - randomRow) <= 1) {
                return { ...p, stunnedUntil: time + 1000 };
              }
              return p;
            });

            effectsRef.current.push({
              id: `eff_dropbear_${Date.now()}_${Math.random()}`,
              x: spawnX,
              y: randomRow * TILE_HEIGHT + 20,
              type: 'spudow',
              text: 'DROP BEAR AMBUSH!',
              createdTime: time,
              duration: 1200,
            });
          }

          zombiesRef.current.push({
            id: `zombie_${Date.now()}_${i}_${Math.random()}`,
            type: zType,
            row: randomRow,
            x: spawnX,
            hp,
            maxHp: hp,
            speed,
            isEating: false,
            hasEucalyptusShield,
          });
        }

        zombiesSpawnedRef.current += countToSpawn;

        const nextDelay = isWaveTrigger
          ? 6500
          : activeZombieCount === 0
          ? 1800
          : level.levelNumber === 99
          ? 2200
          : Math.max(3200, 6000 - level.levelNumber * 500);
        nextZombieSpawnTimeRef.current = time + nextDelay;
      } else if (
        activeZombieCount === 0 &&
        zombiesDefeatedRef.current < level.totalZombies &&
        time > nextZombieSpawnTimeRef.current + 1500
      ) {
        nextZombieSpawnTimeRef.current = time + 1200;
      }

      // 5. Update Plants Actions (Sun production, Potato Mine arming, Chomper, Shooting)
      const chompedZombieIds = new Set<string>();

      // Pre-compute row-indexed lookup arrays for O(1) row spatial lookups
      const zombiesByRow: Zombie[][] = Array.from({ length: ROW_COUNT }, () => []);
      for (let i = 0; i < zombiesRef.current.length; i++) {
        const z = zombiesRef.current[i];
        if (z.hp > 0) {
          if (z.type === 'aussie_joe_boss') {
            for (let r = 0; r < ROW_COUNT; r++) {
              zombiesByRow[r].push(z);
            }
          } else if (z.row >= 0 && z.row < ROW_COUNT) {
            zombiesByRow[z.row].push(z);
          }
        }
      }

      plantsRef.current = plantsRef.current.map((plant) => {
        // Stun Check (e.g. from Drop Bear Ambush)
        if (plant.stunnedUntil && time < plant.stunnedUntil) {
          return plant;
        }

        // Potato Mine Arming
        if (plant.type === 'potatomine' && plant.state !== 'armed') {
          if (time - plant.createdTime > 12000) {
            return { ...plant, state: 'armed' };
          }
        }

        // Grill Flower Produce Prawns
        if (plant.type === 'grillflower' || plant.type === 'sunflower') {
          if (time - plant.lastActionTime > 7000) {
            sunsRef.current.push({
              id: `sun_flower_${Date.now()}_${Math.random()}`,
              x: plant.col * TILE_WIDTH + 20,
              y: plant.row * TILE_HEIGHT + 20,
              targetY: plant.row * TILE_HEIGHT + 40,
              value: 50,
              spawnTime: time,
              isFromGrillFlower: true,
              isFromSunflower: true,
            });
            return { ...plant, lastActionTime: time };
          }
        }

        // Shooters (Peashooter, Repeater, Snow Pea)
        if (['peashooter', 'repeater', 'snowpea'].includes(plant.type)) {
          if (time - plant.lastActionTime > 1400) {
            const plantX = plant.col * TILE_WIDTH + 30;
            const rowZombies = zombiesByRow[plant.row] || [];
            const hasZombieAhead = rowZombies.some(
              (z) => z.x > plantX - 10 && z.x < 680
            );

            if (hasZombieAhead) {
              soundFx.playPeaShoot();
              const projType = plant.type === 'snowpea' ? 'frozenPea' : 'pea';

              projectilesRef.current.push({
                id: `proj_${Date.now()}_${Math.random()}`,
                type: projType,
                row: plant.row,
                x: plantX + 25,
                damage: 20,
                slowEffect: plant.type === 'snowpea',
              });

              if (plant.type === 'repeater') {
                const repeaterDelay = 180 / (isFastForwardRef.current ? 2 : 1);
                setTimeout(() => {
                  projectilesRef.current.push({
                    id: `proj_repeater_${Date.now()}_${Math.random()}`,
                    type: 'pea',
                    row: plant.row,
                    x: plantX + 40,
                    damage: 20,
                  });
                }, repeaterDelay);
              }

              return { ...plant, lastActionTime: time };
            }
          }
        }

        // Threepeater (Shoots 3 parallel lanes)
        if (plant.type === 'threepeater') {
          if (time - plant.lastActionTime > 1400) {
            const plantX = plant.col * TILE_WIDTH + 30;
            const targetLanes = [plant.row - 1, plant.row, plant.row + 1].filter(
              (r) => r >= 0 && r < ROW_COUNT
            );

            const hasZombieInLanes = targetLanes.some((r) =>
              (zombiesByRow[r] || []).some((z) => z.x > plantX - 10 && z.x < 680)
            );

            if (hasZombieInLanes) {
              soundFx.playPeaShoot();
              targetLanes.forEach((r) => {
                projectilesRef.current.push({
                  id: `proj_three_${r}_${Date.now()}_${Math.random()}`,
                  type: 'pea',
                  row: r,
                  x: plantX + 25,
                  damage: 20,
                });
              });

              return { ...plant, lastActionTime: time };
            }
          }
        }

        // Chomper Swallow Check
        if (plant.type === 'chomper') {
          if (plant.state === 'chewing') {
            if (plant.chewEndTime && time > plant.chewEndTime) {
              return { ...plant, state: undefined, chewEndTime: undefined };
            }
          } else {
            const plantX = plant.col * TILE_WIDTH + 30;
            const rowZombies = zombiesByRow[plant.row] || [];
            const targetZombie = rowZombies.find(
              (z) =>
                z.x >= plantX - 15 &&
                z.x <= plantX + 85 &&
                !chompedZombieIds.has(z.id)
            );

            if (targetZombie) {
              soundFx.playChomperEat();
              if (targetZombie.type === 'red_sand_gargantuar' || targetZombie.type === 'aussie_joe_boss') {
                targetZombie.hp -= 500;
                effectsRef.current.push({
                  id: `eff_chomp_${Date.now()}_${Math.random()}`,
                  x: targetZombie.x,
                  y: targetZombie.row * TILE_HEIGHT + 20,
                  type: 'boom',
                  text: 'BIG BITE! -500',
                  createdTime: time,
                  duration: 800,
                });
              } else {
                chompedZombieIds.add(targetZombie.id);
              }

              return {
                ...plant,
                state: 'chewing',
                chewEndTime: time + 6000, // Accelerated 6s digestive timer
              };
            }
          }
        }

        // Mini Eucalyptus Tree (Shoots in ALL 5 lanes every 4.5s, loses 5 HP per attack)
        if (plant.type === 'mini_eucalyptus') {
          if (time - plant.lastActionTime > 4500) {
            const hasZombieOnLawn = zombiesRef.current.some((z) => z.hp > 0 && z.x > 20 && z.x < 680);
            if (hasZombieOnLawn) {
              soundFx.playPeaShoot();
              const plantX = plant.col * TILE_WIDTH + 30;

              for (let r = 0; r < ROW_COUNT; r++) {
                projectilesRef.current.push({
                  id: `proj_euc_r${r}_${Date.now()}_${Math.random()}`,
                  type: 'eucalyptus_leaf',
                  row: r,
                  x: plantX + 25,
                  damage: 22, // increased damage per leaf
                });
              }

              const nextHp = plant.hp - 5; // loses 5 HP every time it fires (painful blood & bones)
              effectsRef.current.push({
                id: `eff_euc_sd_${Date.now()}_${Math.random()}`,
                x: plant.col * TILE_WIDTH + 15,
                y: plant.row * TILE_HEIGHT + 10,
                type: 'splat',
                text: '-5 HP 🩸',
                createdTime: time,
                duration: 700,
              });

              return {
                ...plant,
                hp: nextHp,
                lastActionTime: time,
              };
            }
          }
        }

        // Meatcan Plant (shoots meat pies down its row)
        if (plant.type === 'meatcan') {
          if (time - plant.lastActionTime > 1100) {
            const rowZombies = zombiesByRow[plant.row] || [];
            const hasTarget = rowZombies.some((z) => z.hp > 0 && z.x > plant.col * TILE_WIDTH);
            if (hasTarget || level.levelNumber === 99) {
              soundFx.playPeaShoot();
              projectilesRef.current.push({
                id: `proj_pie_${plant.row}_${Date.now()}_${Math.random()}`,
                type: 'meat_pie',
                row: plant.row,
                x: plant.col * TILE_WIDTH + 35,
                damage: 120,
              });
              return { ...plant, lastActionTime: time };
            }
          }
        }

        // Mega Lawn Mower Plant (charges up over 120s / 2 minutes, then launches across all 5 rows!)
        if (plant.type === 'mega_mower') {
          const growthTimer = plant.growthTimer !== undefined ? Math.max(0, plant.growthTimer - delta) : 120;
          let isMoving = plant.isMoving || false;
          let plantX = plant.x !== undefined ? plant.x : plant.col * TILE_WIDTH + 25;

          if (growthTimer <= 0 && !isMoving) {
            isMoving = true;
            soundFx.playHugeWave();
            effectsRef.current.push({
              id: `eff_megamower_launch_${Date.now()}`,
              x: 100,
              y: 180,
              type: 'spudow',
              text: 'MEGA LAWN MOWER FULLY CHARGED! LAUNCHING! 🚜💥',
              createdTime: time,
              duration: 3000,
            });
          }

          if (isMoving) {
            plantX += delta * 260; // Drives across lawn!
            zombiesRef.current.forEach((z) => {
              if (z.hp > 0 && z.x <= plantX + 100) {
                z.hp -= 1000000;
              }
            });
          }

          return {
            ...plant,
            growthTimer,
            isMoving,
            x: plantX,
          };
        }

        return plant;
      });

      // Remove chomped zombies
      if (chompedZombieIds.size > 0) {
        zombiesRef.current = zombiesRef.current.filter((z) => !chompedZombieIds.has(z.id));
        zombiesDefeatedRef.current += chompedZombieIds.size;
      }

      // Re-index zombies by row for projectile & zombie movement steps
      const activeZombiesByRow: Zombie[][] = Array.from({ length: ROW_COUNT }, () => []);
      for (let i = 0; i < zombiesRef.current.length; i++) {
        const z = zombiesRef.current[i];
        if (z.hp > 0) {
          if (z.type === 'aussie_joe_boss') {
            for (let r = 0; r < ROW_COUNT; r++) {
              activeZombiesByRow[r].push(z);
            }
          } else if (z.row >= 0 && z.row < ROW_COUNT) {
            activeZombiesByRow[z.row].push(z);
          }
        }
      }

      // 6. Update Projectiles & Check Hits
      const nextProjectiles: Projectile[] = [];

      projectilesRef.current.forEach((p) => {
        const nextX = p.x + delta * 450;
        const rowZombies = activeZombiesByRow[p.row] || [];

        const targetZ = rowZombies.find(
          (z) => z.hp > 0 && z.x >= p.x - 20 && z.x <= nextX + 25
        );

        if (targetZ) {
          soundFx.playPeaHit();
          if (p.type === 'eucalyptus_leaf' && targetZ.type === 'koala_imp') {
            targetZ.hp = 0;
            effectsRef.current.push({
              id: `eff_koala_kill_${Date.now()}_${Math.random()}`,
              x: targetZ.x,
              y: targetZ.row * TILE_HEIGHT + 10,
              type: 'boom',
              text: 'KOALA INSTA-KILL! 🍃',
              createdTime: time,
              duration: 900,
            });
          } else {
            targetZ.hp -= p.damage;
          }

          if (p.slowEffect) {
            if (targetZ.hasEucalyptusShield) {
              targetZ.hasEucalyptusShield = false; // Eucalyptus Shield absorbs first freeze effect
              effectsRef.current.push({
                id: `eff_euc_${Date.now()}_${Math.random()}`,
                x: targetZ.x,
                y: targetZ.row * TILE_HEIGHT + 20,
                type: 'splat',
                text: 'EUCALYPTUS SHIELD!',
                createdTime: time,
                duration: 900,
              });
            } else {
              targetZ.isSlowed = true;
              targetZ.slowTimer = time + 3500;
            }
          }
        } else if (nextX < 680) {
          nextProjectiles.push({ ...p, x: nextX });
        }
      });

      projectilesRef.current = nextProjectiles;

      // 7. Update Zombie Movements & Plant Biting & Potato Mine Explosions & Gargantuar Mechanics
      let isGameOverTriggered = false;
      const deadPlantIds = new Set<string>();
      const newlyThrownImps: Zombie[] = [];

      // Pre-compute row-indexed lookup arrays for plants
      const plantsByRow: PlantedPlant[][] = Array.from({ length: ROW_COUNT }, () => []);
      for (let i = 0; i < plantsRef.current.length; i++) {
        const p = plantsRef.current[i];
        if (p.hp > 0 && p.row >= 0 && p.row < ROW_COUNT) {
          plantsByRow[p.row].push(p);
        }
      }

      zombiesRef.current = zombiesRef.current.map((zombie) => {
        if (zombie.hp <= 0) return zombie;

        let { x, speed, isEating, isSlowed, slowTimer, hasVaulted, isVaulting, vaultProgress, hasThrownImp } = zombie;

        if (isSlowed && slowTimer && time > slowTimer) {
          isSlowed = false;
        }

        const currentSpeed = isSlowed ? speed * 0.5 : speed;

        // Red Sand Gargantuar: Imp throw at 50% HP threshold (1800 HP)
        if (zombie.type === 'red_sand_gargantuar' && zombie.hp <= zombie.maxHp * 0.5 && !hasThrownImp) {
          hasThrownImp = true;
          const impX = Math.max(50, x - 200); // Launches Red Sand Imp 3-4 tiles ahead!

          const isProMode = level.isProMode || level.levelNumber >= 7 || level.background === 'void';
          const impHp = isProMode ? 500 : 250;
          newlyThrownImps.push({
            id: `red_sand_imp_${Date.now()}_${Math.random()}`,
            type: 'red_sand_imp',
            row: zombie.row,
            x: impX,
            hp: impHp,
            maxHp: impHp,
            speed: 38,
            isEating: false,
          });

          effectsRef.current.push({
            id: `eff_imp_throw_${Date.now()}_${Math.random()}`,
            x: impX,
            y: zombie.row * TILE_HEIGHT + 10,
            type: 'spudow',
            text: 'POSTMAN IMP LAUNCHED!',
            createdTime: time,
            duration: 1500,
          });
        }

        // Check plant collision
        let targetPlant: PlantedPlant | undefined;
        if (zombie.type === 'aussie_joe_boss') {
          targetPlant = plantsRef.current.find(
            (p) =>
              p.hp > 0 &&
              !deadPlantIds.has(p.id) &&
              x >= p.col * TILE_WIDTH - 20 &&
              x <= p.col * TILE_WIDTH + 80
          );
        } else {
          const rowPlants = plantsByRow[zombie.row] || [];
          targetPlant = rowPlants.find(
            (p) =>
              p.hp > 0 &&
              !deadPlantIds.has(p.id) &&
              x >= p.col * TILE_WIDTH + 15 &&
              x <= p.col * TILE_WIDTH + 65
          );
        }

        // Pole Vaulter jump over first plant
        if (zombie.type === 'polevaulter' && targetPlant && !hasVaulted && !isVaulting) {
          isVaulting = true;
          vaultProgress = 0;
          soundFx.playClick();
        }

        if (isVaulting) {
          vaultProgress = (vaultProgress || 0) + delta * 2.5;
          if (vaultProgress >= 1) {
            isVaulting = false;
            hasVaulted = true;
            x -= 85;
            speed = 25;
          }
          return {
            ...zombie,
            x,
            speed,
            hasVaulted,
            isVaulting,
            vaultProgress,
            hasThrownImp,
          };
        }

        // Armed Potato Mine Explosion
        if (targetPlant && targetPlant.type === 'potatomine' && targetPlant.state === 'armed') {
          soundFx.playPotatoExplode();
          deadPlantIds.add(targetPlant.id);

          if (zombie.hp - 1800 <= 0 && unlockAchievement) {
            unlockAchievement('spud_boom');
          }

          effectsRef.current.push({
            id: `eff_${Date.now()}_${Math.random()}`,
            x: targetPlant.col * TILE_WIDTH + 20,
            y: targetPlant.row * TILE_HEIGHT + 20,
            type: 'spudow',
            text: 'SPUDOW!',
            createdTime: time,
            duration: 1200,
          });

          return { ...zombie, hp: zombie.hp - 1800, hasThrownImp };
        }

        // Plant Collisions: Gargantuar / Aussie Joe Instant Smash vs Regular Plant Eating
        if (targetPlant && targetPlant.hp > 0) {
          if (zombie.type === 'red_sand_gargantuar' || zombie.type === 'aussie_joe_boss') {
            isEating = true; // Triggers smash pose / stomp in visual renderer
            soundFx.playCherryExplode();

            if (zombie.type === 'aussie_joe_boss') {
              // Aussie Joe stomps all plants in this column across all lanes!
              plantsRef.current.forEach((p) => {
                if (
                  p.hp > 0 &&
                  x >= p.col * TILE_WIDTH - 20 &&
                  x <= p.col * TILE_WIDTH + 80
                ) {
                  deadPlantIds.add(p.id);
                  effectsRef.current.push({
                    id: `eff_smash_${Date.now()}_${Math.random()}`,
                    x: p.col * TILE_WIDTH + 20,
                    y: p.row * TILE_HEIGHT + 20,
                    type: 'boom',
                    text: 'STOMP!',
                    createdTime: time,
                    duration: 600,
                  });
                }
              });
            } else {
              deadPlantIds.add(targetPlant.id);
              effectsRef.current.push({
                id: `eff_smash_${Date.now()}_${Math.random()}`,
                x: targetPlant.col * TILE_WIDTH + 20,
                y: targetPlant.row * TILE_HEIGHT + 20,
                type: 'boom',
                text: 'CRUSH!',
                createdTime: time,
                duration: 600,
              });
            }
          } else {
            isEating = true;
            soundFx.playZombieEat();
            const isProMode = level.isProMode || level.levelNumber >= 7 || level.background === 'void';
            targetPlant.hp -= delta * (isProMode ? 70 : 35); // eat damage doubled in Pro Mode
            if (targetPlant.hp <= 0) {
              deadPlantIds.add(targetPlant.id);
              isEating = false; // resume walking when plant destroyed
            }
          }
        } else {
          isEating = false;
          x -= delta * currentSpeed;
        }

        // Check LawnMower Trigger
        if (x <= 35) {
          const mower = mowersRef.current.find((m) => m.row === zombie.row);
          if (mower && mower.state === 'idle') {
            soundFx.playLawnMower();
            mower.state = 'triggered';
          }
        }

        // Check Game Over
        if (x < -30) {
          const mower = mowersRef.current.find((m) => m.row === zombie.row);
          if (!mower || mower.state === 'gone') {
            isGameOverTriggered = true;
          }
        }

        return {
          ...zombie,
          x,
          isEating,
          isSlowed,
          speed,
          hasVaulted,
          hasThrownImp,
        };
      });

      // Append any newly launched Imps to the active zombies list
      if (newlyThrownImps.length > 0) {
        zombiesRef.current = [...zombiesRef.current, ...newlyThrownImps];
      }

      // Filter dead plants & Award Leaves (1 Leaf per fallen plant)
      if (deadPlantIds.size > 0) {
        deadPlantIds.forEach((deadId) => {
          const deadP = plantsRef.current.find((p) => p.id === deadId);
          if (deadP) {
            effectsRef.current.push({
              id: `leaf_drop_${Date.now()}_${Math.random()}`,
              x: deadP.col * TILE_WIDTH + 20,
              y: deadP.row * TILE_HEIGHT + 10,
              type: 'boom',
              text: '+1 🍃',
              createdTime: time,
              duration: 1200,
            });
          }
          const { stats: updatedStats, justUnlockedBeeR } = recordPlantLost();
          setCurrentLeaves(updatedStats.leaves);
          if (justUnlockedBeeR || (updatedStats.leaves >= 150 && !updatedStats.hasSeenBeeRRoast)) {
            setHasUnlockedBeeR(true);
            setShowAussieJoeRoast(true);
            markBeeRRoastSeen();
          }
          if (onStatsUpdate) {
            onStatsUpdate(updatedStats);
          }
        });
        plantsRef.current = plantsRef.current.filter((p) => p.hp > 0 && !deadPlantIds.has(p.id));
      }

      if (isGameOverTriggered) {
        outbackMusic.stop();
        soundFx.playGameOver();
        setTimeout(() => onGameOverRef.current(), 0);
        return;
      }

      // 8. Update LawnMowers
      mowersRef.current = mowersRef.current.map((m) => {
        if (m.state === 'triggered') {
          const nextX = m.x + delta * 600;

          // Crush zombies in path
          zombiesRef.current.forEach((z) => {
            if (z.row === m.row && z.hp > 0 && z.x <= nextX + 60) {
              if (z.type === 'aussie_joe_boss') {
                z.hp -= 2500;
              } else {
                z.hp = 0;
              }
            }
          });

          if (nextX > 680) {
            return { ...m, state: 'gone' };
          }
          return { ...m, x: nextX };
        }
        return m;
      });

      // 9. Clean dead zombies and update defeat counter
      const survivingZombies: Zombie[] = [];
      let killedThisFrame = 0;

      zombiesRef.current.forEach((z) => {
        if (z.hp <= 0) {
          killedThisFrame++;
          if (z.type === 'aussie_joe_boss') {
            level99JoeDefeatedRef.current = true;
          }
          if (unlockAchievement) {
            if (z.type === 'polevaulter') unlockAchievement('vault_interceptor');
            if (z.type === 'koala_imp' || z.type === 'red_sand_imp') unlockAchievement('koala_tamer');
            if (z.type === 'buckethead') {
              bucketheadKillsRef.current += 1;
              if (bucketheadKillsRef.current >= 5) unlockAchievement('bucket_crusher');
            }
          }
        } else {
          survivingZombies.push(z);
        }
      });

      if (killedThisFrame > 0) {
        zombiesRef.current = survivingZombies;
        zombiesDefeatedRef.current += killedThisFrame;
        recordZombieKills(killedThisFrame);
      }

      // 10. Clean expired effects
      effectsRef.current = effectsRef.current.filter((e) => time - e.createdTime < e.duration);

      // 11. Sync state to React UI (Throttled to ~30ms to prevent React re-render lag)
      if (time - lastUiSyncRef.current >= 30) {
        lastUiSyncRef.current = time;
        setPlants([...plantsRef.current]);
        setZombies([...zombiesRef.current]);
        setProjectiles([...projectilesRef.current]);
        setSuns([...sunsRef.current]);
        setMowers([...mowersRef.current]);
        setEffects([...effectsRef.current]);
        if (cdUpdated || wasCdActiveRef.current) {
          setCooldowns({ ...cooldownsRef.current });
          wasCdActiveRef.current = cdUpdated;
        }
        setSun(sunRef.current);
        setZombiesDefeated(zombiesDefeatedRef.current);
      }

      // 12. Check Victory Condition directly inside game loop
      const allSpawned = zombiesSpawnedRef.current >= level.totalZombies;
      const noActiveZombies = zombiesRef.current.length === 0;
      const targetDefeated = zombiesDefeatedRef.current >= level.totalZombies;

      if (level.levelNumber === 99) {
        if (
          level99JoeDefeatedRef.current &&
          !victoryTriggeredRef.current
        ) {
          victoryTriggeredRef.current = true;
          setVictoryTriggered(true);
          outbackMusic.stop();
          soundFx.playVictory();
          setShowAussieJoeVictory(true);
        }
      } else {
        if (
          (targetDefeated || allSpawned) &&
          noActiveZombies &&
          !victoryTriggeredRef.current
        ) {
          victoryTriggeredRef.current = true;
          setVictoryTriggered(true);
          outbackMusic.stop();
          soundFx.playVictory();

          if (level.levelNumber === 1 && unlockAchievement) {
            unlockAchievement('first_lawn');
          }
          if (level.levelNumber === 12 && unlockAchievement) {
            unlockAchievement('pro_void_master');
          }

          if (level.levelNumber === 6) {
            setShowAussieJoeVictory(true);
          } else {
            setShowVictoryOverlay(true);
          }
        }
      }

      requestRef.current = requestAnimationFrame(updateGame);
    };

    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [level.levelNumber, unlockAchievement]);

  // Fallback Check Level Victory
  useEffect(() => {
    const allSpawned = zombiesSpawnedRef.current >= level.totalZombies;
    const noActiveZombies = zombies.length === 0;
    const targetDefeated = zombiesDefeated >= level.totalZombies;

    if (level.levelNumber === 99) {
      if (
        level99JoeDefeatedRef.current &&
        !victoryTriggered
      ) {
        setVictoryTriggered(true);
        victoryTriggeredRef.current = true;
        outbackMusic.stop();
        soundFx.playVictory();
        setShowAussieJoeVictory(true);
      }
    } else {
      if (
        (targetDefeated || allSpawned) &&
        noActiveZombies &&
        !victoryTriggered
      ) {
        setVictoryTriggered(true);
        victoryTriggeredRef.current = true;
        outbackMusic.stop();
        soundFx.playVictory();

        if (level.levelNumber === 1 && unlockAchievement) {
          unlockAchievement('first_lawn');
        }
        if (level.levelNumber === 12 && unlockAchievement) {
          unlockAchievement('pro_void_master');
        }

        if (level.levelNumber === 6) {
          setShowAussieJoeVictory(true);
        } else {
          setShowVictoryOverlay(true);
        }
      }
    }
  }, [zombiesDefeated, level.totalZombies, zombies, level.levelNumber, victoryTriggered, unlockAchievement]);

  // Handle Plant / Shovel Tile Click
  const handleTileClick = (row: number, col: number) => {
    const existingPlant = plantsRef.current.find((p) => p.row === row && p.col === col);

    // Shovel Dig up
    if (isShovelSelected) {
      if (existingPlant) {
        soundFx.playPlantSeed();
        plantsRef.current = plantsRef.current.filter((p) => p.id !== existingPlant.id);
        setPlants([...plantsRef.current]);
      }
      setIsShovelSelected(false);
      return;
    }

    // Place Plant
    if (selectedPlant && !existingPlant) {
      if (selectedPlant === 'mini_eucalyptus' && plantsRef.current.some((p) => p.type === 'mini_eucalyptus' && p.hp > 0)) {
        effectsRef.current.push({
          id: `eff_euc_limit_${Date.now()}`,
          x: col * TILE_WIDTH + 10,
          y: row * TILE_HEIGHT + 10,
          type: 'splat',
          text: 'ONLY 1 ALLOWED! 🌳',
          createdTime: gameTimeRef.current,
          duration: 1000,
        });
        setSelectedPlant(null);
        return;
      }

      const config = allPlants.find((p) => p.type === selectedPlant);
      if (config && sunRef.current >= config.cost && (cooldownsRef.current[selectedPlant] || 0) <= 0) {
        soundFx.playPlantSeed();
        recordPlantPlanted();

        sunRef.current -= config.cost;
        cooldownsRef.current[selectedPlant] = config.cooldown * 1000;
        setSun(sunRef.current);
        setCooldowns({ ...cooldownsRef.current });
        wasCdActiveRef.current = true;

        if (selectedPlant === 'grillflower' && unlockAchievement) {
          const grillCount = plantsRef.current.filter((p) => p.type === 'grillflower').length + 1;
          if (grillCount >= 5) {
            unlockAchievement('barbie_master');
          }
        }

        if (selectedPlant === 'cherrybomb') {
          soundFx.playCherryExplode();

          let newlyDefeated = 0;
          zombiesRef.current.forEach((z) => {
            const zCol = Math.floor(z.x / TILE_WIDTH);
            if (Math.abs(z.row - row) <= 1 && Math.abs(zCol - col) <= 1) {
              z.hp -= 1800;
              if (z.hp <= 0) newlyDefeated++;
            }
          });

          effectsRef.current.push({
            id: `boom_${Date.now()}_${Math.random()}`,
            x: col * TILE_WIDTH + 10,
            y: row * TILE_HEIGHT + 10,
            type: 'boom',
            text: 'BOOM!',
            createdTime: gameTimeRef.current,
            duration: 1200,
          });

          setSelectedPlant(null);
          return;
        }

        if (selectedPlant === 'rottenbabytomato') {
          soundFx.playBabyCry();

          zombiesRef.current.forEach((z) => {
            const zCol = Math.floor((z.x + 35) / TILE_WIDTH);
            if (z.row === row || zCol === col) {
              if (z.type === 'aussie_joe_boss' || z.type === 'red_sand_gargantuar') {
                z.hp -= 1800;
              } else {
                z.hp = 0;
              }
            }
          });

          const now = gameTimeRef.current;
          for (let r = 0; r < ROW_COUNT; r++) {
            effectsRef.current.push({
              id: `eff_tomat_r_${r}_${Date.now()}_${Math.random()}`,
              x: col * TILE_WIDTH + 10,
              y: r * TILE_HEIGHT + 10,
              type: 'boom',
              createdTime: now,
              duration: 650,
            });
          }
          for (let c = 0; c < 9; c++) {
            if (c !== col) {
              effectsRef.current.push({
                id: `eff_tomat_c_${c}_${Date.now()}_${Math.random()}`,
                x: c * TILE_WIDTH + 10,
                y: row * TILE_HEIGHT + 10,
                type: 'boom',
                createdTime: now,
                duration: 650,
              });
            }
          }

          setSelectedPlant(null);
          return;
        }

        if (selectedPlant === 'mega_mower') {
          if (col !== -1) {
            effectsRef.current.push({
              id: `eff_mower_warn_${Date.now()}`,
              x: col >= 0 ? col * TILE_WIDTH + 10 : -40,
              y: row * TILE_HEIGHT + 10,
              type: 'splat',
              text: 'MUST BE PLANTED IN SPECIAL BACK COLUMN BEHIND ALL DEFENSES!',
              createdTime: gameTimeRef.current,
              duration: 1800,
            });
            return;
          }
          const newMowerPlant: PlantedPlant = {
            id: `plant_${Date.now()}_${Math.random()}`,
            type: 'mega_mower',
            row: row,
            col: -1,
            hp: 999999,
            maxHp: 999999,
            lastActionTime: gameTimeRef.current,
            createdTime: gameTimeRef.current,
            growthTimer: 120, // 120 seconds
            isMoving: false,
            x: -78,
          };
          plantsRef.current.push(newMowerPlant);
          setPlants([...plantsRef.current]);
          setMegaMowerPlanted(true);
          setSelectedPlant(null);
          return;
        }

        if (col === -1) {
          effectsRef.current.push({
            id: `eff_mower_warn_${Date.now()}`,
            x: -40,
            y: row * TILE_HEIGHT + 10,
            type: 'splat',
            text: 'ONLY MEGA LAWN MOWER CAN BE PLANTED HERE!',
            createdTime: gameTimeRef.current,
            duration: 1800,
          });
          return;
        }

        const newPlant: PlantedPlant = {
          id: `plant_${Date.now()}_${Math.random()}`,
          type: selectedPlant,
          row,
          col,
          hp: config.maxHp,
          maxHp: config.maxHp,
          lastActionTime: gameTimeRef.current,
          createdTime: gameTimeRef.current,
          state: selectedPlant === 'potatomine' ? 'sprouting' : undefined,
        };

        plantsRef.current.push(newPlant);
        setPlants([...plantsRef.current]);
        setSelectedPlant(null);
      }
    }
  };

  // Collect Sun / Prawns
  const handleCollectSun = (id: string, value: number) => {
    soundFx.playSunCollect();
    sunRef.current += value;
    recordSunCollected(value);
    totalPrawnsCollectedRef.current += value;
    if (totalPrawnsCollectedRef.current >= 1000 && unlockAchievement) {
      unlockAchievement('prawn_collector');
    }
    sunsRef.current = sunsRef.current.filter((s) => s.id !== id);
    setSun(sunRef.current);
    setSuns([...sunsRef.current]);
  };

  return (
    <div className="relative w-full h-full min-h-[600px] bg-slate-900 overflow-hidden flex flex-col select-none">
      {/* Progress Bar Header */}
      <div className="w-full bg-stone-900/90 border-b-2 border-stone-700 py-1.5 px-4 flex items-center justify-between text-xs font-serif text-stone-300 z-10 shrink-0 gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-amber-300 text-sm flex items-center shrink-0">
            {level.name}
          </span>

          {/* Music Track Badge & Control */}
          <div
            onClick={handleToggleMusic}
            title={`Music: ${outbackMusic.trackName} (Click to ${isMusicMuted ? 'unmute' : 'mute'})`}
            className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-sans font-semibold cursor-pointer transition select-none ${
              isMusicMuted
                ? 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
                : level.levelNumber >= 7
                ? 'bg-indigo-950/80 border-indigo-500/50 text-cyan-300 shadow-[0_0_12px_rgba(99,102,241,0.25)] hover:border-cyan-400'
                : 'bg-amber-950/70 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-400'
            }`}
          >
            {/* Sun or Moon Icon */}
            {isMusicMuted ? (
              <span className="flex items-center gap-1 text-slate-300">
                <span className="text-sm">🔇</span>
                <span className="text-[10px] text-stone-400 font-mono tracking-wider font-bold">(Muted)</span>
              </span>
            ) : level.levelNumber >= 7 ? (
              <span className="flex items-center text-cyan-300 animate-pulse">
                <span className="text-sm">🌙</span>
              </span>
            ) : (
              <span className="flex items-center text-amber-400 animate-pulse">
                <span className="text-sm">☀️</span>
              </span>
            )}

            {/* Song Title */}
            <span className="truncate max-w-[210px] tracking-tight">
              {level.levelNumber >= 7
                ? 'Night Time in the Outback'
                : 'Daytime in the Outback'}
            </span>

            {/* Visualizer Equalizer Waves when active */}
            {!isMusicMuted && isMusicActive && (
              <span className="flex items-end gap-0.5 h-3 shrink-0">
                <span className={`w-0.5 h-full rounded-full animate-pulse ${level.levelNumber >= 7 ? 'bg-cyan-400' : 'bg-lime-400'}`} />
                <span className={`w-0.5 h-2 rounded-full animate-ping ${level.levelNumber >= 7 ? 'bg-indigo-400' : 'bg-amber-400'}`} />
                <span className={`w-0.5 h-3 rounded-full animate-bounce ${level.levelNumber >= 7 ? 'bg-teal-300' : 'bg-lime-400'}`} />
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 w-1/3 min-w-[200px]">
          <span className="font-mono text-xs font-bold text-stone-400">PROGRESS</span>
          <div className="flex-1 bg-stone-800 border border-stone-600 h-4 rounded-full overflow-hidden p-0.5 shadow-inner flex items-center">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                level.levelNumber === 99 && level99JoePhaseStartedRef.current
                  ? 'bg-gradient-to-r from-red-600 to-amber-400 animate-pulse'
                  : 'bg-gradient-to-r from-green-600 to-lime-400'
              }`}
              style={{
                width: `${
                  level.levelNumber === 99 && level99JoePhaseStartedRef.current
                    ? 100
                    : Math.min(100, (zombiesDefeated / level.totalZombies) * 100)
                }%`,
              }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-lime-400">
            {level.levelNumber === 99 && level99JoePhaseStartedRef.current
              ? 'BOSS STAGE (STAGE 2)'
              : `${zombiesDefeated}/${level.totalZombies}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Leaves Currency Badge */}
          <div
            className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/60 px-2.5 py-1 rounded-lg text-emerald-200 text-xs font-mono font-bold shadow select-none"
            title="Leaves Currency: Gained when plants fall in combat. 150 Leaves summons Aussie Joe with the Bee-R!"
          >
            <span>🍃</span>
            <span>{currentLeaves}</span>
          </div>

          {/* Fast Forward 2x Speed Toggle */}
          <button
            type="button"
            id="fast-forward-toggle-btn"
            onClick={handleToggleFastForward}
            title={isFastForward ? 'Fast Forward Active (2x Speed) - Click or press F to set 1x Normal Speed' : 'Normal Speed (1x) - Click or press F to enable 2x Fast Forward'}
            className={`px-3 py-1.5 rounded-lg border font-mono font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              isFastForward
                ? 'bg-gradient-to-b from-amber-500 to-amber-700 border-yellow-300 text-yellow-100 shadow-[0_0_14px_rgba(245,158,11,0.5)] ring-2 ring-amber-400/40'
                : 'bg-gradient-to-b from-stone-800 to-stone-900 hover:from-stone-700 hover:to-stone-800 border-stone-600 text-stone-300 hover:text-white'
            }`}
          >
            <span className="text-sm font-sans">{isFastForward ? '⏩' : '▶️'}</span>
            <span>{isFastForward ? '2x FAST' : '1x SPEED'}</span>
          </button>

          {/* Audio Quick Mute Button on mobile/small screens */}
          <button
            type="button"
            onClick={handleToggleMusic}
            title={isMusicMuted ? 'Unmute Music' : 'Mute Music'}
            className="md:hidden bg-stone-800 hover:bg-stone-700 border border-stone-600 rounded-lg px-2.5 py-1 text-xs text-amber-300 font-bold flex items-center gap-1.5"
          >
            {isMusicMuted ? (
              <>
                <span className="text-xs">🌙</span>
                <span className="text-[10px] text-stone-400 font-mono">Muted</span>
              </>
            ) : (
              <span className="text-xs">☀️</span>
            )}
          </button>

          {/* Menu Pause Button */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              handleOpenPauseMenu();
            }}
            className="bg-gradient-to-b from-stone-700 to-stone-900 hover:from-stone-600 hover:to-stone-800 border border-stone-500 rounded-lg px-5 py-1.5 font-extrabold text-lime-400 text-xs tracking-wider uppercase shadow-md active:scale-95 transition cursor-pointer flex items-center justify-center"
          >
            MENU
          </button>
        </div>
      </div>

      {/* Main Lawn Playfield Arena */}
      <div className="relative flex-1 w-full bg-stone-950 overflow-auto flex items-center justify-center p-2 sm:p-3 select-none">
        
        {/* Full Board Container with Original Porch + 5-Lane Lawn Background */}
        <div className={`relative w-[1000px] h-[550px] my-auto border-4 border-amber-950 rounded-xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.85)] bg-slate-900 shrink-0 ${isFastForward ? 'game-fast-forward' : ''}`}>
          
          {/* Aussie Outback Homestead & Cracked Red Dirt Tile Grid Background */}
          <img
            src={BATTLEFIELD_BG_IMAGE}
            alt="Aussie Battlefield Background"
            className={`absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 transition-all duration-700 ${
              level.levelNumber === 99
                ? 'filter hue-rotate-180 contrast-150 brightness-75 invert-[0.15]'
                : level.background === 'void' || level.isProMode || level.levelNumber >= 7
                ? 'filter hue-rotate-250 brightness-75 contrast-125 saturate-200'
                : ''
            }`}
          />

          {/* Level 99 Matrix Glitch Overlay */}
          {level.levelNumber === 99 && (
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-50">
              <div className="absolute top-2 left-6 text-emerald-400 font-mono text-[10px] font-black tracking-widest animate-pulse">
                01001000 01000101 01001100 01010000 01011111 01010011 01000001 01010110 01000101
              </div>
              <div className="absolute bottom-2 right-6 text-red-500 font-mono text-[10px] font-black tracking-widest animate-pulse">
                10101010 CORRUPTING_SAVE_FILE_01010101
              </div>
              <div className="absolute top-24 left-1/2 text-cyan-400/80 font-mono text-[11px] font-bold rotate-[-12deg]">
                if (AussieJoe.hp &lt;= 0) saveFile.restore();
              </div>
            </div>
          )}

          {/* Level 99 House Replacement: Floppy Disc Save File on Porch */}
          {level.levelNumber === 99 && (
            <div className="absolute left-[260px] top-[230px] z-30 pointer-events-none flex flex-col items-center animate-pulse">
              <FloppyDiscSprite />
              <span className="bg-red-950 border border-red-500 text-red-200 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold mt-1 shadow-lg">
                SAVE FILE
              </span>
            </div>
          )}

          {/* Top-Left Prawn Currency Counter Overlay (Positioned over background's sun slot) */}
          <div
            className="absolute left-[102px] top-[16px] w-[138px] h-[52px] z-30 bg-[#fef3c7] border-2 border-[#8b5e34] rounded-lg shadow-lg flex items-center justify-between px-2 py-1 select-none pointer-events-auto"
            title="Prawns available to plant"
          >
            <div className="flex items-center gap-1">
              <PrawnIcon className="w-8 h-8 animate-bounce-gentle shrink-0" />
              <span className="text-[10px] font-black text-[#5c3110] font-mono tracking-widest uppercase">
                PRAWNS
              </span>
            </div>
            <span className="text-xl font-black text-[#3b1903] font-mono tracking-wider">
              {sun}
            </span>
          </div>

          {/* Top-Left Shovel Tool Overlay (Positioned over background's shovel frame) */}
          <button
            type="button"
            onClick={() => {
              soundFx.playClick();
              setSelectedPlant(null);
              setIsShovelSelected(!isShovelSelected);
            }}
            className={`absolute left-[250px] top-[16px] w-[52px] h-[52px] z-30 bg-[#2d180a]/90 border-2 ${
              isShovelSelected
                ? 'border-yellow-400 ring-4 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.9)] scale-105'
                : 'border-[#784d26] hover:border-amber-400'
            } rounded-lg flex items-center justify-center shadow-lg transition-all active:scale-95 group cursor-pointer pointer-events-auto`}
            title="Shovel Tool [Hotkey: S] - Click to select and dig up plants"
          >
            <svg viewBox="0 0 100 100" className="w-9 h-9 drop-shadow group-hover:scale-110 transition-transform">
              <path d="M 60 10 L 85 35 L 45 75 L 35 65 Z" fill="#94a3b8" stroke="#475569" strokeWidth="3" />
              <path d="M 38 68 L 15 90 L 10 85 L 33 63 Z" fill="#78350f" stroke="#451a03" strokeWidth="3" />
            </svg>
            <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-bold text-amber-300/90">
              S
            </span>
          </button>

          {/* Bottom-Left Seed Packets Tray Overlay */}
          <div
            className={`absolute left-[62px] top-[482px] h-[58px] z-30 flex items-center gap-[3px] px-[4px] py-[2px] select-none pointer-events-auto bg-[#2d180a]/90 border-2 border-[#784d26] rounded-lg shadow-2xl transition-all ${
              unlockedPlantConfigs.length > 6 ? 'w-[450px]' : 'w-[272px]'
            }`}
            title={`Seed Packets Tray (Hotkeys 1-${unlockedPlantConfigs.length})`}
          >
            {unlockedPlantConfigs.map((plant, idx) => {
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
                  compact={true}
                  onSelect={(type) => {
                    setIsShovelSelected(false);
                    setSelectedPlant(selectedPlant === type ? null : type);
                  }}
                />
              );
            })}
          </div>

          {/* 5x9 Lawn Interactive Grid Overlay (Aligned strictly over the 5 cracked outback earth lanes) */}
          <div className="absolute left-[350px] top-[118px] w-[625px] h-[380px] grid grid-cols-9 grid-rows-5 z-20">
            {Array.from({ length: ROW_COUNT * COL_COUNT }).map((_, idx) => {
              const r = Math.floor(idx / COL_COUNT);
              const c = idx % COL_COUNT;
              const isHovered = hoverTile?.row === r && hoverTile?.col === c;
              const plantAtTile = plants.find((p) => p.row === r && p.col === c);
              const isEucLimitReached = selectedPlant === 'mini_eucalyptus' && plants.some((p) => p.type === 'mini_eucalyptus' && p.hp > 0);
              const canPlantHere = selectedPlant && !plantAtTile && !isEucLimitReached;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoverTile({ row: r, col: c })}
                  onMouseLeave={() => setHoverTile(null)}
                  onClick={() => handleTileClick(r, c)}
                  className={`relative transition-all cursor-pointer flex items-center justify-center ${
                    selectedPlant
                      ? canPlantHere
                        ? isHovered
                          ? 'bg-lime-400/50 border-2 border-black shadow-[0_0_10px_rgba(0,0,0,0.8)] scale-[1.02] z-10 rounded-sm'
                          : 'bg-lime-400/20 border border-black/60 hover:bg-lime-400/40'
                        : isHovered
                        ? 'bg-black/40 border-2 border-black/80 z-10'
                        : 'bg-black/25 border border-black/40 opacity-70'
                      : isShovelSelected
                      ? isHovered && plantAtTile
                        ? 'bg-red-500/50 border-2 border-black shadow-[0_0_10px_rgba(0,0,0,0.8)] scale-[1.02] z-10 rounded-sm'
                        : 'border border-black/50 hover:bg-red-500/20'
                      : isHovered
                      ? 'border border-white/30 bg-white/10 rounded-sm'
                      : 'border border-lime-300/10'
                  }`}
                >
                  {/* Plant Ghost Preview centered inside exact hovered tile */}
                  {isHovered && canPlantHere && (
                    <div className="opacity-70 scale-90 pointer-events-none flex items-center justify-center w-full h-full">
                      <PlantSprite type={selectedPlant} hp={100} maxHp={100} isAnimated={false} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SPECIAL BACK COLUMN (-1) FOR MEGA LAWN MOWER (Only in Level 99 Phase 2 when plant is available) */}
          {level.levelNumber === 99 && megaMowerAvailable && (
            <div className="absolute left-[272px] top-[118px] w-[72px] h-[380px] grid grid-rows-5 gap-y-1 z-25 pointer-events-auto select-none">
              {Array.from({ length: 5 }).map((_, r) => {
                const isHovered = hoverTile?.row === r && hoverTile?.col === -1;
                const plantAtTile = plants.find((p) => p.row === r && p.col === -1);
                const canPlantHere = selectedPlant === 'mega_mower' && !plantAtTile;

                return (
                  <div
                    key={`special_col_${r}`}
                    onMouseEnter={() => setHoverTile({ row: r, col: -1 })}
                    onMouseLeave={() => setHoverTile(null)}
                    onClick={() => handleTileClick(r, -1)}
                    className={`relative transition-all cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 ${
                      selectedPlant === 'mega_mower'
                        ? canPlantHere
                          ? isHovered
                            ? 'bg-amber-400/80 border-amber-200 ring-4 ring-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.9)] scale-[1.05] z-30'
                            : 'bg-amber-500/40 border-amber-400 animate-pulse hover:bg-amber-400/60'
                          : 'bg-stone-900/60 border-stone-700 opacity-50'
                        : isShovelSelected && plantAtTile
                        ? isHovered
                          ? 'bg-red-500/50 border-red-300'
                          : 'border-red-500/50 bg-red-950/40'
                        : isHovered
                        ? 'border-amber-400 bg-amber-400/20'
                        : 'border-amber-500/50 bg-stone-950/80 shadow-md'
                    }`}
                    title="Special Back Column: Mega Lawn Mower Slot"
                  >
                    {!plantAtTile && (
                      <span className="text-[8px] font-mono font-black text-amber-300 text-center uppercase px-0.5 pointer-events-none drop-shadow leading-tight">
                        MEGA MOWER SLOT
                      </span>
                    )}
                    {isHovered && canPlantHere && (
                      <div className="opacity-80 scale-90 pointer-events-none flex items-center justify-center w-full h-full">
                        <PlantSprite type="mega_mower" hp={999999} maxHp={999999} isAnimated={false} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Entities Layer (Plants, Zombies, LawnMowers, Peas, Prawns) */}
          <div className="absolute left-[350px] top-[118px] w-[625px] h-[380px] pointer-events-none z-30">
            
            {/* LawnMowers: Positioned on the porch edge */}
            {mowers.map((mower) => {
              const row = Math.min(4, Math.max(0, mower.row));
              return (
                <div
                  key={mower.row}
                  className="absolute top-0 left-0 pointer-events-none z-30 flex items-center justify-center will-change-transform"
                  style={{
                    transform: `translate3d(${mower.x - 45}px, ${row * TILE_HEIGHT}px, 0)`,
                    width: `80px`,
                    height: `${TILE_HEIGHT}px`,
                  }}
                >
                  {mower.state !== 'gone' && (
                    <LawnMowerSprite isTriggered={mower.state === 'triggered'} />
                  )}
                </div>
              );
            })}

            {/* Plants - centered 100% dead-center in their single tile box! */}
            {plants.map((plant) => {
              const row = Math.min(4, Math.max(0, plant.row));
              const plantLeft = plant.x !== undefined
                ? plant.x
                : plant.col === -1
                ? -78
                : Math.min(8, Math.max(0, plant.col)) * TILE_WIDTH;
              return (
                <div
                  key={plant.id}
                  className="absolute top-0 left-0 pointer-events-none flex items-center justify-center z-30"
                  style={{
                    transform: `translate3d(${plantLeft}px, ${row * TILE_HEIGHT}px, 0)`,
                    width: `${TILE_WIDTH}px`,
                    height: `${TILE_HEIGHT}px`,
                  }}
                >
                  {plant.type === 'mega_mower' && plant.growthTimer !== undefined && plant.growthTimer > 0 && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-950/90 border border-emerald-400 rounded px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300 z-50 whitespace-nowrap shadow-lg animate-pulse">
                      CHARGING: {Math.ceil(plant.growthTimer)}s ⚡
                    </div>
                  )}
                  <PlantSprite
                    type={plant.type}
                    state={plant.state}
                    hp={plant.hp}
                    maxHp={plant.maxHp}
                    chewEndTime={plant.chewEndTime}
                    currentTime={gameTimeRef.current}
                  />
                </div>
              );
            })}

            {/* Zombies strictly walking along the 5 green grass lanes! */}
            {zombies.map((zombie) => {
              const clampedRow = Math.min(4, Math.max(0, zombie.row));
              const isJoeBoss = zombie.type === 'aussie_joe_boss';
              return (
                <div
                  key={zombie.id}
                  className="absolute top-0 left-0 pointer-events-none z-40 flex flex-col items-center justify-end will-change-transform"
                  style={
                    isJoeBoss
                      ? {
                          transform: `translate3d(${zombie.x - 120}px, 0px, 0)`,
                          width: `280px`,
                          height: `380px`, // Spans all 5 rows (5 * 76px = 380px)
                        }
                      : {
                          transform: `translate3d(${zombie.x}px, ${clampedRow * TILE_HEIGHT - 20}px, 0)`,
                          width: `${TILE_WIDTH}px`,
                          height: `${TILE_HEIGHT + 20}px`,
                        }
                  }
                >
                  <ZombieSprite
                    type={zombie.type}
                    hp={zombie.hp}
                    maxHp={zombie.maxHp}
                    isEating={zombie.isEating}
                    isSlowed={zombie.isSlowed}
                    isVaulting={zombie.isVaulting}
                    hasEucalyptusShield={zombie.hasEucalyptusShield}
                    isVoid={level.background === 'void' || level.isProMode || level.levelNumber >= 7}
                    isJoeFace={level.levelNumber === 99}
                  />
                </div>
              );
            })}

            {/* Projectiles (Peas) */}
            {projectiles.map((proj) => {
              const row = Math.min(4, Math.max(0, proj.row));
              return (
                <div
                  key={proj.id}
                  className="absolute top-0 left-0 pointer-events-none z-35 flex items-center justify-center will-change-transform"
                  style={{
                    transform: `translate3d(${proj.x}px, ${row * TILE_HEIGHT}px, 0)`,
                    width: `30px`,
                    height: `${TILE_HEIGHT}px`,
                  }}
                >
                  <ProjectileSprite type={proj.type} />
                </div>
              );
            })}

            {/* Sun Drops */}
            {suns.map((sunItem) => (
              <div
                key={sunItem.id}
                className="absolute top-0 left-0 z-50 pointer-events-auto will-change-transform"
                style={{
                  transform: `translate3d(${sunItem.x}px, ${sunItem.y}px, 0) translate(-50%, -50%)`,
                }}
              >
                <SunSprite onClick={() => handleCollectSun(sunItem.id, sunItem.value)} />
              </div>
            ))}

            {/* Visual Explosions & Effects (Potato Mine Spudow / Cherry Bomb / Rotten Baby Tomato - Zero Red Text Popups) */}
            {effects.map((eff) => (
              <ExplosionEffect key={eff.id} effect={eff} />
            ))}

            {/* HUGE WAVE BANNER */}
            {hugeWaveBanner && (
              <div className="absolute inset-x-0 top-1/3 z-50 flex justify-center items-center pointer-events-none">
                <div className="bg-black/85 border-y-8 border-red-600 w-full py-4 flex items-center justify-center shadow-2xl animate-pulse">
                  <h1 className="text-3xl md:text-5xl font-black text-red-600 tracking-wider uppercase font-serif drop-shadow-[0_4px_4px_rgba(0,0,0,1)] text-center px-4">
                    A HUGE WAVE OF ZOMBIES IS APPROACHING!
                  </h1>
                </div>
              </div>
            )}

            {/* SEED SELECTION MENU POPUP (6 Plants Max) */}
            {showSeedPicker && (
              <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 font-serif select-none pointer-events-auto">
                <div className="bg-gradient-to-b from-amber-950 via-stone-900 to-stone-950 border-4 border-amber-600 rounded-3xl p-6 max-w-2xl w-full shadow-2xl flex flex-col items-center gap-4 text-center border-b-8">
                  {/* Title */}
                  <div className="bg-black/70 px-6 py-2 rounded-2xl border border-amber-500/60 shadow-lg">
                    <h2 className="text-2xl font-black text-amber-300 tracking-wider uppercase">
                      CHOOSE YOUR SEEDS
                    </h2>
                    <p className="text-xs text-amber-200/90 font-mono mt-0.5">
                      Select up to 6 plants for {level.name} ({selectedSeedTypes.length}/6 selected)
                    </p>
                  </div>

                  {/* Grid of Available Plants */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 w-full my-1 max-h-[340px] overflow-y-auto p-2">
                    {effectiveUnlockedPlants.map((plantType) => {
                      const plantConfig = allPlants.find((p) => p.type === plantType);
                      if (!plantConfig) return null;

                      const isSelected = selectedSeedTypes.includes(plantType);

                      return (
                        <button
                          key={plantType}
                          type="button"
                          onClick={() => {
                            soundFx.playClick();
                            setSelectedSeedTypes((prev) => {
                              if (prev.includes(plantType)) {
                                return prev.filter((t) => t !== plantType);
                              }
                              if (prev.length >= 6) {
                                return prev;
                              }
                              return [...prev, plantType];
                            });
                          }}
                          className={`relative flex flex-col items-center p-2.5 rounded-2xl border-2 transition duration-200 ${
                            isSelected
                              ? 'bg-amber-950/90 border-lime-400 ring-2 ring-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.5)] scale-102 cursor-pointer'
                              : selectedSeedTypes.length >= 6
                              ? 'bg-stone-900/60 border-stone-700 opacity-50 cursor-not-allowed'
                              : 'bg-stone-900/90 border-stone-600 hover:border-amber-400 hover:scale-102 cursor-pointer'
                          }`}
                        >
                          {/* Selected Badge */}
                          {isSelected && (
                            <span className="absolute -top-2 -right-1 bg-lime-500 text-black text-[9px] font-black font-mono px-1.5 py-0.5 rounded-full shadow border border-lime-200 z-10">
                              ✓ TAKEN
                            </span>
                          )}

                          <div className="w-12 h-12 flex items-center justify-center">
                            <PlantSprite type={plantConfig.type} hp={100} maxHp={100} isAnimated={false} />
                          </div>

                          <span className="text-xs font-black text-amber-200 mt-1 line-clamp-1">
                            {plantConfig.name}
                          </span>

                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-300 mt-0.5">
                            <PrawnIcon className="w-3.5 h-3.5" />
                            <span>{plantConfig.cost} Prawns</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    disabled={selectedSeedTypes.length === 0}
                    onClick={() => {
                      soundFx.playClick();
                      setShowSeedPicker(false);
                    }}
                    className={`w-full max-w-md py-3 rounded-2xl font-black text-xl tracking-widest uppercase shadow-2xl transition duration-200 cursor-pointer ${
                      selectedSeedTypes.length > 0
                        ? 'bg-gradient-to-r from-lime-600 via-emerald-600 to-green-700 hover:from-lime-500 hover:to-green-600 border-2 border-lime-300 text-white active:scale-95'
                        : 'bg-stone-800 border-stone-600 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    LET'S PLANT! ({selectedSeedTypes.length}/6)
                  </button>
                </div>
              </div>
            )}

            {/* AUSSIE JOE LEVEL INTRO DIALOGUE */}
            {showAussieJoeIntro && (
              <AussieJoeDialog
                levelNumber={level.levelNumber}
                customLines={level.levelNumber === 99 ? level99IntroLines : undefined}
                onComplete={() => {
                  setShowAussieJoeIntro(false);
                  if (level.levelNumber === 99) {
                    setLevel99Countdown(10);
                    nextZombieSpawnTimeRef.current = gameTimeRef.current + 10000;
                  } else {
                    if (effectiveUnlockedPlants.length > 6) {
                      setShowSeedPicker(true);
                    }
                    if (level.levelNumber === 7) {
                      setEucalyptusBonusSlot(true);
                    }
                  }
                }}
              />
            )}

            {/* AUSSIE JOE MID-BATTLE LEVEL 99 DIALOGUE ("Fine, I guess I have to do it myself.") */}
            {showLevel99JoeDialogue && (
              <AussieJoeDialog
                levelNumber={99}
                customLines={["Fine, I guess I have to do it myself."]}
                onComplete={() => {
                  setShowLevel99JoeDialogue(false);
                  mowersRef.current = [];
                  setMowers([]);
                  soundFx.playSpudow();

                  effectsRef.current.push({
                    id: `eff_snap_${Date.now()}`,
                    x: 200,
                    y: 150,
                    type: 'spudow',
                    text: 'AUSSIE JOE SNAPPED HIS FINGERS! LAWN MOWERS VANISHED!',
                    createdTime: gameTimeRef.current,
                    duration: 3500,
                  });

                  gargantuarSpawnedRef.current = true;
                  level99JoeBossSpawnedRef.current = true;
                  level99JoeDefeatedRef.current = false;
                  zombiesRef.current.push({
                    id: `boss_aussie_joe_${Date.now()}`,
                    type: 'aussie_joe_boss',
                    row: 2,
                    x: 650,
                    hp: 1000000,
                    maxHp: 1000000,
                    speed: 2.0,
                    isEating: false,
                  });
                  setZombies([...zombiesRef.current]);

                  effectsRef.current.push({
                    id: `eff_boss_joe_${Date.now()}`,
                    x: 200,
                    y: 200,
                    type: 'spudow',
                    text: 'FINAL BOSS: AUSSIE JOE & THE CROCODILE! (1,000,000 HP)',
                    createdTime: gameTimeRef.current,
                    duration: 4000,
                  });

                  setMegaMowerAvailable(true);
                }}
              />
            )}

            {/* AUSSIE JOE POST-GAME VICTORY DIALOGUE */}
            {showAussieJoeVictory && (
              <AussieJoeDialog
                customLines={
                  level.levelNumber === 99
                    ? [
                        "Well, you did it... you won!",
                        "You beat the green men, got every single achievement, and defeated foes I could never beat.",
                        "I know that once I give you this final achievement and trophy... you'll leave.",
                        "I can't stay in this digital outback forever... you can't leave me here!",
                        "Here is your note: 'SorryForEverything'.",
                        "Thank you for playing, mate!",
                      ]
                    : AUSSIE_JOE_VICTORY_DIALOGUE
                }
                isVictoryReward={true}
                onComplete={() => {
                  setShowAussieJoeVictory(false);
                  if (unlockAchievement) {
                    if (level.levelNumber === 99) {
                      unlockAchievement('punch_coded_gut');
                    } else {
                      unlockAchievement('golden_meat_pie');
                      if (level.levelNumber === 6) {
                        unlockAchievement('pro_mode_unlocked');
                      }
                    }
                  }
                  onVictoryRef.current(sunRef.current);
                }}
              />
            )}

            {/* IN-GAME VICTORY OVERLAY WITH INSTANT NEXT LEVEL / MAIN MENU BUTTON */}
            {showVictoryOverlay && (
              <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-auto">
                <div className="bg-stone-900/95 border-4 border-amber-500 rounded-3xl p-8 max-w-md shadow-2xl flex flex-col items-center gap-5 border-double">
                  <div className="w-16 h-16 animate-bounce flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl overflow-visible">
                      <polygon points="16,94 84,94 76,82 24,82" fill="#b45309" stroke="#78350f" strokeWidth="2" />
                      <rect x="24" y="74" width="52" height="8" fill="#d97706" stroke="#fef08a" strokeWidth="2" rx="1" />
                      <path d="M 44 74 L 46 54 L 54 54 L 56 74 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                      <path d="M 24 30 C 24 62 76 62 76 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
                      <ellipse cx="50" cy="30" rx="26" ry="8" fill="#fde047" stroke="#b45309" strokeWidth="1.5" />
                      <path d="M 24 34 C 8 34 6 18 26 20" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <path d="M 76 34 C 92 34 94 18 74 20" stroke="#f59e0b" strokeWidth="4" fill="none" strokeLinecap="round" />
                      <polygon points="50,14 53,22 62,22 55,27 58,35 50,30 42,35 45,27 38,22 47,22" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                    </svg>
                  </div>
                  <h1 className="text-4xl font-black text-lime-400 tracking-wider uppercase drop-shadow font-serif">
                    {level.levelNumber === 12 ? 'PRO MODE CONQUERED!' : level.levelNumber === 99 ? 'FINAL BOSS DEFEATED!' : 'STAGE CLEAR!'}
                  </h1>
                  <p className="text-lg text-amber-100 font-bold italic">
                    {level.levelNumber === 12
                      ? 'All Void Zombies and the Void Sandstone Titan have been defeated!'
                      : level.levelNumber === 99
                      ? 'Aussie Joe and his Crocodile have been defeated!'
                      : `All zombies in ${level.name} have been defeated!`}
                  </p>

                  <div className="flex flex-col gap-3 w-full mt-2">
                    {level.levelNumber < 12 ? (
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          onVictoryRef.current(sunRef.current);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-lime-500 via-emerald-600 to-green-700 hover:from-lime-400 hover:to-green-600 border-2 border-lime-300 rounded-2xl text-white font-black text-2xl tracking-widest uppercase shadow-2xl transform active:scale-95 transition cursor-pointer animate-pulse"
                      >
                        {level.levelNumber === 6 ? 'ADVANCE TO LEVEL 7 ➔' : 'NEXT LEVEL ➔'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          soundFx.playClick();
                          onVictoryRef.current(sunRef.current);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 border-2 border-amber-300 rounded-2xl text-white font-black text-xl tracking-widest uppercase shadow-2xl transform active:scale-95 transition cursor-pointer animate-pulse"
                      >
                        {level.levelNumber === 12 && unlockedAchievements.includes('punch_coded_gut')
                          ? 'ADVANCE TO FINAL LEVEL ➔'
                          : 'RETURN TO MAIN MENU ➔'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SPECIAL POWER-UP: BEE-R (Bottom-Right Corner) */}
            {hasUnlockedBeeR && (
              <div className="absolute bottom-3 right-3 z-40 flex flex-col items-center">
                <button
                  type="button"
                  id="bee-r-powerup-btn"
                  disabled={beeRCooldown > 0 || isBeeRFlying}
                  onClick={handleTriggerBeeR}
                  title={
                    beeRCooldown > 0
                      ? `Bee-R on Cooldown: ${beeRCooldown}s remaining`
                      : 'BEE-R POWER-UP! Press [B] or click to deploy massive Bee-R screen wipe!'
                  }
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-1 border-3 shadow-2xl transition-all select-none ${
                    beeRCooldown > 0
                      ? 'bg-stone-900/90 border-stone-600 opacity-70 cursor-not-allowed'
                      : 'bg-gradient-to-b from-amber-600 via-amber-700 to-amber-950 border-yellow-300 hover:border-yellow-200 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-pulse'
                  }`}
                >
                  {/* Bee-R Sprite */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center pointer-events-none">
                    <BeeRSprite className="w-full h-full filter drop-shadow" />
                  </div>

                  {/* Button Label or Cooldown Timer */}
                  {beeRCooldown > 0 ? (
                    <div className="absolute inset-0 bg-black/75 rounded-2xl flex flex-col items-center justify-center">
                      <span className="text-yellow-400 font-mono font-black text-sm sm:text-base drop-shadow">
                        {beeRCooldown}s
                      </span>
                      <span className="text-[9px] text-stone-400 font-bold tracking-wider uppercase font-sans">
                        COOLING
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center mt-[-2px] leading-tight">
                      <span className="text-[9px] sm:text-[10px] font-black text-yellow-300 uppercase tracking-widest font-mono drop-shadow">
                        BEE-R
                      </span>
                      <span className="text-[8px] font-mono font-bold text-yellow-100 bg-black/50 px-1 py-px rounded border border-yellow-400/50">
                        [B]
                      </span>
                    </div>
                  )}

                  {/* Ready notification ping */}
                  {beeRCooldown === 0 && !isBeeRFlying && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* MASSIVE BEE-R FLYOVER SCREEN WIPE ANIMATION */}
            {isBeeRFlying && (
              <BeeRFlyover onComplete={() => setIsBeeRFlying(false)} />
            )}

            {/* AUSSIE JOE 150 LEAVES ROAST DIALOGUE */}
            {showAussieJoeRoast && (
              <AussieJoeDialog
                customLines={AUSSIE_JOE_ROAST_DIALOGUE}
                onComplete={() => {
                  setShowAussieJoeRoast(false);
                  setHasUnlockedBeeR(true);
                  markBeeRRoastSeen();
                }}
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
});

