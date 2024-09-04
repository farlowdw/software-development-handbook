import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import ResumeViewer from '@site/src/components/ResumeViewer';

const ResumePage = () => (
  <Layout>
    <Head>
      <title>Resume - Daniel W. Farlow</title>
      <meta name="description" content="Current resume for Daniel W. Farlow, a software engineer based in Nashville, TN" />
    </Head>
    <ResumeViewer />
  </Layout>
);

export default ResumePage;
