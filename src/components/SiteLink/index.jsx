import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * 
 * @param {Object} props SiteLink component props
 * @param {('cs'|'sd'|'')} [props.sid=''] Site id to use for the base URL configuration
 * @param {string} [props.slug=''] Slug for site resource (e.g., 'docs/reference-list')
 * @param {Object} [props...props] Additional props passed to SiteLink component
 * @returns {React.Component} Docusaurus Link component (or span indicating site not found if invalid sid is provided)
 */
export default function SiteLink({ sid = '', slug = '', ...props }) {
  const notFoundSpan = <span style={{ backgroundColor: 'red' }}>SITE LINK NOT FOUND</span>;
  const sitesRef = {
    cs: `https://cs.dwf.dev`,
    sd: `https://dwf.dev`,
  }
  if (sid && !sitesRef[sid]) {
    return notFoundSpan;
  }
  const linkRef = sid ? `${sitesRef[sid]}/${slug}` : useBaseUrl(slug)
  return <Link to={linkRef} {...props} />;
}
