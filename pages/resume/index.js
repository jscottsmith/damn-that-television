import React, { PureComponent } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Helmet from 'react-helmet';
import cx from 'classnames';

import Copy from 'components/atoms/Copy';
import Eye from 'components/atoms/Eye';

import content from 'markdown/resume-content.md';
import info from 'markdown/resume-info.md';

import styles from './Resume.module.scss';

const desc = 'Résumé of J Scott Smith, a creative web developer.';
const AVATAR_PATH = '/static/avatar.jpg';

export default withRouter(
  class Resume extends PureComponent {
    static propTypes = {
      router: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }).isRequired,
    };

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
          content: this.props.router.pathname,
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
                <Image
                  src={AVATAR_PATH}
                  alt="J Scott Smith"
                  width={300}
                  height={300}
                  layout="responsive"
                />
              </div>
              <Copy>{info}</Copy>
            </header>
            <Copy tag="div" className={styles.content}>
              {content}
            </Copy>
          </div>
          <footer className={styles.footer}>
            <Eye className={styles.eye} />
          </footer>
        </article>
      );
    }
  },
);
