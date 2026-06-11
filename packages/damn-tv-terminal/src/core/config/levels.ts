export const EnemyMovementTypes = {
  DUNCE: 'DUNCE',
  FOLLOWER: 'FOLLOWER',
  SNEK: 'SNEK',
} as const;

export type EnemyMovementType =
  (typeof EnemyMovementTypes)[keyof typeof EnemyMovementTypes];

export interface LevelConfig {
  level: number;
  killsToAdvance: number;
  winBonus: number;
  spawnIntervalMs: number;
  scrollSpeed: number;
  enemyWeights: Record<EnemyMovementType, number>;
}

export const levelConfigs: LevelConfig[] = [
  {
    level: 1,
    killsToAdvance: 50,
    winBonus: 360,
    spawnIntervalMs: 850,
    scrollSpeed: 1.4,
    enemyWeights: {
      DUNCE: 0.7,
      FOLLOWER: 0.2,
      SNEK: 0.1,
    },
  },
  {
    level: 2,
    killsToAdvance: Infinity,
    winBonus: 720,
    spawnIntervalMs: 550,
    scrollSpeed: 2,
    enemyWeights: {
      DUNCE: 0.4,
      FOLLOWER: 0.35,
      SNEK: 0.25,
    },
  },
];

export function getLevelConfig(levelIndex: number): LevelConfig {
  return levelConfigs[Math.min(levelIndex, levelConfigs.length - 1)]!;
}
