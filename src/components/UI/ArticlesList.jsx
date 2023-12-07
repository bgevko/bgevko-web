'use client';
import React, {useState, useMemo} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import SectionTags from './SectionTags.jsx'
import ArticleCard from './ArticleCard2.jsx'

// Hooks
import useFilterTags from '@/hooks/useFilterTags.js'

const ArticlesList = ({articles}) => {
	const { 
		filterSet, tags, showTags, 
		handleShowTags, handleHideTags, 
		handleClearTags, handleTagClick, 
		filteredItems, } = useFilterTags(articles)
		
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
					{filterSet.size == 0 &&
						articles.map((article, index) => (
							<ArticleCard key={index}
								date={article.date}
								title={article.title}
								content={article.description}
								tags={article.tags}
								href={article.href}
								image={article.image}
							/>
						))
					}
					{filterSet.size > 0 &&
						filteredItems.map((article, index) => (
							<ArticleCard 
								key={index}
								date={article.date}
								title={article.title}
								content={article.description}
								tags={article.tags}
								href={article.href}
								image={article.image}
							/>
						))
					}
				</AnimatePresence>
			</article>

		</section>

	)
}
export default ArticlesList
