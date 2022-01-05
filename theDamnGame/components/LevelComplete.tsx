import React, { Component } from 'react';
import styles from './LevelComplete.module.scss';
import { connect } from 'react-redux';

class LevelComplete extends Component {
  props: any;
  render() {
    return (
      <div className={styles.levelComplete}>
        <div>
          <h1>Level Completed!</h1>
          <p className={styles.details}>{this.props.kills} kills</p>
          <p className={styles.details}>{this.props.points} points</p>
          <button className={styles.start} onClick={this.props.handleStart}>
            Continue
          </button>
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps)(LevelComplete);
