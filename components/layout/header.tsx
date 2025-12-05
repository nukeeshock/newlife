
import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export const SiteHeader = ({ children }: HeaderProps) => (
  <header style={{
    position: 'relative', // To ensure it stays above other content if needed
    zIndex: 10,
    padding: '1.5rem 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    color: '#F3F3F3',
    borderBottom: '1px solid #333'
  }}>
    <Link href="/" passHref>
      <div style={{ fontSize: '1.5rem', fontWeight: 'normal', letterSpacing: '0.05em', cursor: 'pointer' }}>
        NEW LIFE VIETNAM
      </div>
    </Link>
    {children && (
      <nav style={{ fontFamily: 'sans-serif', display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {children}
      </nav>
    )}
  </header>
);
