import React from 'react';

import styles from './HeaderNav.module.scss';
import { EyeButton } from 'components/eye-button';

const HeaderNav = (props: {
  onEyeClick?: () => unknown;
  isEyeActive: boolean;
  eyeColor?: string;
}) => (
  <header className={styles.root}>
    <EyeButton
      onClick={props.onEyeClick}
      isEyeActive={props.isEyeActive}
      className={props.eyeColor}
    />
  </header>
);

export default HeaderNav;
