import { Point, utils } from '@gush/candybar';

export default function pointGenerator(bounds) {
  const x = utils.getRandomInt(bounds.x, bounds.x + bounds.w);
  const y = utils.getRandomInt(bounds.y, bounds.y + bounds.h);
  return new Point(x, y);
}
