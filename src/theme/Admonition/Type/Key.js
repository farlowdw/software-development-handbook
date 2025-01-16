import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import AdmonitionLayout from '@theme/Admonition/Layout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';  // key (default)

const infimaClassName = 'alert alert--key';

const defaultProps = {
  icon: <VpnKeyIcon fontSize='tiny' />,
  title: (
    <Translate
      id="theme.admonition.key"
      description="The default label used for the Key admonition (:::key)">
      key
    </Translate>
  ),
};

export default function AdmonitionTypeKey(props) {
  return (
    <AdmonitionLayout
      {...defaultProps}
      {...props}
      className={clsx(infimaClassName, props.className)}>
      {props.children}
    </AdmonitionLayout>
  );
}