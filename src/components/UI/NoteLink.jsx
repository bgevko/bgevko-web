'use client'
import React from 'react';
import StyledLink from './StyledLink';
import Tag from './StyledTag2';
import { motion } from 'framer-motion';

const NoteLink = ({href, tags, children, className }) => {
	return (
		<motion.div className="w-full mt-4 pb-2 border-b flex justify-between"
			initial={{ opacity: 0}}
			animate={{ opacity: 1}}
			exit={{ opacity: 0}}
			transition={{ type: "tween", duration: 0.2 }}
		>
			<StyledLink 
				className={`mr-2 ${className}`}
				href={href}>{children}
			</StyledLink>
			<span className="flex justify-end flex-wrap gap-2">
				{tags.map((tag, index) => (
					<Tag key={index}>{tag}</Tag>
				))}
			</span>
		</motion.div>
	)
}

export default NoteLink;
