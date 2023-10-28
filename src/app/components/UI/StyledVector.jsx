import React from 'react';
import Image from 'next/image'

const placeholder_vector = '/card/placeholder-vector.svg'

function StyledVector( {colorIndex, className = "", scale = 1 } ) {
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
  const combinedClass = `py-12 w-full flex justify-center items-center rounded-md ${bgColors[colorIndex % bgColors.length]} ${className}`

	return (
		<>
		<div className={combinedClass}>
			<Image src={placeholder_vector} alt="Placeholder" width={126 * scale} height={111 * scale}/>
		</div>
		</>
	)
}

export default StyledVector;

