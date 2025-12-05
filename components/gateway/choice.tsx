
'use client';

import Link from 'next/link';
import React from 'react';

interface ChoiceCardProps {
    href: string;
    title: string;
    description: string;
}

export const ChoiceCard: React.FC<ChoiceCardProps> = ({ href, title, description }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const style: React.CSSProperties = {
        padding: '2rem 4rem',
        border: '1px solid #D4AF37',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
        backgroundColor: isHovered ? '#D4AF37' : 'transparent',
        color: isHovered ? '#1A1A1A' : '#F3F3F3',
    };

    const headingStyle: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'normal',
        margin: '0 0 0.5rem 0',
    };

    const descriptionStyle: React.CSSProperties = {
        margin: 0,
        fontFamily: 'sans-serif',
        fontSize: '1rem',
        color: isHovered ? '#1A1A1A' : '#AAA',
    };

    return (
        <Link href={href} passHref>
            <div 
                style={style} 
                onMouseOver={() => setIsHovered(true)} 
                onMouseOut={() => setIsHovered(false)}
            >
                <h2 style={headingStyle}>{title}</h2>
                <p style={descriptionStyle}>{description}</p>
            </div>
        </Link>
    );
};
