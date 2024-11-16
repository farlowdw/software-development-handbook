import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import BoltIcon from '@mui/icons-material/Bolt';      // lightning bolt (default)

const infimaClassName = 'alert alert--dwf';

const defaultProps = {
  icon: <BoltIcon fontSize='tiny' />,
  title: (
    <Translate
      id="theme.admonition.zdwf"
      description="The default label used for the DWF admonition (:::dwf)">
      dwf
    </Translate>
  ),
};

export default function AdmonitionTypeDWF(props) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}