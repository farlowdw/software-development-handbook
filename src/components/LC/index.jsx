import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import problemsJSON from './problems';

function idToDocLink(id) {
  const DOCS = '/docs'
  return id > 0 && id < 100 ? `${DOCS}/1-99/${id}` : 
    id < 200 ? `${DOCS}/100-199/${id}` : 
    id < 300 ? `${DOCS}/200-299/${id}` : 
    id < 400 ? `${DOCS}/300-399/${id}` : 
    id < 500 ? `${DOCS}/400-499/${id}` : 
    id < 600 ? `${DOCS}/500-599/${id}` : 
    id < 700 ? `${DOCS}/600-699/${id}` : 
    id < 800 ? `${DOCS}/700-799/${id}` : 
    id < 900 ? `${DOCS}/800-899/${id}` : 
    id < 1000 ? `${DOCS}/900-999/${id}` : 
    id < 1100 ? `${DOCS}/1000-1099/${id}` : 
    id < 1200 ? `${DOCS}/1100-1199/${id}` : 
    id < 1300 ? `${DOCS}/1200-1299/${id}` : 
    id < 1400 ? `${DOCS}/1300-1399/${id}` : 
    id < 1500 ? `${DOCS}/1400-1499/${id}` : 
    id < 1600 ? `${DOCS}/1500-1599/${id}` : 
    id < 1700 ? `${DOCS}/1600-1699/${id}` : 
    id < 1800 ? `${DOCS}/1700-1799/${id}` : 
    id < 1900 ? `${DOCS}/1800-1899/${id}` : 
    id < 2000 ? `${DOCS}/1900-1999/${id}` : 
    id < 2100 ? `${DOCS}/2000-2099/${id}` : 
    id < 2200 ? `${DOCS}/2100-2199/${id}` : 
    id < 2300 ? `${DOCS}/2200-2299/${id}` : 
    id < 2400 ? `${DOCS}/2300-2399/${id}` : 
    id < 2500 ? `${DOCS}/2400-2499/${id}` : 
    id < 2600 ? `${DOCS}/2500-2599/${id}` : 
    id < 2700 ? `${DOCS}/2600-2699/${id}` : 
    id < 2800 ? `${DOCS}/2700-2799/${id}` : 
    id < 2900 ? `${DOCS}/2800-2899/${id}` : 
    id < 3000 ? `${DOCS}/2900-2999/${id}` : 
    id < 3100 ? `${DOCS}/3000-3099/${id}` : 
    id < 3200 ? `${DOCS}/3100-3199/${id}` : 
    id < 3300 ? `${DOCS}/3200-3299/${id}` : 
    id < 3400 ? `${DOCS}/3300-3399/${id}` : 
    id < 3500 ? `${DOCS}/3400-3499/${id}` : 
    id < 3600 ? `${DOCS}/3500-3599/${id}` : 
    id < 3700 ? `${DOCS}/3600-3699/${id}` : 
    id < 3800 ? `${DOCS}/3700-3799/${id}` : 
    id < 3900 ? `${DOCS}/3800-3899/${id}` : 
    id < 4000 ? `${DOCS}/3900-3999/${id}` : ''
}

/**
 *
 * @param {number} id The id by which to reference the LeetCode problem (i.e., the problem number)
 * @param {string} type The reference type for how the problem should be listed (short with just the number or long with number and title)
 */
export default function LC({
	// problem number
	id,
	// reference type (short style such as "[LC 1]" or long style such as "[LC 1. Two Sum]")
	type = 'short',
  local = false,
  children = ''
}) {
	const problemNumber = id;
	const referenceType = type;
  const useLocalProblemDocPage = local;

	let referencedItem = problemsJSON.filter((item) => item.id == problemNumber);

	if (referencedItem.length == 0) {
		return (
			<span style={{ backgroundColor: 'red' }}>
				LEETCODE PROBLEM REFERENCE NOT FOUND
			</span>
		);
	} else {
    referencedItem = referencedItem[0];
    const { id: probNum, title: probTitle, link: probLink } = referencedItem;
    const problemLink = referenceType == 'long' ? <a href={useLocalProblemDocPage ? idToDocLink(probNum) : probLink} style={{color: useLocalProblemDocPage && '#fc6c85'}} target='_blank'>LC {probNum}. {probTitle}</a> : <a href={useLocalProblemDocPage ? idToDocLink(probNum) : probLink} style={{color: useLocalProblemDocPage && '#fc6c85'}} target='_blank'>LC {probNum}</a>;
    if (children) {
      return (
				<Tooltip
					title={children}
					placement="top"
					arrow
          componentsProps={{
						tooltip: {
							sx: {
								color: '#E3E3E3',
								backgroundColor: 'rgba(109, 109, 109, 1)',
							},
						},
					}}>
					{problemLink}
				</Tooltip>
      )
    } else {
      return problemLink;
    }
	}
}
