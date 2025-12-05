import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

export const SiteHeader = ({ children }: HeaderProps) => (
  <header className="relative z-10 flex items-center justify-between border-b border-[#0A2239]/10 bg-white px-[5%] py-6">
    <Link href="/" passHref>
      <div className="cursor-pointer font-serif text-2xl font-light tracking-wide text-[#0A2239]">
        NEW LIFE VIETNAM
      </div>
    </Link>
    {children && (
      <nav className="flex items-center gap-10 font-sans">
        {children}
      </nav>
    )}
  </header>
);
