import Link from 'next/link';
import React from 'react';

interface FooterProps {
    showLinks?: boolean;
}

export const SiteFooter = ({ showLinks = true }: FooterProps) => (
  <footer className="border-t border-white/10 bg-[#0A2239] px-[5%] py-12 text-center font-sans text-white/70">
    <p>&copy; {new Date().getFullYear()} New Life Vietnam. Alle Rechte vorbehalten.</p>
    {showLinks && (
        <div className="mt-4 flex justify-center gap-8">
            <Link href="/immobilien/impressum" className="transition-colors hover:text-[#D4AF37]">
              Impressum
            </Link>
            <Link href="/immobilien/datenschutz" className="transition-colors hover:text-[#D4AF37]">
              Datenschutz
            </Link>
        </div>
    )}
  </footer>
);
