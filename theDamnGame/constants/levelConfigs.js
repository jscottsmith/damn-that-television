import { EnemyMovementTypes } from '../Enemy.js';
const assetUrls = {
  bomb: '/static/damnit/bomb.png',
  damnit: '/static/damnit/damnit.png',
  fist: '/static/damnit/fist.png',
  handPeace: '/static/damnit/hand-peace.png',
  hit: '/static/damnit/hit.png',
  life: '/static/damnit/life.png',
  pill: '/static/damnit/pill.png',
  pizza: '/static/damnit/pizza.png',
  shield: '/static/damnit/shield.png',
  shoot: '/static/damnit/shoot.png',
  tv: '/static/damnit/tv.png',
};

const levelConfigs = {
  0: {
    level: 1,
    killsToAdvance: 50,
    backgroundColors: ['#f5b8b5', '#ea94ba'],
    winBonus: 360,
    // EnemyMovementTypes: EnemyMovementTypes.DUNCE,
    assetUrls,
  },
  1: {
    level: 2,
    killsToAdvance: Infinity,
    backgroundColors: ['#8d98fc', '#72dbde'],
    winBonus: 720,
    // EnemyMovementTypes: EnemyMovementTypes.DUNCE,
    assetUrls,
  },
};

export default levelConfigs;
