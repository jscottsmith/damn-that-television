import React from 'react';
import { EyeButton } from 'components/eye-button';
import styles from './HeaderNav.module.scss';

const HeaderNav = (props: {
  onEyeClick?: () => unknown;
  isEyeActive: boolean;
  eyeColor?: string;
}) => (
  <header className={styles.root}>
    <EyeButton
      // @ts-expect-error
      onClick={props.onEyeClick}
      isEyeActive={props.isEyeActive}
      className={props.eyeColor}
    />
  </header>
);

export default HeaderNav;
