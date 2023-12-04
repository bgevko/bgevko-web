import React from 'react';

function TextInput({ className="", label, type="text", name, placeholder}) {
    const combinedClass = `w-full text-sm font-medium text-gray-700 ${className}`;

    return (
			<label htmlFor={name} className={combinedClass}>
				{label}
				<input 
					type={type}
					name={name}
					id={name}
					className="mt-1.5 py-[10px] px-[14px] flex items-center w-full rounded-lg border border-gray-300 placeholder-gray-500"
					placeholder={placeholder}
				/>
			</label>
		);
}

export default TextInput;
