'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ButtonTag({ active, onClick, text }) {
    return (
			<motion.button className={`px-2 py-1 rounded-md text-base leading-6 text-gray-400 transition-all hover:text-cyan-700 ${active ? 'bg-cyan-500 text-white' : ''}`}
				onClick={onClick}
			>{text}</motion.button>
    );
}

export default ButtonTag;
