// Persistent Career Player Statistics & Leaves Currency Engine for Plants vs. Zombies

export interface PlayerStats {
  totalZombiesDefeated: number;
  totalSunCollected: number;
  totalTimePlayedSeconds: number;
  totalPlantsPlanted: number;
  totalPlantsLost: number;
  leaves: number;
  hasUnlockedBeeR: boolean;
  hasSeenBeeRRoast: boolean;
}

const STATS_STORAGE_KEY = 'pvz_player_stats';

const DEFAULT_STATS: PlayerStats = {
  totalZombiesDefeated: 0,
  totalSunCollected: 0,
  totalTimePlayedSeconds: 0,
  totalPlantsPlanted: 0,
  totalPlantsLost: 0,
  leaves: 0,
  hasUnlockedBeeR: false,
  hasSeenBeeRRoast: false,
};

export const getPlayerStats = (): PlayerStats => {
  if (typeof window === 'undefined') return { ...DEFAULT_STATS };
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    return {
      totalZombiesDefeated: Math.max(0, Number(parsed.totalZombiesDefeated) || 0),
      totalSunCollected: Math.max(0, Number(parsed.totalSunCollected) || 0),
      totalTimePlayedSeconds: Math.max(0, Number(parsed.totalTimePlayedSeconds) || 0),
      totalPlantsPlanted: Math.max(0, Number(parsed.totalPlantsPlanted) || 0),
      totalPlantsLost: Math.max(0, Number(parsed.totalPlantsLost) || 0),
      leaves: Math.max(0, Number(parsed.leaves) || 0),
      hasUnlockedBeeR: Boolean(parsed.hasUnlockedBeeR || parsed.leaves >= 150),
      hasSeenBeeRRoast: Boolean(parsed.hasSeenBeeRRoast),
    };
  } catch (err) {
    console.error('Failed to parse player stats:', err);
    return { ...DEFAULT_STATS };
  }
};

export const savePlayerStats = (stats: PlayerStats): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save player stats:', err);
  }
};

export const recordZombieKills = (count: number): PlayerStats => {
  const current = getPlayerStats();
  const updated: PlayerStats = {
    ...current,
    totalZombiesDefeated: current.totalZombiesDefeated + count,
  };
  savePlayerStats(updated);
  return updated;
};

export const recordSunCollected = (amount: number): PlayerStats => {
  const current = getPlayerStats();
  const updated: PlayerStats = {
    ...current,
    totalSunCollected: current.totalSunCollected + amount,
  };
  savePlayerStats(updated);
  return updated;
};

export const recordTimePlayed = (seconds: number): PlayerStats => {
  const current = getPlayerStats();
  const updated: PlayerStats = {
    ...current,
    totalTimePlayedSeconds: current.totalTimePlayedSeconds + seconds,
  };
  savePlayerStats(updated);
  return updated;
};

export const recordPlantPlanted = (): PlayerStats => {
  const current = getPlayerStats();
  const updated: PlayerStats = {
    ...current,
    totalPlantsPlanted: current.totalPlantsPlanted + 1,
  };
  savePlayerStats(updated);
  return updated;
};

export const recordPlantLost = (): { stats: PlayerStats; justUnlockedBeeR: boolean } => {
  const current = getPlayerStats();
  const nextLeaves = current.leaves + 1;
  const justUnlockedBeeR = nextLeaves >= 150 && !current.hasUnlockedBeeR;
  const updated: PlayerStats = {
    ...current,
    totalPlantsLost: current.totalPlantsLost + 1,
    leaves: nextLeaves,
    hasUnlockedBeeR: current.hasUnlockedBeeR || nextLeaves >= 150,
  };
  savePlayerStats(updated);
  return { stats: updated, justUnlockedBeeR };
};

export const grantPetalsCheat = (): { stats: PlayerStats; justUnlockedBeeR: boolean } => {
  const current = getPlayerStats();
  const nextLeaves = current.leaves + 150;
  const justUnlockedBeeR = !current.hasUnlockedBeeR;
  const updated: PlayerStats = {
    ...current,
    leaves: nextLeaves,
    hasUnlockedBeeR: true,
  };
  savePlayerStats(updated);
  return { stats: updated, justUnlockedBeeR };
};

export const markBeeRRoastSeen = (): PlayerStats => {
  const current = getPlayerStats();
  const updated: PlayerStats = {
    ...current,
    hasSeenBeeRRoast: true,
  };
  savePlayerStats(updated);
  return updated;
};

export const formatPlayTime = (totalSeconds: number): string => {
  const total = Math.floor(Math.max(0, totalSeconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};
