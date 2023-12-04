'use client';
import React, {useState, useMemo} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import SectionTags from './SectionTags.jsx'
import Category from './NoteCategory.jsx'
import NoteLink from './NoteLink.jsx'

// Hooks
import useFilterTags from '../../hooks/useFilterTags.js'

const NotesList = ({notes}) => {
	const { 
		filterSet, 
		tags, 
		showTags, 
		handleShowTags, 
		handleHideTags, 
		handleClearTags, 
		handleTagClick, 
		filteredItems, } = useFilterTags(notes)

		const allNotes = useMemo(() => mapNotes(notes), [notes])  // Memoize the notes list
		const filteredNotes = useMemo(() => mapNotes(filteredItems), [filteredItems])  // Memoize the filtered notes

	return (
		<section className="section-tags w-full max-w-prose lg:max-w-5xl mx-auto">
			<SectionTags
				tags={tags}
				tagSet={filterSet}
				tagsVisible={showTags}
				handleShowTags={handleShowTags}
				handleHideTags={handleHideTags}
				handleClearTags={handleClearTags}
				handleTagClick={handleTagClick}
			/>
			<article className="min-h-[600px] transition mt-16 w-full flex flex-col">
				<AnimatePresence>
					{filterSet.size == 0 && allNotes}
					{filterSet.size > 0 && filteredNotes}
				</AnimatePresence>
			</article>

		</section>

	)
}
export default NotesList


// Helper function for mapping notes
function mapNotes(notes) {
	if (!notes || notes.length == 0) return []
	return notes.map((noteItem, index) => {
		if (!noteItem || !noteItem.notes || noteItem.notes.length == 0) return null
		return (
			<Category key={index} title={noteItem.category}>
				<AnimatePresence>
				{noteItem.notes.map(note => {
					return (
	 					<NoteLink key={note.title} title={note.title} tags={note.tags} href={note.href}>
	 						{note.title}
	 					</NoteLink>
	 				)
				})}
				</AnimatePresence>
			</Category> 
		)
	})
}
