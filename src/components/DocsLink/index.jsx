import React from 'react';
import Link from '@docusaurus/Link';

const DocsLink = ({ to, ...props }) => <Link to={`${to}`} {...props} />;

export default DocsLink;
