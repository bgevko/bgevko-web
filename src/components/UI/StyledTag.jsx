import React from 'react';

function StyledTag( {colorIndex, children} ) {
	const bgColors = [
		'bg-cyan-100',
		'bg-teal-100',
		'bg-orange-100',
		'bg-pink-100',
		'bg-yellow-200',
		'bg-purple-100',
		'bg-green-200',
		'bg-blue-100',
		'bg-red-100',
		'bg-indigo-100',
	]

	const textColors = [
		'text-cyan-900',
		'text-teal-900',
		'text-orange-900',
		'text-pink-900',
		'text-yellow-900',
		'text-purple-900',
		'text-green-900',
		'text-blue-900',
		'text-red-900',
		'text-indigo-900',
	]

	return (
		<p className={`px-2 py-1 rounded-md ${bgColors[colorIndex % bgColors.length]} ${textColors[colorIndex % textColors.length]} text-sm leading-5 font-medium`}>{children}</p>
	)
}

export default StyledTag;

