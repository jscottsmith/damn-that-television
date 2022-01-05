import React from 'react';
import styles from './GameIntro.module.scss';

type Props = { handleStart: () => void };

export const GameIntro = (props: Props) => {
  return (
    <div className={styles.gameIntro}>
      <div className="prose">
        <h2>Damn TV!</h2>
        <p>
          Space, Click or Tap to shoot.
          <br />
          Mouse or Touch to move.
          <br />
          Kill TVs to win.
        </p>
        <button className={styles.start} onClick={props.handleStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default GameIntro;
