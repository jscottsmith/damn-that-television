import React, { PureComponent } from 'react';
// import Damnit from 'Organisms/Damnit';
import cx from 'classnames';
import styles from 'Styles/pages/_index.scss';
import Copy from 'Atoms/Copy';
import content from 'content/home/home.md';

export default class Home extends PureComponent {
    render() {
        return (
            <article className={cx('page-index', styles.index)}>
                <Copy className={styles.welcome}>{content}</Copy>
            </article>
        );
    }
}
