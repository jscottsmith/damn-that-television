import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './LevelInterface.module.scss';
import PowerBar from './PowerBar';

const LevelInterface = ({
  kills,
  points,
  lives,
  hitPower,
  maxHitPower,
  shieldPower,
  maxShieldPower,
}) => (
  <Fragment>
    <div className={styles.scoreInterface}>
      <div className={styles.points}>
        <span className={styles.type}>Score:</span> {points}
      </div>
      <div className={styles.kills}>
        <span className={styles.type}>Kills:</span> {kills}
      </div>
    </div>
    <div className={styles.playerInterface}>
      <div className={styles.hitPower}>
        <PowerBar max={maxHitPower} amount={hitPower} color="#fffb74" />
      </div>
      <div className={styles.lives}>
        <span className={styles.type}>Lives:</span> {lives}
      </div>
      <div className={styles.shieldPower}>
        <PowerBar max={maxShieldPower} amount={shieldPower} color="#72dbde" />
      </div>
    </div>
  </Fragment>
);

// LevelInterface.propTypes = {
//   hitPower: PropTypes.number,
//   kills: PropTypes.number,
//   lives: PropTypes.number,
//   maxHitPower: PropTypes.number,
//   maxShieldPower: PropTypes.number,
//   points: PropTypes.number,
//   shieldPower: PropTypes.number,
// };

const mapStateToProps = ({
  score: { kills, points },
  player: { lives, hitPower, maxHitPower, shieldPower, maxShieldPower },
}) => ({
  kills,
  points,
  lives,
  hitPower,
  maxHitPower,
  shieldPower,
  maxShieldPower,
});

export default connect(mapStateToProps)(LevelInterface);
