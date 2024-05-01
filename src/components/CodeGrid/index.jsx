import React from 'react';

export default function CodeGrid({ children, styles={} }) {
  let baseStyles = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
    gridAutoRows: '1fr',
    gridRowGap: '1em',
    gridColumnGap: '5px',
    alignContent: 'start',
    marginBottom: '1em'
  };
  return (
    <div style={Object.assign({}, baseStyles, styles)}>
      {children}
    </div>
  );
}
