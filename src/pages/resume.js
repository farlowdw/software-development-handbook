import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ResumeViewer from '@site/src/components/ResumeViewer';

const ResumePage = () => (
  <Layout>
    <Head>
      <title>Resume - Daniel W. Farlow</title>
    </Head>
    <ResumeViewer />
  </Layout>
);

export default ResumePage;
