import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import CreateIcon from '@mui/icons-material/Create';      // pencil (default)

const infimaClassName = 'alert alert--study';

const defaultProps = {
  icon: <CreateIcon fontSize='tiny' />,
  title: (
    <Translate
      id="theme.admonition.study"
      description="The default label used for the study admonition (:::study)">
      study
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