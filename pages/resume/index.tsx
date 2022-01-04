import React from 'react';
import { Resume } from 'routes/resume';
import { withRouter } from 'next/router';
import Client from 'utils/prismicHelpers';

export async function getStaticProps({ params }) {
  const document = await Client().getSingle('resume', {});

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
