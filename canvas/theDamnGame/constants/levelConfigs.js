import { EnemyMovementTypes } from '../Enemy.js';
const assets = {
    bomb: '/static/damnit/bomb.png',
    damnit: '/static/damnit/damnit.png',
    fist: '/static/damnit/fist.png',
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
        killsToAdvance: 10,
        backgroundColors: ['#f5b8b5', '#ea94ba'],
        winBonus: 360,
        // EnemyMovementTypes: EnemyMovementTypes.DUNCE,
        assets,
    },
    1: {
        killsToAdvance: 20,
        backgroundColors: ['#8d98fc', '#72dbde'],
        winBonus: 720,
        // EnemyMovementTypes: EnemyMovementTypes.DUNCE,
        assets,
    },
};

export default levelConfigs;