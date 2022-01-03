import React, { PureComponent } from 'react';
import { RichText } from 'prismic-reactjs';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Helmet from 'react-helmet';
import cx from 'classnames';

import Copy from 'components/atoms/Copy';
import Eye from 'components/atoms/Eye';
import { Links } from 'slices/links';
import Client from '../../utils/prismicHelpers';

import content from 'markdown/resume-content.md';

import styles from './Resume.module.scss';

const DESC = 'Résumé of J Scott Smith, a creative web developer.';
const AVATAR_PATH = '/static/avatar.jpg';

export async function getStaticProps({ params }) {
  const document = await Client().getSingle('resume');

  return {
    props: {
      document,
    },
  };
}

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
          content: DESC,
        },
        // Twitter Meta
        { name: 'twitter:description', content: DESC },
        {
          name: 'twitter:image',
          content: AVATAR_PATH,
        },
        // Facebook OG
        {
          property: 'og:url',
          content: this.props.router.pathname,
        },
        { property: 'og:description', content: DESC },
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
              <div className={styles.job}>
                <RichText render={this.props.document.data.name} />
                <RichText render={this.props.document.data.current_job_title} />
                <div className="small">
                  <RichText
                    render={this.props.document.data.current_role_location}
                  />
                </div>
              </div>
              {this.props.document.data.body.map((slice, i) => {
                if (slice.slice_type === 'links') {
                  return <Links links={slice} key={i} />;
                }
                return null;
              })}
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
