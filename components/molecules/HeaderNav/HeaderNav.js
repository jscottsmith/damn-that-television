import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Eye from 'components/atoms/Eye';

import styles from './HeaderNav.scss';

const HeaderNav = ({ onEyeClick, isEyeActive }) => (
  <header className={styles.root}>
    <button
      className={cx(styles.eyeButton, {
        [styles.eyeActive]: isEyeActive,
      })}
      onClick={onEyeClick}
    >
      <Eye className={styles.headerEye} />
    </button>
  </header>
);

HeaderNav.propTypes = {
  onEyeClick: PropTypes.func.isRequired,
};

export default HeaderNav;
