import React from 'react';
import { FootnotesProvider } from 'react-a11y-footnotes'

// Default implementation, that you can customize
export default function Root({ children }) {
  return <FootnotesProvider>{children}</FootnotesProvider>;
}