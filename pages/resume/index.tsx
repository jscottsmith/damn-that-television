import React from 'react';
import { Resume } from 'routes/resume';
import { withRouter } from 'next/router';
import * as prismic from '@prismicio/client';
import { prismicConfiguration, repoName } from 'prismicConfiguration';

export async function getStaticProps() {
  const client = prismic.createClient(repoName, prismicConfiguration);
  const document = await client.getSingle('resume', {});

  return {
    props: {
      document,
    },
  };
}

const Page = (props) => {
  return <Resume {...props} />;
};

export default withRouter(Page);
