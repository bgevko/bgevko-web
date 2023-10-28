import React from 'react';
import Link from 'next/link';

function StyledLink({ href, children, className = "" }) {
    const combinedClass = `text-base leading-6 text-cyan-500 font-bold ${className}`;

    return (
        <Link href={href} className={`${combinedClass} hover:underline w-max`}>
            {children}
        </Link>
    );
}

export default StyledLink;
