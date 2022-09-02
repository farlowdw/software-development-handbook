import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import bibItems from './bibliography.js';

import { useColorMode } from '@docusaurus/theme-common';

/**
 *
 * @param {string} id The id by which to reference the bibliographic item
 * @param {string} [pages=''] Pages for reference, typeset in brackets at end of in-text reference (e.g., pages="p. 4" and pages="pp. 26-34" produce [p. 4] and [pp. 26-34], respectively)
 * @param {string} [children=''] Textual content, offset by bibliographic information with an <hr />, to include within an in-text reference. Content appears between BibRef tags: <BibRef> ... TEXTUAL CONTENT ('children') ... </BibRef>
 * @param {boolean} [listAll=false] Flag to determine whether or not ALL bibliography items should be typeset (rendered in h4 tags). Useful for placement on a "comprehensive reference list".
 * @returns
 */
export default function BibRef({
	id,
	pages = null,
	children = '',
	listAll = false,
}) {
	const { colorMode } = useColorMode();

	const requestID = id;
	const pagesReferenced = pages;

	// form a 1D array of ALL bibliographic items from ./bibliography.js
	let allMaterials = [];
	for (const item in bibItems) {
		for (const subitem of bibItems[item]) {
			allMaterials.push(subitem);
		}
	}

	// auxiliary implementation for easy string sorting (case-insensitive)
	function _localeCompare(a, b) {
		return a.toUpperCase().localeCompare(b.toUpperCase());
	}

	// sort bibligraphic items
	// items are sorted first by author and then by title
	// items without authors appear before items with authors and are sorted by title
	function sortBibItems(itemOne, itemTwo) {
		if (itemOne.author && itemTwo.author) {
			if (itemOne.author == itemTwo.author) {
				return _localeCompare(itemOne.title, itemTwo.title);
			} else {
				return _localeCompare(itemOne.author, itemTwo.author);
			}
		} else if (itemOne.author && !itemTwo.author) {
			return 1;
		} else if (!itemOne.author && itemTwo.author) {
			return -1;
		} else {
			return _localeCompare(itemOne.title, itemTwo.title);
		}
	}

	allMaterials.sort(sortBibItems);

	// add a 1-based numerical index to all sorted bibliographic items
	// which will determine the numerical reference of the item under consideration
	const formattedMaterials = allMaterials.map((item, i) => {
		const indexedItem = { ...item, index: i + 1 };
		return indexedItem;
	});

	// if the listAll flag is set to true, then produce the entire bibliography;
	// otherwise, render a single in-text citation with a tooltip detailing the information
	if (listAll) {
		const itemsToList = formattedMaterials.map(
			({ title, author, time, link, index }) => {
				return (
					<React.Fragment key={index}>
						<h4 id={index} className='bibHeader'>[{index}]</h4>
						<span>
							{author && `${author}. `}
							<em>{title}. </em>
							{time && `${time}. `}
							{link && (
								<a href={link} target="_blank">
									Visit <OpenInNewIcon fontSize="inherit" />
								</a>
							)}
						</span>
					</React.Fragment>
				);
			}
		);

		return <div>{itemsToList}</div>;
	} else {
		let referencedItem = formattedMaterials.filter(
			(item) => item.id == requestID
		);

		if (referencedItem.length == 0) {
			return <span style={{ backgroundColor: 'red' }}>ITEM NOT FOUND</span>;
		} else {
			referencedItem = referencedItem[0];
			const { title, author, time, link, index } = referencedItem;
			return (
				<Tooltip
					title={
						<span>
							{author && `${author}. `}
							<em>{title}. </em>
							{time && `${time}. `}
							{pagesReferenced && `[${pagesReferenced}] `}
							{link && (
								<a
									href={link}
									target="_blank"
									style={{
										color: colorMode == 'dark' ? '#F76C6C' : '#F78888',
									}}>
									Visit <OpenInNewIcon fontSize="inherit" />
								</a>
							)}
							{children && (
								<React.Fragment>
									<hr style={{ padding: 0, margin: 0 }} /> {children}
								</React.Fragment>
							)}
						</span>
					}
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
					<a href={'/docs/reference-list#' + index}>[{index}]</a>
				</Tooltip>
			);
		}
	}
}
