export type GameStage = 
  | 'menu' 
  | 'profile_modal' 
  | 'level_select' 
  | 'load_game_modal' 
  | 'playing' 
  | 'paused' 
  | 'game_over' 
  | 'victory';

export type PlantType = 
  | 'peashooter' 
  | 'grillflower'
  | 'sunflower' 
  | 'potatomine' 
  | 'walnut' 
  | 'repeater' 
  | 'snowpea' 
  | 'cherrybomb' 
  | 'chomper'
  | 'threepeater'
  | 'rottenbabytomato'
  | 'mini_eucalyptus'
  | 'meatcan'
  | 'mega_mower';

export type ZombieType = 
  | 'basic' 
  | 'conehead' 
  | 'buckethead' 
  | 'flag' 
  | 'polevaulter'
  | 'koala_imp'
  | 'red_sand_gargantuar'
  | 'red_sand_imp'
  | 'aussie_joe_boss';

export interface PlantConfig {
  type: PlantType;
  name: string;
  cost: number;
  cooldown: number; // in seconds
  maxHp: number;
  description: string;
  unlockedAtLevel: number;
}

export interface PlantedPlant {
  id: string;
  type: PlantType;
  row: number; // 0 to 4
  col: number; // 0 to 8
  hp: number;
  maxHp: number;
  lastActionTime: number; // timestamp for shooting/generating sun
  createdTime: number;
  state?: 'sprouting' | 'armed' | 'chewing' | 'triggered';
  chewEndTime?: number;
  stunnedUntil?: number; // Drop Bear Ambush stun effect
  growthTimer?: number;
  scale?: number;
  isMoving?: boolean;
  x?: number;
}

export interface Zombie {
  id: string;
  type: ZombieType;
  row: number; // 0 to 4
  x: number; // pixel position from left of lawn
  hp: number;
  maxHp: number;
  speed: number;
  isEating: boolean;
  eatingPlantId?: string;
  isSlowed?: boolean;
  slowTimer?: number;
  hasVaulted?: boolean;
  isVaulting?: boolean;
  vaultProgress?: number;
  hasEucalyptusShield?: boolean;
  isThrown?: boolean;
  hasThrownImp?: boolean;
  isSmashing?: boolean;
}

export interface Projectile {
  id: string;
  type: 'pea' | 'frozenPea' | 'eucalyptus_leaf' | 'meat_pie';
  row: number;
  x: number;
  damage: number;
  slowEffect?: boolean;
}

export interface Sun {
  id: string;
  x: number; // pixel relative to lawn
  y: number; // pixel relative to top
  targetY: number;
  value: number;
  spawnTime: number;
  isFromSunflower?: boolean;
  isFromGrillFlower?: boolean;
  collected?: boolean;
}

export interface LawnMower {
  row: number;
  x: number;
  state: 'idle' | 'triggered' | 'gone';
}

export interface VisualEffect {
  id: string;
  x: number;
  y: number;
  type: 'spudow' | 'boom' | 'splat' | 'sun_pickup' | 'zombie_head';
  text?: string;
  createdTime: number;
  duration: number;
}

export interface LevelConfig {
  levelNumber: number;
  name: string;
  description: string;
  unlockedPlants: PlantType[];
  zombieTypes: ZombieType[];
  totalZombies: number;
  waveCount: number;
  sunDropInterval: number; // seconds
  background: 'day' | 'night' | 'void';
  isProMode?: boolean;
}

export interface UserProfile {
  name: string;
  highestLevelUnlocked: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  unlockedAchievements?: string[];
}

export interface SaveGame {
  id: string;
  playerName: string;
  level: number;
  sun: number;
  savedAt: string;
  plants: PlantedPlant[];
  zombies: Zombie[];
  mowers: LawnMower[];
  zombiesKilled: number;
  totalZombiesInLevel: number;
}
