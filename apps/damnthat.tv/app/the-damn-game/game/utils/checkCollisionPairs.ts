import gameStore from '../store/gameStore';

import Projectile from '../Projectile';
import PowerUp from '../PowerUp';
import Enemy from '../Enemy';
import Player from 'app/the-damn-game/game/Player';

import * as playerActions from '../actions/playerActions';
import * as scoreActions from '../actions/scoreActions';

export default function checkCollisionPairs({
  spatialGrid,
  config,
  createExplosion,
  createNotification,
}) {
  const pairs = spatialGrid.queryForCollisionPairs();
  pairs.forEach(([a, b]: [Player, Player]) => {
    // if anything is already dead return early
    if (a.dead || b.dead) {
      return;
    }
    // player to enemy hits
    if (a instanceof Player && b instanceof Enemy) {
      createNotification('oof', b.x, b.y, 0, 3);
      createExplosion(0.5, b.x, b.y);
      if (a.shield.dead) {
        gameStore.dispatch(playerActions.hitPlayer);
      } else {
        gameStore.dispatch(playerActions.hitShield);
      }

      b.dead = true;
      return;
    }
    if (a instanceof Enemy && b instanceof Player) {
      createNotification('oof', a.x, a.y, 0, 3);
      createExplosion(0.5, a.x, a.y);
      if (b.shield.dead) {
        gameStore.dispatch(playerActions.hitPlayer);
      } else {
        gameStore.dispatch(playerActions.hitShield);
      }
      a.dead = true;
      return;
    }

    // projectile to enemy
    if (a instanceof Enemy && b instanceof Projectile) {
      createExplosion(1, a.x, a.y);
      createNotification('+100', a.x, a.y);
      gameStore.dispatch(scoreActions.updateScore(100, config.level));
      a.dead = true;
      b.dead = true;
      return;
    }
    if (a instanceof Projectile && b instanceof Enemy) {
      createExplosion(1, b.x, b.y);
      createNotification('+100', b.x, b.y);
      gameStore.dispatch(scoreActions.updateScore(100, config.level));
      a.dead = true;
      b.dead = true;
      return;
    }

    // power up to player
    if (a instanceof PowerUp && b instanceof Player) {
      createNotification(`${a.type} +500`, a.x, a.y);
      gameStore.dispatch(scoreActions.updateScore(500, config.level));
      gameStore.dispatch(playerActions.weaponPowerUp(a.type));
      a.dead = true;
      return;
    }
    if (a instanceof Player && b instanceof PowerUp) {
      createNotification(`${b.type} +500`, b.x, b.y);
      gameStore.dispatch(scoreActions.updateScore(500, config.level));
      gameStore.dispatch(playerActions.weaponPowerUp(b.type));
      b.dead = true;
      return;
    }
  });
}
