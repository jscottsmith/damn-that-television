import React from 'react';
import { withRouter } from 'next/router';
import Fade from 'components/Fade';
import { Home } from '@/routes/home';
import Client from 'utils/prismicHelpers';

export async function getStaticProps({ params }) {
  const document = await Client().getSingle('homepage', {});

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
