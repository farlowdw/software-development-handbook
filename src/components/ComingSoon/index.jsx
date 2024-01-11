import React from 'react';

export default function ComingSoon({ style = {}, val = 'In development. Coming soon ...' }) {
	return <div style={style}>{val}</div>;
}
