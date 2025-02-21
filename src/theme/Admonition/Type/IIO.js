import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import CodeIcon from '@mui/icons-material/Code';      // code angles (default)

const infimaClassName = 'alert alert--iio';

const defaultProps = {
  icon: <CodeIcon fontSize='tiny' />,
  title: (
    <Translate
      id="theme.admonition.iio"
      description="The default label used for the iio admonition (:::iio)">
      iio
    </Translate>
  ),
};

export default function AdmonitionTypeStudy(props) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}