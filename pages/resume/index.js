import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import Helmet from 'react-helmet';
import cx from 'classnames';
import Copy from 'components/atoms/Copy';
import styles from './Resume.scss';
import content from 'markdown/resume-content.md';
import info from 'markdown/resume-info.md';

const desc = 'Résumé of J Scott Smith, a creative web developer.';
const AVATAR_PATH = '/static/avatar.jpg';

export default withRouter(
    class Resume extends PureComponent {
        getMeta() {
            return [
                {
                    name: 'description',
                    content: desc,
                },
                // Twitter Meta
                { name: 'twitter:description', content: desc },
                {
                    name: 'twitter:image',
                    content: AVATAR_PATH,
                },
                // Facebook OG
                {
                    property: 'og:url',
                    content: this.props.pathname,
                },
                { property: 'og:description', content: desc },
                { property: 'og:image', content: AVATAR_PATH },
            ];
        }

        render() {
            return (
                <article className={cx('page-resume', styles.pageResume)}>
                    <Helmet title="Résumé" meta={this.getMeta()} />
                    <div className={styles.resume}>
                        <header className={styles.info}>
                            <div className={styles.avatar}>
                                <img src={AVATAR_PATH} alt="J Scott Smith" />
                            </div>
                            <Copy>{info}</Copy>
                        </header>
                        <Copy tag="div" className={styles.content}>
                            {content}
                        </Copy>
                    </div>
                    <footer className={styles.footer}>
                        <svg
                            className={styles.eye}
                            version="1.1"
                            viewBox="0 0 200 100"
                        >
                            <path
                                d=" M200,0h-16.7c0,12.4-2.7,24.2-7.6,34.7C157.4,13.5,130.2,0,100,0C69.8,0,42.6,13.5,24.3,34.7
    	C19.4,24.2,16.7,12.4,16.7,0H0c0,18.2,4.9,35.3,13.4,50C4.9,64.7,0,81.8,0,100h16.7c0-12.4,2.7-24.2,7.6-34.7
    	C42.6,86.5,69.8,100,100,100c30.2,0,57.4-13.5,75.7-34.7c4.9,10.6,7.6,22.3,7.6,34.7H200c0-18.2-4.9-35.3-13.4-50
    	C195.1,35.3,200,18.2,200,0z M33.4,50c6.9-9.2,15.8-17,25.9-22.6c-3.7,6.7-5.7,14.3-5.7,22.5c0,8.3,2.2,16.1,6,22.9
    	C49.3,67.1,40.4,59.3,33.4,50z M139.3,73.5c4-6.9,6.4-15,6.4-23.6c0-8.5-2.2-16.4-6.2-23.2c10.7,5.8,19.9,13.8,27.2,23.4
    	C159.3,59.7,150,67.7,139.3,73.5z"
                            />
                        </svg>
                    </footer>
                </article>
            );
        }
    },
);
