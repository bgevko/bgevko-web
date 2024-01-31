'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const btnStyle = "px-4 py-2 rounded-md text-white text-sm font-medium"

function ButtonTag({ active, onClick, text }) {
    return (
			<motion.button className={`px-2 py-2 rounded-md text-sm text-gray-400 transition-all hover:text-gray-700 ${active ? 'bg-cyan-500 text-white' : ''}`}
				onClick={onClick}
			>{text}</motion.button>
    );
}

export default ButtonTag;
