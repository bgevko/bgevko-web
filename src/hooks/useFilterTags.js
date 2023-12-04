import React, {useState, useMemo} from 'react';

export default function useFilterTags(items) {
	const [filterSet, setFilterSet] = useState(new Set())
	const [showTags, setShowTags] = useState(false)

	const handleShowTags = () => {
		setShowTags(true) 
	}

	const handleHideTags = () => {
		setShowTags(false)
		setFilterSet(new Set())
	}

	const handleClearTags = () => {
		setFilterSet(new Set())
	}

	const handleTagClick = (tag) => {
		if (filterSet.has(tag)) {
			filterSet.delete(tag);
		} else {
		filterSet.add(tag);
		}
		setFilterSet(new Set(filterSet));
	}

	const tags = useMemo(() => getTags(items), [items])
	const filteredItems = useMemo(() => getFilteredItems(items, filterSet), [items, filterSet])

	return {
		filterSet,
		tags,
		showTags,
		handleShowTags,
		handleHideTags,
		handleClearTags,
		handleTagClick,
		filteredItems,
	}
}

function getTags(items) {
	if (!items || items.length === 0) return []
	if (Object.hasOwn(items[0], 'notes')) return getTagsFromNotes(items) 

	return getTagsFromArticles(items)
}

function getFilteredItems(items, filter) {
	if (!items || items.length === 0 || filter.size === 0) return []
	if (Object.hasOwn(items[0], 'notes')) return filterNotes(items, filter)

	return filterArticles(items, filter)
}

// Helpers for the two functions above
function getTagsFromNotes(items) {
	const tags = items?.flatMap(category => {
		return category?.notes?.flatMap(note => note?.tags)
	})
	return [...new Set(tags)] ?? []
}

function getTagsFromArticles(items) {
	return [...new Set(items?.flatMap(article => article?.tags))] ?? []
}

function filterNotes(items, filter) {
	const filteredCategories = items?.flatMap(category => {
		const filteredNotes = category?.notes?.filter(note => note?.tags?.some(tag => filter.has(tag))) 
		return filteredNotes?.length > 0 ? {...category, notes: filteredNotes} : null 
	})
	return filteredCategories ?? []
}

function filterArticles(items, filter) {
	return items?.filter(article => article?.tags?.some(tag => filter.has(tag))) ?? []
}
