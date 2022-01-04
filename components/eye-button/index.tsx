import React from 'react';
import cx from 'classnames';
import Eye from '@/components/eye';
import * as styles from './index.module.scss';

export const EyeButton = (props: {
  isEyeActive: boolean;
  className?: string;
}) => {
  const { isEyeActive, className, ...rest } = props;

  return (
    <button
      className={cx(props.className, styles.eyeButton, {
        [styles.eyeActive]: props.isEyeActive,
      })}
      {...rest}
    >
      <Eye className={styles.headerEye} />
    </button>
  );
};
