import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from 'Styles/components/_svg.scss';

export default function Svg(props) {
    const { svg, className } = props;
    return (
        <span
            className={cx(styles.root, {
                [className]: className,
            })}
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}

Svg.propTypes = {
    svg: PropTypes.string.isRequired,
    className: PropTypes.string,
};
