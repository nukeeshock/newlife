
import Link from 'next/link';
import React from 'react';

interface FooterProps {
    showLinks?: boolean;
}

export const SiteFooter = ({ showLinks = true }: FooterProps) => (
  <footer style={{
      padding: '3rem 5%',
      backgroundColor: '#1A1A1A',
      color: '#AAA',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      borderTop: '1px solid #333'
  }}>
    <p>© {new Date().getFullYear()} New Life Vietnam. Alle Rechte vorbehalten.</p>
    {showLinks && (
        <div style={{ marginTop: '1rem' }}>
            <Link href="/impressum"><span style={{margin: '0 1rem', cursor: 'pointer'}}>Impressum</span></Link>
            <Link href="/datenschutz"><span style={{margin: '0 1rem', cursor: 'pointer'}}>Datenschutz</span></Link>
        </div>
    )}
  </footer>
);
