import React from 'react';

function TextArea({ className="", label, name, placeholder, required=false, disabled=false}) {
    const combinedClass = `w-full text-sm font-medium text-gray-700 ${className}`;

    return (
			<label htmlFor={name} className={combinedClass}>
				{label}
				<textarea 
					disabled={disabled}
					required={required}
					maxLength="500"
					name={name}
					id={name}
					className="mt-1.5 py-[10px] px-[14px] h-[270px] resize-none flex items-center w-full rounded-lg border border-gray-300 placeholder-gray-500"
					placeholder={placeholder}
				></textarea>
			</label>
		);
}

export default TextArea;
