import React, { PureComponent } from 'react';
import cx from 'classnames';
import styles from './index.scss';
import Copy from 'components/atoms/Copy';
import content from 'markdown/home.md';

export default class Home extends PureComponent {
    render() {
        return (
            <article className={cx('page-index', styles.index)}>
                <div className={cx(styles.welcome)}>
                    <Copy>{content}</Copy>
                    <button className={styles.play}>Go!</button>
                </div>
            </article>
        );
    }
}