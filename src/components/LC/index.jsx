import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import problemsJSON from './problems';

/**
 *
 * @param {number} id The id by which to reference the LeetCode problem (i.e., the problem number)
 * @param {string} type The reference type for how the problem should be listed (short with just the number or long with number and title)
 */
export default function BibRef({
	// problem number
	id,
	// reference type (short style such as "[LC 1]" or long style such as "[LC 1. Two Sum]")
	type = 'short',
  children = ''
}) {
	const problemNumber = id;
	const referenceType = type;

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
    const problemLink = referenceType == 'long' ? <a href={probLink} target='_blank'>LC {probNum}. {probTitle}</a> : <a href={probLink} target='_blank'>LC {probNum}</a>;
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
