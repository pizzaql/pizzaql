import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['pizzaql', 'pizza', 'order']} />
    <p>Modern order management & placement system for your restaurant!</p>
  </Layout>
);

export default IndexPage;
