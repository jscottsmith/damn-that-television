import React, { PureComponent } from 'react';

import cx from 'classnames';
import Copy from 'Atoms/Copy';
import Svg from 'Atoms/Svg';
import styles from 'Styles/pages/_resume.scss';
import content from 'content/resume/resume-content.md';
import info from 'content/resume/resume-info.md';
import avatar from 'Images/avatar.jpg';
import eye from '!raw-loader!!Images/eye.svg';

export default class Resume extends PureComponent {
    render() {
        return (
            <article className={cx('page-resume', styles.pageResume)}>
                <div className={styles.resume}>
                    <header className={styles.info}>
                        <div className={styles.avatar}>
                            <img src={avatar} alt="J Scott Smith" />
                        </div>
                        <Copy>{info}</Copy>
                    </header>
                    <Copy tag="div" className={styles.content}>
                        {content}
                    </Copy>
                </div>
                <footer className={styles.footer}>
                    <Svg className={styles.eye} svg={eye} />
                </footer>
            </article>
        );
    }
}
