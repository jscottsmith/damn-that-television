import React from 'react';
import { withRouter } from 'next/router';
import Fade from 'components/Fade';
import IntroLanding from 'components/sections/IntroLanding/IntroLanding';
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
      <IntroLanding document={props.document} />
    </Fade>
  );
};

export default withRouter(Page);
