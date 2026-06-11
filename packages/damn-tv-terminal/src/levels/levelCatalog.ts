import level01 from "./templates/level-01.level";
import level02 from "./templates/level-02.level";
import { parseLevelTemplate, type ParsedLevel } from "./parseLevelTemplate.js";

export const LEVEL_COUNT = 2;

const parsedLevels: ParsedLevel[] = [
  parseLevelTemplate(level01),
  parseLevelTemplate(level02),
];

export function getLevelByIndex(index: number): ParsedLevel {
  const clamped = Math.max(0, Math.min(index, parsedLevels.length - 1));
  return parsedLevels[clamped]!;
}

export function getAllLevels(): readonly ParsedLevel[] {
  return parsedLevels;
}
