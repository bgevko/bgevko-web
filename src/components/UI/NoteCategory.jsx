'use client';
import React from 'react';
import { motion } from 'framer-motion';

function NoteCategory({ title, children }) {
    return (
			<motion.article className="mt-8 w-full flex flex-col"
				initial={{ opacity: 0}}
				animate={{ opacity: 1}} 
				exit={{ opacity: 0}}
				transition={{ type: 'tween', duration: 0.2 }}
			>
				<h2 className="text-xl leading-7 font-bold mb-1 pb-2 border-b text-gray-900">{title}</h2>
					<nav className="flex flex-col gap-2"> {children} </nav>
			</motion.article>
    );
}

export default NoteCategory;
