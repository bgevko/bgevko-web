import React from 'react';
import Link from 'next/link';

function StyledLink({ href, children, className = "" }) {
    const combinedClass = `text-base text-blue-500 font-medium ${className}`;

    return (
        <Link href={href} className={`${combinedClass} hover:underline w-max`}>
            {children}
        </Link>
    );
}

export default StyledLink;
