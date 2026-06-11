export const EnemyMovementTypes = {
  DUNCE: 'DUNCE',
  FOLLOWER: 'FOLLOWER',
  SNEK: 'SNEK',
} as const;

export type EnemyMovementType =
  (typeof EnemyMovementTypes)[keyof typeof EnemyMovementTypes];

export interface LevelRuntimeConfig {
  level: number;
  scrollSpeed: number;
  winBonus: number;
  height: number;
}
