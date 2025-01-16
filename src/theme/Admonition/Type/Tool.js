import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import ConstructionIcon from '@mui/icons-material/Construction';  // hammer and wrench (default)

const infimaClassName = 'alert alert--tool';

const defaultProps = {
  icon: <ConstructionIcon fontSize='tiny' />,
  title: (
    <Translate
      id="theme.admonition.tool"
      description="The default label used for the Tool admonition (:::tool)">
      tool
    </Translate>
  ),
};

export default function AdmonitionTypeTool(props) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}