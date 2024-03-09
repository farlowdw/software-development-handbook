import React from 'react';

export default function MyStar({ stars = 1 }) {
  let starContent = '';
  for (let i = 1; i <= stars; i++) {
    starContent += '&starf;';
  }
	return (
		<span style={{ float: 'right' }} dangerouslySetInnerHTML={{__html: starContent}} />
	);
}