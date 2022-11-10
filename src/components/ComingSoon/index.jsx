import React from 'react';

export default function ComingSoon({ style = {}, val = 'In active development. Coming soon ...' }) {
	return <div style={style}>{val}</div>;
}
