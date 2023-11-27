import React from 'react';
import { withRouter } from 'next/router';
import Fade from 'components/Fade';
import { Home } from '@/routes/home';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';

export async function getStaticProps({ params }) {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('homepage', {});

  return {
    props: {
      document,
    },
  };
}

const Page = (props) => {
  return (
    <Fade in>
      <Home document={props.document} />
    </Fade>
  );
};

export default withRouter(Page);
