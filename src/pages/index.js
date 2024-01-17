import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from './index.module.scss';
import Button from '@mui/material/Button';

const features = [
  {
    title: 'Data Structures',
    content:
      "There are many data structures to learn and precious little time to do so. There's even less time to reinvent the wheel whenever you rediscover a data structure you need but have not used in quite some time. Whether it's for interviews or daily practice, it helps to have a data structure reference handy that summarizes much of your hard-earned knowledge.",
  },
  {
    title: 'Algorithms',
    content:
      "You may not need to know the Knuth-Morris-Pratt string-searching algorithm by heart, but algorithms in general are the lifeblood of computer science. Knowing formal algorithms that are named after their founders can be nice, but knowing general-purpose algorithmic design principles is nicer.",
  },
  {
    title: 'Everything Else',
    content:
      "When it comes to software engineering, especially technical interviews, most of what you hear about concerns data structures and algorithms. But there's so much more. Literally everything else (e.g., system design, tips and tricks, topical explorations, mental model templates, etc.).",
  },
];

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      permalink={'/'}
      description={'Software engineering handbook landing page.'}
    >
      <div className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <img
            className={clsx(styles.heroBannerLogo, 'margin-vert--sm')}
            alt="Software Engineering Handbook logo"
            src={useBaseUrl('img/logo.svg')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.getStarted} >
            <Button variant="contained" color="inherit">
              <Link className={styles.checkItOut} to={useBaseUrl('docs/intro')}>
                <span style={{ fontFamily: 'IBM Plex Sans' }}>Check it out</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {features && features.length && (
        <div className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map(({ title, content }, idx) => (
                <div key={idx} className={clsx('col col--4', styles.feature)}>
                  <h2>{title}</h2>
                  <p>{content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Home;